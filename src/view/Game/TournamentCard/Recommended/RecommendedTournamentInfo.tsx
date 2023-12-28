import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {RecommendedTournamentStart} from "./RecommendedTournamentStart";
import {RecommendedTournamentTitle} from "./RecommendedTournamentTitle";
import {RecommendedTournamentDesc} from "./RecommendedTournamentDesc";
import {RecommendedTournamentProgress} from "./RecommendedTournamentProgress";
import {TournamentRegistrationButton} from "./TournamentRegistrationButton";
import {Box} from "@mui/material";
import styled from "@emotion/styled";

type RecommendedTournamentInfoProps = {
  tournament: TournamentReadOnly
}
const ButtonContainer = styled(Box)`
  margin-top: 10px;

`
export const RecommendedTournamentInfo: FC<RecommendedTournamentInfoProps> = ({tournament}) => {
  const {schedule, name, description, max_teams, teams, id} = tournament
  const startAt = schedule[schedule.length - 1]
  return (
    <Box ml={3}>
      <RecommendedTournamentStart startAt={startAt}/>
      <RecommendedTournamentTitle title={name}/>
      <RecommendedTournamentDesc desc={description}/>
      <RecommendedTournamentProgress teams={teams.length} maxTeams={max_teams}/>
      <ButtonContainer>
        <TournamentRegistrationButton tournamentPk={id}/>
      </ButtonContainer>
    </Box>
  );
};
