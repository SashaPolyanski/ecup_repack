import { AuthButton } from "@shared";
import { useTranslation } from "react-i18next";

export const TournamentAuthButton = () => {
  const { t } = useTranslation("common");
  return (
    <AuthButton
      variant={"outlined"}
      title={t("regAccount")}
      action={"signup"}
    />
  );
};
