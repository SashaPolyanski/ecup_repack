import {Button} from "@shared";
import {useMutation} from "@/api/hooks/useMutation";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useQuery} from "@/api/hooks/useQuery";
import {useUserStore} from "@/Zustand/userStore.ts";
import {PaginatedTeamReadOnlyList, TournamentTeamCreate} from "@/api/types";

type RegistrationButton = WithGamePkProps & withTournamentPkProps
const RegistrationButtonComponent: FC<RegistrationButton> = ({tournamentPk, gamePk}) => {
  const {t} = useTranslation('common')
  const {user} = useUserStore()
  const {data} = useQuery<PaginatedTeamReadOnlyList>({path: `/teams/?users=${user?.id}`})
  const {mutate: registerInTournament, loading} = useMutation<TournamentTeamCreate, TournamentTeamCreate>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/teams`,
    method: 'POST',
    token: true,
    queryKeyRefetch: [`/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`, `/games/${gamePk}/tournaments/${tournamentPk}/`]

  })
  const registerInTournamentHandler = () => {
    if (data?.results) {
      registerInTournament({tournament: tournamentPk, team: data.results[0].id}).then(() => {
      })
    }

  }

  return <Button loading={loading} variant={'outlined'}
                 onClick={registerInTournamentHandler}>{t('tournamenRegistrationBtn')}</Button>
}
export const RegistrationButton = withTournamentPk()(withGamePk()(RegistrationButtonComponent))
