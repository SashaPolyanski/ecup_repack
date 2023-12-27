import {FC} from 'react'
import {TournamentCard} from "@view/Game/TournamentCard";
import {TournamentReadOnly} from "@/api/types";

type PastTournamentsProps = {
  tournaments: TournamentReadOnly[]
}

export const PastTournaments: FC<PastTournamentsProps> = ({tournaments}) => {
  return tournaments.map(m => <TournamentCard tournament={m} key={m.id}/>)
};
