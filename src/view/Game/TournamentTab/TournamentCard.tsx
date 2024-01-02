import { TournamentReadOnly, TournamentReadOnlyTypeEnum } from "@/api/types";
import { RecommendedTournamentCard, TournamentCard } from "../TournamentCard";

type TournamentCardProps = {
  tournament: TournamentReadOnly;
};
export const tournamentCard: Record<
  TournamentReadOnlyTypeEnum,
  React.ComponentType<TournamentCardProps>
> = {
  BASIC: TournamentCard,
  RECOMMENDED: RecommendedTournamentCard,
};
