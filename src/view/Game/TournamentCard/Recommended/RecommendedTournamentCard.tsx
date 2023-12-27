import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {Box} from "@mui/material";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {games} from "@constants";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk.tsx";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints.ts";

type TournamentCardProps = {
  tournament: TournamentReadOnly
}
const TournamentCardContainer = styled(Box)`
  background-color: #252a40;
  border-radius: 20px;
  width: 440px;
  height: 470px;
  cursor: pointer;
  margin-top: 10px;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    width: 350px;
    height: 400px;
  }
`

const TournamentCardContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const TournamentCardImageContainer = styled(Box)`
  height: 60%;
  width: 100%;
`
const TournamentCardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0 0;

`
export const RecommendedTournamentCardComponent: FC<TournamentCardProps & WithGamePkProps> = ({tournament, gamePk}) => {
  const {name, teams, max_teams, start_at, type, id, avatar, status} = tournament
  const navigate = useNavigate()
  const navigateToTournament = () => {
    navigate(games.tournament.replace(':gameId', gamePk.toString()).replace(':id', id.toString()))
  }
  return (
    <TournamentCardContainer onClick={navigateToTournament}>
      <TournamentCardImageContainer><TournamentCardImage src={avatar.file}/></TournamentCardImageContainer>
    </TournamentCardContainer>
  );
};

export const RecommendedTournamentCard: FC<TournamentCardProps> = withGamePk()(RecommendedTournamentCardComponent)
