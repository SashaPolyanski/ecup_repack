import { FC, useMemo, useState } from "react";
import {
  withTournamentPk,
  withTournamentPkProps,
} from "@/hocs/withTournamentPk.tsx";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk.tsx";
import { useQuery } from "@/api/hooks/useQuery.ts";
import {
  MatchReadOnly,
  PaginatedTournamentStageReadOnlyList,
} from "@/api/types";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { Modal } from "@shared";
import { TournamentModalContent } from "@view/Tournament/TournamentBracket/TournamentModalContent.tsx";
import { useTranslation } from "react-i18next";

const TournamentLobbyContainer = styled(Box)`
  background-color: #252a40;
  min-width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
const Wrapper = styled(Box)`
  position: relative;
`;
const OpenButton = styled(Box)`
  text-align: end;
  margin-top: 8px;
  cursor: pointer;
`;

type TournamentBracketProps = WithGamePkProps & withTournamentPkProps;

export const TournamentBracketComponent: FC<TournamentBracketProps> = ({
  tournamentPk,
  gamePk,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [lobbyTitle, setLobbyTitle] = useState("");

  const closeLobbyModal = () => {
    setShowModal(false);
  };
  const { t } = useTranslation("common");
  const [lobbyId, setLobbyId] = useState<null | number>(null);
  const openLobbyModal = (id: number, lobby: string) => () => {
    setLobbyId(id);
    setLobbyTitle(lobby);
    setShowModal(true);
  };
  const { data } = useQuery<PaginatedTournamentStageReadOnlyList>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/stages/`,
  });
  const { data: lobbyInfo } = useQuery<MatchReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/matches/${lobbyId}/`,
    token: true,
  });
  const reverseData = useMemo(() => data?.results, [data?.results]);
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "100%" }}
      >
        <Wrapper>
          {reverseData &&
            reverseData[4]?.matches?.map((m, i) => {
              return (
                <Box mb={4}>
                  <TournamentLobbyContainer key={i}>{`Lobby ${
                    i + 1
                  }`}</TournamentLobbyContainer>
                  <OpenButton onClick={openLobbyModal(m.id, `Lobby ${i + 1}`)}>
                    {t("open")}
                  </OpenButton>
                </Box>
              );
            })}
        </Wrapper>
        <Wrapper ml={4}>
          {reverseData &&
            reverseData[3]?.matches?.map((m, i) => (
              <Box mb={4}>
                <TournamentLobbyContainer key={i}>{`Lobby ${
                  i + 1
                }`}</TournamentLobbyContainer>
                <OpenButton onClick={openLobbyModal(m.id, `Lobby ${i + 1}`)}>
                  {t("open")}
                </OpenButton>
              </Box>
            ))}
        </Wrapper>
        <Wrapper ml={4}>
          {reverseData &&
            reverseData[2]?.matches?.map((m, i) => (
              <Box mb={4}>
                <TournamentLobbyContainer key={i}>{`Lobby ${
                  i + 1
                }`}</TournamentLobbyContainer>
                <OpenButton
                  textAlign={"end"}
                  mt={1}
                  onClick={openLobbyModal(m.id, `Lobby ${i + 1}`)}
                >
                  {t("open")}
                </OpenButton>
              </Box>
            ))}
        </Wrapper>
        <Wrapper ml={4}>
          {reverseData &&
            reverseData[1]?.matches?.map((m, i) => (
              <Box mb={4}>
                <TournamentLobbyContainer key={i}>{`Lobby ${
                  i + 1
                }`}</TournamentLobbyContainer>
                <OpenButton
                  textAlign={"end"}
                  mt={1}
                  onClick={openLobbyModal(m.id, `Lobby ${i + 1}`)}
                >
                  {t("open")}
                </OpenButton>
              </Box>
            ))}
        </Wrapper>
        <Wrapper ml={4}>
          {reverseData &&
            reverseData[0].matches?.map((m, i) => (
              <Box mb={4}>
                <TournamentLobbyContainer key={i}>{`Lobby ${
                  i + 1
                }`}</TournamentLobbyContainer>
                <OpenButton
                  textAlign={"end"}
                  mt={1}
                  onClick={openLobbyModal(m.id, `Lobby ${i + 1}`)}
                >
                  {t("open")}
                </OpenButton>
              </Box>
            ))}
        </Wrapper>
      </Box>
      <Modal
        open={showModal}
        onClose={closeLobbyModal}
        title={lobbyTitle}
        width={800}
        height={640}
      >
        <TournamentModalContent lobbyInfo={lobbyInfo} />
      </Modal>
    </>
  );
};
export const TournamentBracket = withTournamentPk()(
  withGamePk()(TournamentBracketComponent),
);
