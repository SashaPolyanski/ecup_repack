import {FC} from 'react'
import {Conditions} from "./TournamentRegistrationButton";
import {TournamentAuthButton} from "./AuthButton";
import {RegistrationButton} from "./RegistrationButton";
import {ConfirmButton} from "./ConfirmButton";
import {InTournamentButton} from "./InTournamentButton";

type TournamentButtonProps = {
  conditions: Conditions
}

export const TournamentButton: FC<TournamentButtonProps> = ({conditions}) => {
  if (conditions) {
    const {isAuth, confirm, start, inTournament} = conditions
    if (!isAuth) {
      return <TournamentAuthButton/>
    }
    if (isAuth && !confirm && !start && !inTournament) {
      return <RegistrationButton/>
    }
    if (isAuth && !confirm && !start && inTournament) {
      return <InTournamentButton/>
    }
    if (isAuth && confirm) {
      <ConfirmButton/>
    }
    if (isAuth && start) {
      return
    }
  }
};
