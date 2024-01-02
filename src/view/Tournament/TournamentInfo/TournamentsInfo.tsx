import { TournamentRegistrationCard } from "./TournamentRegistrationCard";
import {
  TournamentGameSchedule,
  TournamentSchedule,
} from "./TournamentSchedule";
import { Box } from "@mui/material";

export const TournamentsInfo = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <TournamentSchedule />
      <TournamentRegistrationCard />
      <TournamentGameSchedule />
    </Box>
  );
};
