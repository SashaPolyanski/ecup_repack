import {FC} from 'react'
import {TournamentRegistrationCard} from "./TournamentRegistrationCard";


type TournamentsInfoProps = {}

export const TournamentsInfo: FC<TournamentsInfoProps> = ({}) => {
  return (
    <div>
      <TournamentRegistrationCard/>
    </div>
  );
};
