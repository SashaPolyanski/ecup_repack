import { FC } from "react";
import { TournamentTeamInfo } from "./TournamentTeamInfo";
import { Box } from "@mui/material";
import { TabsComponents } from "./TournamentModalContent";

export const TournamentsUsersTable: FC<TabsComponents> = ({
  teams,
  lobbyPk,
}) => {
  return (
    <Box sx={{ overflow: "auto", height: "90%" }}>
      {teams?.map((m, i) => (
        <Box display={"flex"} key={m.id} mt={2} alignItems={"center"}>
          <Box mr={2}>{i + 1}</Box>
          <TournamentTeamInfo team={m} lobbyPk={lobbyPk} />
        </Box>
      ))}
    </Box>
  );
};
