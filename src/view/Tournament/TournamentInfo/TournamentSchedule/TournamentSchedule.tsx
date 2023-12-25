import {FC} from 'react'
import {TournamentStepper} from "./TournamentStepper";
import {useQuery} from "@/api/hooks/useQuery";
import {TournamentReadOnly} from "@/api/types";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";

type TournamentScheduleProps = WithGamePkProps & withTournamentPkProps

export const TournamentScheduleComponent: FC<TournamentScheduleProps> = ({tournamentPk, gamePk}) => {
  const {data} = useQuery<TournamentReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/`,
  });
  return (
    <TournamentStepper schedule={data?.schedule}/>
  );
};
export const TournamentSchedule = withTournamentPk()(withGamePk()(TournamentScheduleComponent))
