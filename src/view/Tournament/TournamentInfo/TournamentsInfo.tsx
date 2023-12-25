import {FC} from 'react'
import {TournamentRegistrationCard} from "./TournamentRegistrationCard";
import {TournamentGameSchedule, TournamentSchedule} from "./TournamentSchedule";
import {Box} from "@mui/material";


type TournamentsInfoProps = {}

export const TournamentsInfo: FC<TournamentsInfoProps> = ({}) => {
  return (
    <Box sx={{width: '100%'}}>
      <TournamentSchedule/>
      <TournamentRegistrationCard/>
      <TournamentGameSchedule/>
    </Box>
  );
};
