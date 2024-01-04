import { FC, useCallback, useMemo, useState } from "react";
import {
  withTournamentPk,
  withTournamentPkProps,
} from "@/hocs/withTournamentPk.tsx";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import { useQuery } from "@/api/hooks/useQuery";
import {
  MatchReadOnly,
  PaginatedTournamentStageReadOnlyList,
} from "@/api/types";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { Modal, Preloader } from "@shared";
import { TournamentModalContent } from "./TournamentModalContent";
import { TourmanentBaracketStages } from "./TourmanentBaracketStages";
import {
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  WIDTH,
} from "@/constants/breackpoints";
import { TournamentBracketStagesTitle } from "./TournamentBracketStagesTitle";

type TournamentBracketProps = WithGamePkProps & withTournamentPkProps;
const TourmanentBracketStagesContainer = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
  @media (max-width: ${MEDIA_QUERY_MD}px) {
    flex-direction: column;
  }
`;
const TournamentBracketContainer = styled(Box)`
  height: 100%;
  width: ${WIDTH}px;
  @media (max-width: ${MEDIA_QUERY_LG}px) {
    width: 100%;
  }
`;
export const TournamentBracketComponent: FC<TournamentBracketProps> = ({
  tournamentPk,
  gamePk,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [lobbyTitle, setLobbyTitle] = useState("");
  const closeLobbyModal = () => {
    setShowModal(false);
  };

  const [lobbyId, setLobbyId] = useState<null | number>(null);
  const openLobbyModal = useCallback(
    (id: number, lobby: string) => () => {
      setLobbyId(id);
      setLobbyTitle(lobby);
      setShowModal(true);
    },
    [],
  );
  const { data } = useQuery<PaginatedTournamentStageReadOnlyList>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/stages/`,
  });
  const { data: lobbyInfo } = useQuery<MatchReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/matches/${lobbyId}/`,
    skip: !!lobbyId,
  });

  const reverseData = useMemo(() => data?.results?.reverse(), [data?.results]);
  const tourmanentBaracketStages = useMemo(
    () => [
      { id: 1, data: reverseData && reverseData[0] },
      { id: 2, data: reverseData && reverseData[1] },
      { id: 3, data: reverseData && reverseData[2] },
      { id: 4, data: reverseData && reverseData[3] },
      { id: 5, data: reverseData && reverseData[4] },
    ],
    [reverseData],
  );
  return !data ? (
    <Preloader />
  ) : data?.results?.length === 0 ? null : (
    <>
      <TournamentBracketContainer mt={2}>
        <Box sx={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}>
          <TournamentBracketStagesTitle
            tournamentPk={tournamentPk}
            gamePk={gamePk}
            tourmanentBaracketStages={tourmanentBaracketStages}
          />
          <TourmanentBracketStagesContainer>
            {tourmanentBaracketStages.map(({ id, data }) => (
              <TourmanentBaracketStages
                key={id}
                data={data}
                openLobbyModal={openLobbyModal}
              />
            ))}
          </TourmanentBracketStagesContainer>
        </Box>
        <Modal
          open={showModal}
          onClose={closeLobbyModal}
          title={lobbyTitle}
          width={800}
          height={700}
        >
          <TournamentModalContent lobbyInfo={lobbyInfo} />
        </Modal>
      </TournamentBracketContainer>
    </>
  );
};
export const TournamentBracket = withTournamentPk()(
  withGamePk()(TournamentBracketComponent),
);
