import {FC} from 'react'
import {useQuery} from "@/api/hooks/useQuery";
import {TournamentReadOnly} from "@/api/types";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import styled from "@emotion/styled";

type TournamentTabInfoProps = WithGamePkProps & withTournamentPkProps
const Title = styled(Typography)`
  color: #4A5568;
  font-size: 13px;
  margin-bottom: 10px;
  font-weight: 600;`
const TournamentTabInfoComponentContainer = styled(Box)`
  border: 1px solid #4A5568;
  border-top: none;
  padding-left: 20px;
  width: 72.2%;
`
export const TournamentTabInfoComponent: FC<TournamentTabInfoProps> = ({tournamentPk, gamePk}) => {
  const {data} = useQuery<TournamentReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/`,
  });
  const {t} = useTranslation('common')
  const tournamentStartDate = data && new Date(data?.start_at).toLocaleString('en-US', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false
  }).slice(0, 10);
  const date = `${tournamentStartDate} ${data?.start_at?.slice(11, 16)} по Москве (GMT+3)`
  return (
    <TournamentTabInfoComponentContainer pt={2}>
      <Box mb={3}>
        <Title>{t('desc')}</Title>
        <Typography>{data?.name}</Typography>
      </Box>
      <Box mb={2}>
        <Title>{t('dateAndTime')}</Title>
        <Typography>{date}</Typography>
      </Box>
      <Box mb={3}>
        <Title>{t('format')}</Title>
        <Typography>Single Elimination, 1x7</Typography>
      </Box>
    </TournamentTabInfoComponentContainer>
  );
};
export const TournamentTabInfo = withTournamentPk()(withGamePk()(TournamentTabInfoComponent))
