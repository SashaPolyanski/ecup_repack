import {FC} from 'react'
import {Button} from "@shared";
import {useTranslation} from "react-i18next";
import {useIsAuthStore} from "@/Zustand/isAuthStore";
import {useParams} from "react-router-dom";
import {useQuery} from "@/api/hooks/useQuery";
import {TournamentReadOnly} from "@/api/types";

type TournamentRegistrationButtonProps = {}

export const TournamentRegistrationButton: FC<TournamentRegistrationButtonProps> = ({}) => {
  const {t} = useTranslation('common')
  const {isAuth} = useIsAuthStore()
  const {gameId, id} = useParams()
  const {data} = useQuery<TournamentReadOnly>({path: `/games/${gameId}/tournaments/${id}`})
  const date = new Date()
  if (data) {
    const conditions = [isAuth, date > new Date(data?.schedule[1]) && date < new Date(data?.schedule[2])]
    console.log(conditions)
  }

  return (
    <div>
      <Button variant={'outlined'}>{t('tournamenRegistrationBtn')}</Button>
    </div>
  );
};
