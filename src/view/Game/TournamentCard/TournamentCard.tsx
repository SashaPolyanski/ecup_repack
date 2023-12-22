import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {Box} from "@mui/material";
import styled from "@emotion/styled";
import {transientOptions} from "@utils";
import {TournamentEnd} from "./TournamentEnd";
import {TournamentTitle} from "./TournamentTitle";
import {TournamentRegistrationProgress} from "./TournamentRegistrationProgress";
import {TournamentRegistrationButton} from "./TournamentRegistrationButton";
import {useNavigate, useParams} from "react-router-dom";
import {games} from "@constants";

type TournamentCardProps = {
  tournament: TournamentReadOnly
}
const TournamentCardContainer = styled(Box, transientOptions)<{ $backgroundImage: string }>`
  background-image: ${({$backgroundImage}) => $backgroundImage && `url(${$backgroundImage})`};
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  width: 300px;
  height: 300px;
  cursor: pointer;
`
const TournamentCardContent = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
`

export const TournamentCard: FC<TournamentCardProps> = ({tournament}) => {
  const {name, teams, max_teams, start_at, type, description, real_money, game, id} = tournament
  const navigate = useNavigate()
  const {gameId} = useParams()
  const navigateToTournament = () => {
    if (gameId) {
      navigate(games.tournament.replace(':gameId', gameId).replace(':id', id.toString()))
    }
  }
  // TODO потом сделать нормальную карточку
  return (
    <TournamentCardContainer $backgroundImage={game.banner.file} sx={{width: '100%'}} display={'flex'}
                             justifyContent={'end'} onClick={navigateToTournament}>
      <TournamentCardContent>
        <TournamentEnd start_at={start_at}/>
        <TournamentTitle name={name} type={type} description={description}/>
        <TournamentRegistrationProgress teams={teams.length} max_teams={max_teams}/>
        <TournamentRegistrationButton real_money={real_money}/>
      </TournamentCardContent>
    </TournamentCardContainer>
  );
};