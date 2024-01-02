import { FC, useState } from "react";
import { MatchReadOnly, ScoreMatch, TeamScoreReadOnly } from "@/api/types";
import { Preloader, Tabs } from "@shared";
import { useTranslation } from "react-i18next";
import { Tab } from "@/shared/ui/Tabs/Tabs";
import { TournamentsUsersTable } from "./TournamentsUsersTable";
import { TournamentGeneralTable } from "./TournamentGeneralTable";
import { Box } from "@mui/material";

type TournamentModalContentProps = {
  lobbyInfo?: MatchReadOnly;
};

export type TabsComponents = {
  teams?: TeamScoreReadOnly[];
  scores?: ScoreMatch[];
};

export const TournamentModalContent: FC<TournamentModalContentProps> = ({
  lobbyInfo,
}) => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const dynamicTabs = () => {
    const periodsTabs = lobbyInfo?.periods?.map((_, i) => {
      return {
        id: i + 1,
        label: t("period", { number: i + 1 }),
        value: i,
        component: TournamentsUsersTable,
      };
    });

    if (periodsTabs && lobbyInfo) {
      return [
        ...periodsTabs,
        {
          id: lobbyInfo?.periods.length + 1,
          value: lobbyInfo?.periods.length,
          label: t("generalTable"),
          component: TournamentGeneralTable,
        },
      ];
    }
  };

  const tabsComponents: FC<TabsComponents>[] | undefined = dynamicTabs()?.map(
    (tab) => tab.component,
  );
  const Component = tabsComponents?.length
    ? tabsComponents[tabValue]
    : TournamentsUsersTable;

  return (
    <Box sx={{ height: "100%" }}>
      {!lobbyInfo ? (
        <Preloader />
      ) : (
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <Tabs
            setTabValue={setTabValue}
            tabs={dynamicTabs() as Tab[]}
            value={tabValue}
          />
          <Component
            teams={
              tabValue === lobbyInfo?.periods.length
                ? undefined
                : lobbyInfo?.periods[tabValue].team_scores
            }
            scores={
              tabValue === lobbyInfo?.periods.length
                ? lobbyInfo?.scores
                : undefined
            }
          />
        </Box>
      )}
    </Box>
  );
};
