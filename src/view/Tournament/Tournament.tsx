import {FC, useState} from 'react'
import {useQuery} from "@/api/hooks/useQuery";
import {useParams} from "react-router-dom";
import {Banner, Preloader} from "@shared";
import {TournamentReadOnly} from "@/api/types";
import {Typography} from "@mui/material";
import {TournamentTabs} from "./TournamentTabs";
import {TournamentsInfo} from "./TournamentInfo";
import {TournamentStream} from "./TournamentStream";

type TournamentProps = {}
const tournamentsComponents = [TournamentsInfo, TournamentsInfo, TournamentStream, TournamentsInfo]
export const Tournament: FC<TournamentProps> = ({}) => {
  const [tabValue, setTabValue] = useState(0)
  const {gameId, id} = useParams()
  const {data} = useQuery<TournamentReadOnly>({path: `/games/${gameId}/tournaments/${id}`})
  const TournamentComponent = tournamentsComponents[tabValue]
  return (
    !data ? <Preloader/> : <>
      <Banner bannerImane={data?.avatar?.file}/>
      <Typography fontSize={30} my={2}>
        {data?.name}
      </Typography>
      <TournamentTabs tabValue={tabValue} setTabValue={setTabValue}/>
      <TournamentComponent/>
    </>
  );
};
