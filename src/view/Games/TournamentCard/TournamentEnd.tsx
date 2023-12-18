import {FC} from 'react'
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import styled from "@emotion/styled";

type TournamentEndProps = {
  start_at: string
}
const TournamentEndContent = styled(Typography)`
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 10px;
`
const remainDay = (start_at: string) => {
  return Math.floor((new Date(start_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
}
export const TournamentEnd: FC<TournamentEndProps> = ({start_at}) => {
  const {t} = useTranslation('common')
  return (
    <TournamentEndContent fontSize={23}>
      {t('endTournament', {day: remainDay(start_at)})}
    </TournamentEndContent>
  );
};
