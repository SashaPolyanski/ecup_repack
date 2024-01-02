import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

type StartAt = {
  [key: string]: unknown;
};
type RecommendedTournamentEndProps = {
  startAt: StartAt;
};

export const RecommendedTournamentStart: FC<RecommendedTournamentEndProps> = ({
  startAt,
}) => {
  const { t } = useTranslation("common");
  const format_date = new Date(Object.values(startAt)[0] as string)
    ?.toLocaleString("ru-RU", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour12: false,
    })
    .slice(0, 17);
  return <Box mt={2}>{t("startTournament", { day: format_date })}</Box>;
};
