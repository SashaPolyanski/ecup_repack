import { FC } from "react";
import { Conditions } from "./TournamentRegistrationButton";
import { TournamentAuthButton } from "./AuthButton";
import { RegistrationButton } from "./RegistrationButton";
import { ConfirmButton } from "./ConfirmButton";
import { InTournamentButton } from "./InTournamentButton";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type TournamentButtonProps = {
  conditions: Conditions;
  tournamentPk: number;
};

export const TournamentButton: FC<TournamentButtonProps> = ({
  conditions,
  tournamentPk,
}) => {
  const { t } = useTranslation("common");
  if (conditions) {
    const { isAuth, confirm, start, inTournament } = conditions;
    if (!isAuth) {
      return <TournamentAuthButton />;
    }
    if (isAuth && !start && !inTournament) {
      return <RegistrationButton tournamentPk={tournamentPk} />;
    }
    if (isAuth && !confirm && !start && inTournament) {
      return <InTournamentButton tournamentPk={tournamentPk} />;
    }
    if (isAuth && confirm && !start) {
      return <ConfirmButton tournamentPk={tournamentPk} />;
    }
    if ((!isAuth || isAuth) && start) {
      return <Typography>{t("registrationClosed")}</Typography>;
    }
  }
};
