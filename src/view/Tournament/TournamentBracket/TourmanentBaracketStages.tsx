import { FC, useState } from "react";
import { Box, Collapse, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { TournamentStageReadOnly } from "@/api/types";
import { MEDIA_QUERY_LG } from "@/constants/breackpoints";
import { Button } from "@shared";

type TourmanentBaracketStagesProps = {
  data?: TournamentStageReadOnly;
  openLobbyModal: (id: number, lobby: string) => () => void;
};
const TournamentLobbyContainer = styled(Box)`
  background-color: #252a40;
  width: 230px;
  height: 50px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  @media (max-width: ${MEDIA_QUERY_LG}px) {
    width: 100%;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const TourmanentBaracketStages: FC<TourmanentBaracketStagesProps> = ({
  data,
  openLobbyModal,
}) => {
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_LG}px)`);
  const [collapsed, setCollapsed] = useState(!isSmallScreen);
  const showStagesHandler = () => {
    setCollapsed((p) => !p);
    console.log(isSmallScreen);
  };
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {isSmallScreen ? (
        <Button
          sx={{ marginTop: "20px", width: "100%", height: "35px" }}
          variant={"outlined"}
          onClick={showStagesHandler}
        >
          {data?.title}
        </Button>
      ) : null}
      <Collapse
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
        in={collapsed}
        unmountOnExit
      >
        <Box ml={isSmallScreen ? 0 : 4} mt={4} sx={{ height: "100%" }}>
          <Box>
            {data?.matches?.map((m, i) => (
              <Box mb={4} key={m.id}>
                <TournamentLobbyContainer
                  onClick={openLobbyModal(m.id, `Lobby ${i + 1}`)}
                  key={i}
                >{`Lobby ${i + 1}`}</TournamentLobbyContainer>
              </Box>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
