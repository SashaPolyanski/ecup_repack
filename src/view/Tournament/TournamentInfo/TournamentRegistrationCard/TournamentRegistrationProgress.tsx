import {FC} from 'react'
import {Box, LinearProgress, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {useTranslation} from "react-i18next";

type TournamentRegistrationProgressProps = {
  max_teams?: number
  teams?: number
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
  const {t} = useTranslation('common')
  return (
    <Box sx={{width: '90%'}} display={'flex'} alignItems={'center'} mt={1} mb={3}>
      {max_teams && teams && <ParticipantsProgress variant="determinate" value={(100 / max_teams) * teams}/>}
      <Typography ml={2}>
        {`${teams}/${max_teams}`} {t('tournamenParticipants')}
      </Typography>
    </Box>
  );
};
