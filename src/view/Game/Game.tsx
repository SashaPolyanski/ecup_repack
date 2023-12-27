import {useQuery} from "@/api/hooks/useQuery";
import {GameReadOnly, PaginatedTournamentReadOnlyList, TournamentReadOnly} from "@/api/types";
import {Box} from "@mui/material";
import {Banner, Preloader, Tabs} from "@shared";
import styled from "@emotion/styled";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {FC, useMemo, useState} from "react";
import {TFunction} from "i18next";
import {useTranslation} from "react-i18next";
import {CurrentTournaments, PastTournaments, UpcomingTournaments} from "@view/Game/TournamentTab";

const GameContainer = styled(Box)`
  width: 100%;
  height: 100%;
`
const tabs = (t: TFunction) => {
  return [
    {id: 1, label: t('upcoming'), value: 0},
    {id: 2, label: t('current'), value: 1},
    {id: 3, label: t('past'), value: 2},
  ]
}
type TournamentsType = {
  upcoming: TournamentReadOnly[]
  current: TournamentReadOnly[]
  past: TournamentReadOnly[]
}
type TournamentsProps = {
  tournaments: TournamentReadOnly[]
}
type TabComponents = {
  [key: string]: { Component: FC<TournamentsProps>; tournaments: TournamentReadOnly[]; id: number }[];
};
export const GameComponent: FC<WithGamePkProps> = ({gamePk}) => {
  const {t} = useTranslation('common')
  const {data, isLoading} = useQuery<PaginatedTournamentReadOnlyList>({
    path: `/games/${gamePk}/tournaments/`,
    skip: !!gamePk
  })
  const {data: gameData} = useQuery<GameReadOnly>({path: `/games/${gamePk}/`, skip: !!gamePk})
  const [tabValue, setTabValue] = useState(0)
  const tournaments = data?.results?.reduce((acc, cur) => {
    if (cur.status === 'STARTED') {
      acc.current.push(cur);
    } else if (cur.status === 'NOT_STARTED') {
      acc.upcoming.push(cur);
    } else if (cur.status === 'FINISHED') {
      acc.past.push(cur);
    }
    return acc;
  }, {upcoming: [], current: [], past: []} as TournamentsType);
  const components = useMemo(() => {
    return {
      0: [{Component: UpcomingTournaments, tournaments: tournaments?.upcoming, id: 1}],
      1: [{Component: CurrentTournaments, tournaments: tournaments?.current, id: 2}],
      2: [{Component: PastTournaments, tournaments: tournaments?.past, id: 3}],
    } as TabComponents;
  }, [tournaments]);
  const tabComponents = components[tabValue.toString()];
  return (
    <GameContainer pb={3}>
      {isLoading ? <Preloader/> : <>
        <Banner bannerImage={gameData?.header?.file}/>
        <Tabs tabs={tabs(t)} value={tabValue} setTabValue={setTabValue}/>
        <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'} gap={5} pb={2} mt={2}>
          {tabComponents.map(({Component, tournaments, id}) => (
            <Component tournaments={tournaments} key={id}/>
          ))}
        </Box></>}
    </GameContainer>
  );
};


export const Game = withGamePk()(GameComponent)
