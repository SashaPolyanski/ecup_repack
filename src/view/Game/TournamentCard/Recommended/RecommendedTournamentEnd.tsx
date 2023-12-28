import {FC} from 'react'
import {useTranslation} from "react-i18next";

type StartAt = {
  [key: string]: unknown
}
type RecommendedTournamentEndProps = {
  startAt: StartAt
}

export const RecommendedTournamentEnd: FC<RecommendedTournamentEndProps> = ({startAt}) => {
  const {t} = useTranslation('common')
  const format_date = new Date(Object.values(startAt)[0] as string)?.toLocaleString('ru-RU', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false,
  }).slice(0, 17);
  return (
    <div>
      {t('startTournament', {day: format_date})}
    </div>
  );
};
