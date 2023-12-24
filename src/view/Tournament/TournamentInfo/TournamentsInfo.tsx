import {FC} from 'react'
import {TournamentRegistrationCard} from "./TournamentRegistrationCard";
import {TournamentsPrize} from "./TournamentPrize";


type TournamentsInfoProps = {}

export const TournamentsInfo: FC<TournamentsInfoProps> = ({}) => {
  return (
    <div>
      <TournamentRegistrationCard/>
      <TournamentsPrize/>
    </div>
  );
};
