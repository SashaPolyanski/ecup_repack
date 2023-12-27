import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {tournamentCard} from "./TournamentCard";

type UpcomingTournamentsProps = {
  tournaments: TournamentReadOnly[]
}

export const UpcomingTournaments: FC<UpcomingTournamentsProps> = ({tournaments}) => {
  return tournaments.map(m => {
    const Component = tournamentCard[m.type]
    return <Component tournament={m} key={m.id}/>
  })
};
