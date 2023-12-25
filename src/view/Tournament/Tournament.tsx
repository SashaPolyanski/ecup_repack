import {FC, useState} from 'react'
import {useQuery} from "@/api/hooks/useQuery";
import {Banner, Preloader} from "@shared";
import {TournamentReadOnly} from "@/api/types";
import {Box, Typography} from "@mui/material";
import {TournamentTabs} from "./TournamentTabs";
import {TournamentsInfo} from "./TournamentInfo";
import {TournamentStream} from "./TournamentStream";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import styled from "@emotion/styled";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints";

type TournamentProps = WithGamePkProps & withTournamentPkProps
const TournamentName = styled(Typography)`
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    text-align: center;
  }`

const tournamentsComponents = [TournamentsInfo, TournamentsInfo, TournamentStream, TournamentsInfo]
export const TournamentComponent: FC<TournamentProps> = ({tournamentPk, gamePk}) => {
  const [tabValue, setTabValue] = useState(0)
  const {data} = useQuery<TournamentReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/`,
  })
  const TournamentComponent = tournamentsComponents[tabValue]
  return (
    !data ? <Preloader/> : <>
      <Banner bannerImage={data?.avatar?.file}/>
      <Box px={1}>
        <TournamentName fontSize={30} my={2}>
          {data?.name}
        </TournamentName>
        <TournamentTabs tabValue={tabValue} setTabValue={setTabValue}/>
        <TournamentComponent/>
      </Box>

    </>
  );
};
export const Tournament = withTournamentPk()(withGamePk()(TournamentComponent))
