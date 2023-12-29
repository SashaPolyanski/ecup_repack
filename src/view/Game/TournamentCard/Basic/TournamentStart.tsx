import {FC} from 'react'
import {Box, Chip, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import styled from "@emotion/styled";

type StartAt = {
  [key: string]: unknown
}
type TournamentEndProps = {
  startAt: StartAt
  format: string
}
const TournamentEndContent = styled(Typography)`
  text-transform: uppercase;
  opacity: 0.7;
`

export const TournamentFormatInfo: FC<TournamentEndProps> = ({startAt, format}) => {
  const {t} = useTranslation('common')
  const format_date = new Date(Object.values(startAt)[0] as string)?.toLocaleString('ru-RU', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false,
  }).slice(0, 17);
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pr={2} py={1}>
      <Box>
        <Chip sx={{marginLeft: '10px'}} label={format}/>
      </Box>
      <Box>
        <TournamentEndContent fontSize={15}>
          {t('startTournament', {day: format_date})}
        </TournamentEndContent>
      </Box>
    </Box>
  );
};
