import {useParams} from "react-router-dom";
import {useQuery} from "@/api/hooks/useQuery";
import {TournamentReadOnly} from "@/api/types";

export const TournamentStream = () => {
  const {gameId, id} = useParams()
  const {data} = useQuery<TournamentReadOnly>({path: `/games/${gameId}/tournaments/${id}`})
  return (
    <iframe
      allowFullScreen
      height="500"
      width="90%"
      title="twitch"
      src={`https://player.twitch.tv/?channel=${data?.stream_url}&parent=ecup.pro`}
    />
  );
};
