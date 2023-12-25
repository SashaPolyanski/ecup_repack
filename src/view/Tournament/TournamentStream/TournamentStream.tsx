import {useQuery} from "@/api/hooks/useQuery";
import {TournamentReadOnly} from "@/api/types";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {FC} from "react";

export const TournamentStreamComponent: FC<withTournamentPkProps & WithGamePkProps> = ({tournamentPk, gamePk}) => {
  const {data} = useQuery<TournamentReadOnly>({path: `/games/${gamePk}/tournaments/${tournamentPk}/`})
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
export const TournamentStream = withTournamentPk()(withGamePk()(TournamentStreamComponent))
