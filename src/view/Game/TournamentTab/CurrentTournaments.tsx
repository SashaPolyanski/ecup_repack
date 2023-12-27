import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {TournamentCard} from "@view/Game/TournamentCard";

type CurrentTournamentsProps = {
  tournaments: TournamentReadOnly[]
}

export const CurrentTournaments: FC<CurrentTournamentsProps> = ({tournaments}) => {
  return tournaments.map(m => <TournamentCard tournament={m} key={m.id}/>)
};
