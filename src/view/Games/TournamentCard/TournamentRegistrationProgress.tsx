import {FC} from 'react'
import {Box, LinearProgress, Typography} from "@mui/material";
import styled from "@emotion/styled";

type TournamentRegistrationProgressProps = {
  max_teams: number
  teams: number
}
const ParticipantsProgress = styled(LinearProgress)`
  width: 100%;
  height: 4px;
  background-color: #edf2f7;

  & .MuiLinearProgress-bar {
    background-color: #50d8d7
  }
`;
export const TournamentRegistrationProgress: FC<TournamentRegistrationProgressProps> = ({max_teams, teams}) => {
  return (
    <Box sx={{width: '50%'}} display={'flex'} alignItems={'center'} mt={1}>
      <ParticipantsProgress variant="determinate" value={(100 / max_teams) * teams}/>
      <Typography ml={2}>
        {`${teams}/${max_teams}`}
      </Typography>
    </Box>
  );
};
