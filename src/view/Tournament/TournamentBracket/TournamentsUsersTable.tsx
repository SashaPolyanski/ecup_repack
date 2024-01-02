import { FC } from "react";
import { TeamInfo } from "./TeamInfo";
import { Box } from "@mui/material";
import { TabsComponents } from "./TournamentModalContent";

export const TournamentsUsersTable: FC<TabsComponents> = ({ teams }) => {
  return (
    <Box sx={{ overflow: "auto", height: "90%" }}>
      {" "}
      {teams?.map((m, i) => (
        <Box display={"flex"} mt={2} alignItems={"center"}>
          <Box mr={2}>{i + 1}</Box> <TeamInfo team={m} />
        </Box>
      ))}
    </Box>
  );
};
