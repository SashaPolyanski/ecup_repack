import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {tournamentCard} from "./TournamentCard";

type PastTournamentsProps = {
  tournaments: TournamentReadOnly[]
}

export const PastTournaments: FC<PastTournamentsProps> = ({tournaments}) => {
  return tournaments.map(m => {
    const Component = tournamentCard[m.type]
    return <Component tournament={m} key={m.id}/>
  })
};
