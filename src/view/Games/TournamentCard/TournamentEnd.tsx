import {FC} from 'react'
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

type TournamentEndProps = {
  start_at: string
}
const remainDay = (start_at: string) => {
  return Math.floor((new Date(start_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
}
export const TournamentEnd: FC<TournamentEndProps> = ({start_at}) => {
  const {t} = useTranslation('common')
  return (
    <Typography>
      {t('endTournament', {day: remainDay(start_at)})}
    </Typography>
  );
};
