import {Button} from "@shared";
import {useMutation} from "@/api/hooks/useMutation";
import {PaginatedTournamentTeamReadOnlyList, PatchedTournamentTeamUpdate, TournamentTeamUpdate} from "@/api/types";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {FC} from "react";
import {useQuery} from "@/api/hooks/useQuery";
import {useUserStore} from "@/Zustand/userStore";
import {useTranslation} from "react-i18next";
import {Stack} from "@mui/material";

type ConfirmButtonProps = WithGamePkProps & withTournamentPkProps;

export const ConfirmButtonComponent: FC<ConfirmButtonProps> = ({tournamentPk, gamePk}) => {
  const {user} = useUserStore()
  const {t} = useTranslation('common')
  const {data} = useQuery<PaginatedTournamentTeamReadOnlyList>({path: `/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`})
  const {mutate: unRegistered} = useMutation({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/teams/${data?.results && data?.results[0].id}`,
    method: 'DELETE',
    token: true,
    queryKeyRefetch: [`/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`, `/games/${gamePk}/tournaments/${tournamentPk}/`]
  })
  const unRegisteredHandler = () => {
    unRegistered({})
  }
  const isConfirmed = data?.results && data?.results[0].is_confirmed
  const {
    mutate: registrationConfirm,
    loading
  } = useMutation<PatchedTournamentTeamUpdate, TournamentTeamUpdate>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/teams/${data?.results && data?.results[0].id}`,
    method: "PATCH",
    token: true,
    queryKeyRefetch: [`/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`]
  })
  const registrationConfirmHandler = () => {
    registrationConfirm({is_confirmed: true})
  }
  const unRegistrationConfirmHandler = () => {
    registrationConfirm({is_confirmed: false})
  }
  return !isConfirmed ?
    <Stack spacing={2} direction={'row'}>
      <Button loading={loading} variant={'outlined'}
              onClick={registrationConfirmHandler}>{t('registerTournament')}</Button><Button
      variant={'outlined'} onClick={unRegisteredHandler}>{t('cancelRegistration')}</Button> </Stack> :
    <Button variant={'outlined'} onClick={unRegistrationConfirmHandler}>{t('unRegisterTournament')}</Button>
}
export const ConfirmButton: FC = withTournamentPk()(withGamePk()(ConfirmButtonComponent))

