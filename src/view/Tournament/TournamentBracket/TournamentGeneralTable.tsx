import { FC } from "react";
import { TabsComponents } from "./TournamentModalContent";
import { Box } from "@mui/material";
import { GeneralInfo } from "./GeneralInfo";

export const TournamentGeneralTable: FC<TabsComponents> = ({ scores }) => {
  return scores?.map((m, i) => (
    <Box display={"flex"} mt={2} alignItems={"center"} key={m.team_id}>
      <Box mr={2}>{i + 1}</Box> <GeneralInfo scores={m} />
    </Box>
  ));
};
