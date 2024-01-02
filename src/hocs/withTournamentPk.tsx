import { isNotNil } from "@utils";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { isNumber } from "@/utils/isNumber";

export type withTournamentPkProps = {
  tournamentPk: number;
};

export const withTournamentPk = () => {
  return <T extends {}>(Component: FC<T & withTournamentPkProps>) =>
    (props: T) => {
      const { id } = useParams();

      const pk = isNotNil(id) && isNumber(+id) ? +id : -1;

      return <Component {...props} tournamentPk={pk} />;
    };
};
