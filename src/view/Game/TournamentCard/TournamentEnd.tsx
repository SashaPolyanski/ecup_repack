import {FC} from 'react'
import {Box, Chip, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import styled from "@emotion/styled";

type TournamentEndProps = {
  start_at: string
  type: string
  format: string
}
const TournamentEndContent = styled(Typography)`
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 10px;
`

export const TournamentFormatInfo: FC<TournamentEndProps> = ({start_at, type, format}) => {
  const {t} = useTranslation('common')
  const format_date = new Date(start_at)?.toLocaleString('ru-RU', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false,
  }).slice(0, 17);
  return (
    <Box display={'flex'} justifyContent={'space-between'} px={2} py={1}>
      <Box>
        <Chip label={type}/>
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
