import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {tournamentCard} from "./TournamentCard";

type UpcomingTournamentsProps = {
  tournaments: TournamentReadOnly[]
}

export const UpcomingTournaments: FC<UpcomingTournamentsProps> = ({tournaments}) => {
  const compareTournaments = (a: TournamentReadOnly, b: TournamentReadOnly) => {
    const order = {
      RECOMMENDED: 1,
      BASIC: 2,
    };

    return order[a.type] - order[b.type];
  };

  const sortedTournament = tournaments.slice().sort(compareTournaments);
  return sortedTournament.map(m => {
    const Component = tournamentCard[m.type]
    return <Component tournament={m} key={m.id}/>
  })
};
