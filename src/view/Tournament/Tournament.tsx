import {FC} from 'react'
import {useQuery} from "@/api/hooks/useQuery.ts";
import {useParams} from "react-router-dom";
import {Preloader} from "@shared";
import {TournamentReadOnly} from "@/api/types";

type TournamentProps = {}

export const Tournament: FC<TournamentProps> = ({}) => {
  const {gameId, id} = useParams()
  const {data} = useQuery<TournamentReadOnly>({path: `/games/${gameId}/tournaments/${id}`})
  console.log(data)
  return (
    !data ? <Preloader/> : <div>
      {data?.name}
    </div>

  );
};
