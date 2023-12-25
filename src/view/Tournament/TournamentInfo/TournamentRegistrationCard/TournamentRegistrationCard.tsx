import {FC} from 'react'
import styled from "@emotion/styled";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {TournamentRegistrationProgress} from "./TournamentRegistrationProgress";
import {useQuery} from "@/api/hooks/useQuery.ts";
import {TournamentReadOnly} from "@/api/types";
import {TournamentRegistrationButton} from "./TournamentRegistrationButton";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk.tsx";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk.tsx";
import {TournamentsPrize} from "@view/Tournament/TournamentInfo/TournamentPrize";

type TournamentRegistrationCardProps = WithGamePkProps & withTournamentPkProps
const RegistrationCardContainer = styled(Box)`
  border-radius: 16px;
  width: 50%;
  padding: 30px 40px;
  border: 4px solid #4a5568;`
export const TournamentRegistrationCardComponent: FC<TournamentRegistrationCardProps> = ({tournamentPk, gamePk}) => {
  const {t} = useTranslation('common')
  const {data} = useQuery<TournamentReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/`,
  })
  return (
    <Box mt={4} sx={{width: '100%'}} display={'flex'} justifyContent={'space-between'}>
      <RegistrationCardContainer>
        <Typography fontSize={24}>{t('TournamenRegistration')}</Typography>
        <Typography fontSize={18}>{t('TournamenRegistrationDesc')}</Typography>
        <TournamentRegistrationProgress teams={data?.teams.length} max_teams={data?.max_teams}/>
        <TournamentRegistrationButton/>
      </RegistrationCardContainer>
      <TournamentsPrize/>
    </Box>
  );
};
export const TournamentRegistrationCard = withTournamentPk()(withGamePk()(TournamentRegistrationCardComponent))
