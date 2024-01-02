import { FC, useState } from "react";
import { Box, Collapse, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { TournamentStageReadOnly } from "@/api/types";
import { useTranslation } from "react-i18next";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints.ts";

type TourmanentBaracketStagesProps = {
  data?: TournamentStageReadOnly;
  openLobbyModal: (id: number, lobby: string) => () => void;
};
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

const OpenButton = styled(Box)`
  text-align: end;
  margin-top: 8px;
  cursor: pointer;
`;
export const TourmanentBaracketStages: FC<TourmanentBaracketStagesProps> = ({
  data,
  openLobbyModal,
}) => {
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`);
  const [collapsed, setCollapsed] = useState(!isSmallScreen);
  const { t } = useTranslation("common");
  const showStagesHandler = () => {
    setCollapsed((p) => !p);
  };
  return (
    <>
      {isSmallScreen ? (
        <Box mb={4} mt={2} onClick={showStagesHandler}>
          Show stages
        </Box>
      ) : null}
      <Collapse in={collapsed}>
        <Box ml={4}>
          {data?.matches?.map((m, i) => (
            <Box mb={4} key={m.id}>
              <TournamentLobbyContainer key={i}>{`Lobby ${
                i + 1
              }`}</TournamentLobbyContainer>
              <OpenButton onClick={openLobbyModal(m.id, `Lobby ${i + 1}`)}>
                {t("open")}
              </OpenButton>
            </Box>
          ))}
        </Box>
      </Collapse>
    </>
  );
};
