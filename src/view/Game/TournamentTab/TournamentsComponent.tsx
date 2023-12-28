import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {tournamentCard} from "./TournamentCard";
import {useMediaQuery} from "@mui/material";

type TournamentsComponentProps = {
  tournaments: TournamentReadOnly[]
}

export const TournamentsComponent: FC<TournamentsComponentProps> = ({tournaments}) => {
  const isSmallScreen = useMediaQuery(`(max-width: 716px)`)
  const compareTournaments = (a: TournamentReadOnly, b: TournamentReadOnly) => {
    const order = {
      RECOMMENDED: 1,
      BASIC: 2,
    };

    return order[a.type] - order[b.type];
  };

  const sortedTournament = tournaments.slice().sort(compareTournaments);
  return sortedTournament.map(m => {
    const Component = tournamentCard[isSmallScreen ? 'BASIC' : m.type]
    return <Component tournament={m} key={m.id}/>
  })
};
