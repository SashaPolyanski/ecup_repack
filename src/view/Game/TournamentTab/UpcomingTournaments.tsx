import {useMediaQuery} from "@mui/material";
import {PaginatedTournamentReadOnlyList, TournamentReadOnly} from "@/api/types";
import {tournamentCard} from "./TournamentCard";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {useQuery} from "@/api/hooks/useQuery.ts";
import {FC} from "react";
import {SkeletonLoader} from "@view/Game/TournamentCard";


export const UpcomingTournamentsComponent: FC<WithGamePkProps> = ({gamePk}) => {
  const isSmallScreen = useMediaQuery(`(max-width: 716px)`)
  const {data, isLoading} = useQuery<PaginatedTournamentReadOnlyList>({
    path: `/games/${gamePk}/tournaments/?limit=1000&status=NOT_STARTED`,
    skip: !!gamePk
  })
  const compareTournaments = (a: TournamentReadOnly, b: TournamentReadOnly) => {
    const order = {
      RECOMMENDED: 1,
      BASIC: 2,
    };

    return order[a.type] - order[b.type];
  };

  const sortedTournament = data?.results?.slice().sort(compareTournaments);
  return !isLoading ? <SkeletonLoader/> : sortedTournament?.map(m => {
    const Component = tournamentCard[isSmallScreen ? 'BASIC' : m.type]
    return <Component tournament={m} key={m.id}/>
  })
};
export const UpcomingTournaments: FC = withGamePk()(UpcomingTournamentsComponent)
