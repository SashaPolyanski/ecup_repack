import {useQuery} from "@/api/hooks/useQuery";
import {useParams} from "react-router-dom";
import {GameReadOnly, PaginatedTournamentReadOnlyList} from "@/api/types";
import {Box} from "@mui/material";
import styled from "@emotion/styled";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints";
import {transientOptions} from "@utils";
import {TournamentCard} from "@view/Games/TournamentCard";

const ImageContainer = styled(Box, transientOptions)<{ $backgroundImage?: string }>`
  width: 100%;
  height: 500px;
  background-image: ${({$backgroundImage}) => $backgroundImage && `url(${$backgroundImage})`};
  background-position: center;
  background-size: cover;
  box-shadow: inset 100px -20px 200px 0px rgb(23, 28, 38);
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    height: 350px;
  }
`
export const Game = () => {
  const {gameId} = useParams()
  const {data} = useQuery<PaginatedTournamentReadOnlyList>({path: `/games/${gameId}/tournaments`, skip: !!gameId})
  const {data: gameData} = useQuery<GameReadOnly>({path: `/games/${gameId}`, skip: !!gameId})
  return (
    <Box sx={{width: '100%'}}>
      <ImageContainer $backgroundImage={gameData?.header?.file}/>
      <Box>
        {data?.results?.map(m => <TournamentCard tournament={m}/>)}
      </Box>
    </Box>
  );
};
