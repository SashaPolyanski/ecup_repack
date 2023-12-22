import {useQuery} from "@/api/hooks/useQuery";
import {useParams} from "react-router-dom";
import {GameReadOnly, PaginatedTournamentReadOnlyList} from "@/api/types";
import {Box} from "@mui/material";
import {TournamentCard} from "@view/Game/TournamentCard";
import {Banner} from "@shared";
import styled from "@emotion/styled";

const GameContainer = styled(Box)`
  width: 100%;`
export const Game = () => {
  const {gameId} = useParams()
  const {data} = useQuery<PaginatedTournamentReadOnlyList>({path: `/games/${gameId}/tournaments`, skip: !!gameId})
  const {data: gameData} = useQuery<GameReadOnly>({path: `/games/${gameId}`, skip: !!gameId})
  return (
    <GameContainer>
      <Banner bannerImane={gameData?.header?.file}/>
      <Box>
        {data?.results?.map(m => <TournamentCard tournament={m}/>)}
      </Box>
    </GameContainer>
  );
};
