import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {RecommendedTournamentEnd} from "./RecommendedTournamentEnd";

type RecommendedTournamentInfoProps = {
  tournament: TournamentReadOnly
}

export const RecommendedTournamentInfo: FC<RecommendedTournamentInfoProps> = ({tournament}) => {
  const {schedule} = tournament
  const startAt = schedule[schedule.length - 1]
  return (
    <div>
      <RecommendedTournamentEnd startAt={startAt}/>
    </div>
  );
};
