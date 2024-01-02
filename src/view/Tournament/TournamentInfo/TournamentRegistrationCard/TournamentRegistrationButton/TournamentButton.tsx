import { FC } from "react";
import { Conditions } from "./TournamentRegistrationButton";
import { TournamentAuthButton } from "./AuthButton";
import { RegistrationButton } from "./RegistrationButton";
import { ConfirmButton } from "./ConfirmButton";
import { InTournamentButton } from "./InTournamentButton";

type TournamentButtonProps = {
  conditions: Conditions;
  openModalHandler: () => void;
};

export const TournamentButton: FC<TournamentButtonProps> = ({
  conditions,
  openModalHandler,
}) => {
  if (conditions) {
    const { isAuth, confirm, start, inTournament } = conditions;
    if (!isAuth) {
      return <TournamentAuthButton />;
    }
    if (isAuth && !start && !inTournament) {
      return <RegistrationButton openModalHandler={openModalHandler} />;
    }
    if (isAuth && !confirm && !start && inTournament) {
      return <InTournamentButton />;
    }
    if (isAuth && confirm && !start) {
      return <ConfirmButton />;
    }
    if ((!isAuth || isAuth) && start) {
      return;
    }
  }
};
