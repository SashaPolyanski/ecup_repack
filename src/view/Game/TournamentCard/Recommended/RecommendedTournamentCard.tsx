import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {Box} from "@mui/material";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {games} from "@constants";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints";
import {RecommendedTournamentInfo} from "./RecommendedTournamentInfo";

type TournamentCardProps = {
  tournament: TournamentReadOnly
}
const TournamentCardContainer = styled(Box)`
  background-color: #252a40;
  border-radius: 20px;
  width: 100%;
  height: 250px;
  cursor: pointer;
  display: flex;
  margin-top: 10px;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    width: 350px;
    height: 400px;
  }
`
const TournamentCardImageContainer = styled(Box)`
  height: 100%;
  width: 600px;
`
const TournamentCardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px 0 0 20px;

`
export const RecommendedTournamentCardComponent: FC<TournamentCardProps & WithGamePkProps> = ({tournament, gamePk}) => {
  const {id, avatar} = tournament
  const navigate = useNavigate()
  const navigateToTournament = () => {
    navigate(games.tournament.replace(':gameId', gamePk.toString()).replace(':id', id.toString()))
  }
  return (
    <TournamentCardContainer onClick={navigateToTournament}>
      <TournamentCardImageContainer>
        <TournamentCardImage src={avatar.file}/>
      </TournamentCardImageContainer>
      <RecommendedTournamentInfo tournament={tournament}/>
    </TournamentCardContainer>
  );
};

export const RecommendedTournamentCard: FC<TournamentCardProps> = withGamePk()(RecommendedTournamentCardComponent)
