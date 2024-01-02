import { isNotNil } from "@utils";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { isNumber } from "@/utils/isNumber";

export type WithGamePkProps = {
  gamePk: number;
};

export const withGamePk = () => {
  return <T extends {}>(Component: FC<T & WithGamePkProps>) =>
    (props: T) => {
      const { gameId } = useParams();

      const gamePk = isNotNil(gameId) && isNumber(+gameId) ? +gameId : -1;

      return <Component {...props} gamePk={gamePk} />;
    };
};
