import {useQuery} from "@/api/hooks/useQuery";
import {GameReadOnly, PaginatedTournamentReadOnlyList} from "@/api/types";
import {Box} from "@mui/material";
import {TournamentCard} from "@view/Game/TournamentCard";
import {Banner} from "@shared";
import styled from "@emotion/styled";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk.tsx";
import {FC} from "react";

const GameContainer = styled(Box)`
  width: 100%;`
export const GameComponent: FC<WithGamePkProps> = ({gamePk}) => {
  const {data} = useQuery<PaginatedTournamentReadOnlyList>({path: `/games/${gamePk}/tournaments/`, skip: !!gamePk})
  const {data: gameData} = useQuery<GameReadOnly>({path: `/games/${gamePk}/`, skip: !!gamePk})
  return (
    <GameContainer>
      <Banner bannerImage={gameData?.header?.file}/>
      <Box>
        {data?.results?.map(m => <TournamentCard tournament={m}/>)}
      </Box>
    </GameContainer>
  );
};


export const Game = withGamePk()(GameComponent)
