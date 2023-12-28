import {Button} from "@shared";
import {useMutation} from "@/api/hooks/useMutation";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {FC, SyntheticEvent} from "react";
import {useTranslation} from "react-i18next";
import {useQuery} from "@/api/hooks/useQuery";
import {useUserStore} from "@/Zustand/userStore.ts";
import {PaginatedTeamReadOnlyList, TournamentTeamCreate} from "@/api/types";
import styled from "@emotion/styled";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints.ts";

type RegistrationButton = WithGamePkProps & {
  tournamentPk: number
}
const RegButton = styled(Button)`
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    width: 100%;
  }
`
const RegistrationButtonComponent: FC<RegistrationButton> = ({tournamentPk, gamePk}) => {
  const {t} = useTranslation('common')
  const {user} = useUserStore()
  const {data} = useQuery<PaginatedTeamReadOnlyList>({path: `/teams/?users=${user?.id}`})
  const {mutate: registerInTournament, loading} = useMutation<TournamentTeamCreate, TournamentTeamCreate>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/teams`,
    method: 'POST',
    token: true,
    queryKeyRefetch: [`/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`, `/games/${gamePk}/tournaments/${tournamentPk}/`, `/games/${gamePk}/tournaments/`]
  })
  const registerInTournamentHandler = (e: SyntheticEvent) => {
    e.stopPropagation()
    if (data?.results) {
      registerInTournament({tournament: tournamentPk, team: data.results[0].id}).then(() => {
      })
    }
  }

  return <RegButton loading={loading} variant={'outlined'}
                    onClick={registerInTournamentHandler}>{t('tournamenRegistrationBtn')}</RegButton>
}
export const RegistrationButton: FC<{ tournamentPk: number }> = withGamePk()(RegistrationButtonComponent)
