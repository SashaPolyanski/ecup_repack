import {FC} from 'react'
import {Button} from "@shared";
import {Box} from "@mui/material";
import {useQuery} from "@/api/hooks/useQuery.ts";
import {PaginatedTournamentTeamReadOnlyList} from "@/api/types";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk.tsx";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk.tsx";
import {useUserStore} from "@/Zustand/userStore.ts";
import {useMutation} from "@/api/hooks/useMutation.ts";

type InTournamentButtonProps = WithGamePkProps & withTournamentPkProps

export const InTournamentButtonComponent: FC<InTournamentButtonProps> = ({tournamentPk, gamePk}) => {
  const {user} = useUserStore()
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
  return (
    <Box>
      <Button variant={'contained'}>Вы зарегистрированы</Button>
      <Button sx={{marginLeft: '20px'}} variant={'outlined'} onClick={unRegisteredHandler}>Отменить участие</Button>
    </Box>
  );
};
export const InTournamentButton = withTournamentPk()(withGamePk()(InTournamentButtonComponent))
