import { FC } from "react";
import { TournamentTeamInfo } from "./TournamentTeamInfo";
import { Box, Typography } from "@mui/material";
import { TabsComponents } from "./TournamentModalContent";
import { Button, notification } from "@shared";
import { useTranslation } from "react-i18next";
import { useMutation } from "@/api/hooks/useMutation";
import {
  withTournamentPk,
  withTournamentPkProps,
} from "@/hocs/withTournamentPk";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import { useUserStore } from "@/Zustand/userStore";

type TournamentsUsersTable = WithGamePkProps &
  withTournamentPkProps &
  TabsComponents;
export const TournamentsUsersTableComponent: FC<TournamentsUsersTable> = ({
  teams,
  lobbyPk,
  tournamentPk,
  gamePk,
  lobbyStatus,
}) => {
  const { t } = useTranslation("common");
  const { user } = useUserStore();
  const { mutate: finishLobby, loading } = useMutation({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/matches/${lobbyPk}/finish`,
    method: "POST",
    token: true,
    queryKeyRefetch: [
      `/games/${gamePk}/tournaments/${tournamentPk}/matches/${lobbyPk}/`,
    ],
  });
  const isUser = user?.team === teams?.[0]?.team?.id ?? undefined;
  const finishLobbyHandler = () => {
    finishLobby({ args: {} }).then((res) => {
      if (res.ok) {
        notification({
          message: t("lobbyCompletedNotification"),
          type: "success",
        });
      } else {
        notification({
          message: t("lobbyCompletedFailNotification"),
          type: "error",
        });
      }
    });
  };
  return (
    <Box sx={{ overflow: "auto", height: "90%" }}>
      {teams?.map((m, i) => (
        <Box display={"flex"} key={m.id} mt={2} alignItems={"center"}>
          <Box mr={2}>{i + 1}</Box>
          <TournamentTeamInfo team={m} lobbyPk={lobbyPk} />
        </Box>
      ))}
      {lobbyStatus === "FINISHED" ? (
        <Typography variant={"h6"} mt={3}>
          {t("lobbyCompleted")}
        </Typography>
      ) : user?.is_staff || isUser ? (
        <Button
          sx={{ marginTop: "24px" }}
          variant={"outlined"}
          loading={loading}
          onClick={finishLobbyHandler}
        >
          {t("finishLobby")}
        </Button>
      ) : null}
    </Box>
  );
};
export const TournamentsUsersTable: FC<TabsComponents> = withTournamentPk()(
  withGamePk()(TournamentsUsersTableComponent),
);
