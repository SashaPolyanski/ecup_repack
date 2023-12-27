import {FC} from 'react'
import {TournamentCard} from "@view/Game/TournamentCard";
import {TournamentReadOnly} from "@/api/types";

type UpcomingTournamentsProps = {
  tournaments: TournamentReadOnly[]
}

export const UpcomingTournaments: FC<UpcomingTournamentsProps> = ({tournaments}) => {
  return tournaments.map(m => <TournamentCard tournament={m} key={m.id}/>)
};
