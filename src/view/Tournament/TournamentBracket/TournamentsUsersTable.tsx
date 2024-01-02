import { FC } from "react";
import { TeamScoreReadOnly } from "@/api/types";
import { TeamInfo } from "./TeamInfo";
import { Box } from "@mui/material";

export type TournamentsUsersTableProps = {
  teams: TeamScoreReadOnly[] | null;
};

export const TournamentsUsersTable: FC<TournamentsUsersTableProps> = ({
  teams,
}) => {
  return teams?.map((m, i) => (
    <Box display={"flex"} mt={2} alignItems={"center"}>
      <Box mr={2}>{i + 1}</Box> <TeamInfo team={m} />
    </Box>
  ));
};
