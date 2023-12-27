import {FC, SyntheticEvent} from 'react'
import {Box, Typography} from "@mui/material";
import {useUserStore} from "@/Zustand/userStore.ts";
import {useQuery} from "@/api/hooks/useQuery.ts";
import {
  PaginatedTeamReadOnlyList,
  PaginatedTournamentTeamReadOnlyList,
  TournamentReadOnlyStatusEnum,
  TournamentTeamCreate
} from "@/api/types";
import {useMutation} from "@/api/hooks/useMutation.ts";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk.tsx";
import {Button} from "@shared";
import {useTranslation} from "react-i18next";
import styled from "@emotion/styled";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints.ts";

type TournamentProps = {
  tournamentId: number
  status: TournamentReadOnlyStatusEnum

}
type TournamentRegistrationButtonProps = WithGamePkProps & TournamentProps
const TournamentRegistrationButtonContainer = styled(Box)`
  margin-top: 16px;
  display: flex;
  align-items: center;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    margin-top: 5px;
  }
`

export const TournamentRegistrationButtonComponent: FC<TournamentRegistrationButtonProps> = ({
                                                                                               gamePk,
                                                                                               tournamentId, status
                                                                                             }) => {
  const {user} = useUserStore()
  const {t} = useTranslation('common')
  const {data} = useQuery<PaginatedTeamReadOnlyList>({path: `/teams/?users=${user?.id}`})
  const {mutate: registerInTournament, loading} = useMutation<TournamentTeamCreate, TournamentTeamCreate>({
    path: `/games/${gamePk}/tournaments/${tournamentId}/teams`,
    method: 'POST',
    token: true,
    queryKeyRefetch: [`/games/${gamePk}/tournaments/${tournamentId}/teams/?team__users=${user?.id}`, `/games/${gamePk}/tournaments/`]

  })

  const {data: userTeam} = useQuery<PaginatedTournamentTeamReadOnlyList>({path: `/games/${gamePk}/tournaments/${tournamentId}/teams/?team__users=${user?.id}`})
  const {mutate: unRegistered} = useMutation({
    path: `/games/${gamePk}/tournaments/${tournamentId}/teams/${userTeam?.results && userTeam?.results[0]?.id}`,
    method: 'DELETE',
    token: true,
    queryKeyRefetch: [`/games/${gamePk}/tournaments/${tournamentId}/teams/?team__users=${user?.id}`, `/games/${gamePk}/tournaments/`]
  })
  const inTournament = !!userTeam?.results?.length
  const registerInTournamentHandler = (e: SyntheticEvent) => {
    e.stopPropagation()
    if (data?.results) {
      registerInTournament({tournament: tournamentId, team: data.results[0].id}).then(() => {
      })
    }
  }
  const unRegisterInTournamentHandler = (e: SyntheticEvent) => {
    e.stopPropagation()
    unRegistered({})
  }
  return (
    <TournamentRegistrationButtonContainer ml={2}>
      {!inTournament && status === 'NOT_STARTED' ? (
        <Button variant={'outlined'} onClick={registerInTournamentHandler} loading={loading}>Регистрация</Button>
      ) : (
        inTournament && status === 'NOT_STARTED' ?
          <>
            <Typography mr={1}>
              {t('youParticipate')}
            </Typography>
            <Button variant={'outlined'} onClick={unRegisterInTournamentHandler} loading={loading}>Отмена</Button>
          </>
          : <Typography>{t('tournamentFinished')}</Typography>)}

    </TournamentRegistrationButtonContainer>
  );
};
export const TournamentRegistrationButton: FC<TournamentProps> = withGamePk()(TournamentRegistrationButtonComponent)
