import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {tournamentCard} from "./TournamentCard";

type CurrentTournamentsProps = {
  tournaments: TournamentReadOnly[]
}

export const CurrentTournaments: FC<CurrentTournamentsProps> = ({tournaments}) => {
  return tournaments.map(m => {
    const Component = tournamentCard[m.type]
    return <Component tournament={m} key={m.id}/>
  })
};
