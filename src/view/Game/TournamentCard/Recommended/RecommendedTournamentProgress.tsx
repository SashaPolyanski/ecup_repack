import {FC} from 'react'
import {ParticipantsProgress} from "@shared";

type RecommendedTournamentProgressProps = {
  teams: number
  maxTeams: number
}

export const RecommendedTournamentProgress: FC<RecommendedTournamentProgressProps> = ({maxTeams, teams}) => {
  return <ParticipantsProgress teams={teams} maxTeams={maxTeams} px={0}/>
};
