import { FC, useState } from "react";
import { PatchedTeamScore, TeamScore, TeamScoreReadOnly } from "@/api/types";
import { Box, Grid, SelectChangeEvent, useMediaQuery } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Modal, notification } from "@shared";
import { useTranslation } from "react-i18next";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints";
import { useUserStore } from "@/Zustand/userStore";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import {
  withTournamentPk,
  withTournamentPkProps,
} from "@/hocs/withTournamentPk";
import { useMutation } from "@/api/hooks/useMutation";
import { TournamentModalButton } from "./TournamentModalButton";
import { TournamentUsersTableSelect } from "./TournamentUsersTableSelect";
import { TournamentUserInfo } from "./TournamentUserInfo";

type TeamInfoProps = {
  team: TeamScoreReadOnly;
  lobbyPk?: number;
};
type TournamentTeamInfo = WithGamePkProps &
  withTournamentPkProps &
  TeamInfoProps;

export const TournamentTeamInfoComponent: FC<TournamentTeamInfo> = ({
  team,
  gamePk,
  tournamentPk,
  lobbyPk,
}) => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [hiddenSelect, setHiddenSelect] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { t } = useTranslation("common");
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`);
  const { user } = useUserStore();
  const { mutate: updateScores, loading } = useMutation<
    PatchedTeamScore,
    TeamScore
  >({
    path: "",
    method: "PATCH",
    token: true,
    queryKeyRefetch: [
      `/games/${gamePk}/tournaments/${tournamentPk}/matches/${lobbyPk}/`,
    ],
  });
  const showConfirmModalHandler = () => {
    setShowConfirmModal(true);
  };
  const closeConfirmModalHandler = () => {
    setShowConfirmModal(false);
  };
  const copyBattleTag = () => {
    navigator.clipboard
      .writeText(team?.team?.users[0]?.battle_tag as string)
      .then(() => {
        notification({
          message: t("copySuccess", { tag: team?.team?.users[0]?.battle_tag }),
          type: "success",
        });
      });
  };
  const isUser = user?.team === team?.team?.id;
  const handleChange = (e: SelectChangeEvent) => {
    setValue(+e.target.value);
    if (user?.is_staff) {
      updateScores({
        args: { value: +e.target.value },
        pathWithParams: `/games/${gamePk}/tournaments/${tournamentPk}/matches/${lobbyPk}/periods/${team.period}/scores/${team.id}`,
      });
    }
    if (isUser) {
      showConfirmModalHandler();
    }
  };
  const confirmPlaceHandler = () => {
    updateScores({
      args: { value: value },
      pathWithParams: `/games/${gamePk}/tournaments/${tournamentPk}/matches/${lobbyPk}/periods/${team.period}/scores/${team.id}`,
    }).then(() => {
      notification({
        message: t("confirmPlaceNotification", { place: value }),
        type: "success",
      });
      setHiddenSelect(true);
      closeConfirmModalHandler();
    });
  };
  const conditions = isSmallScreen
    ? 2
    : user?.is_staff || isUser
      ? hiddenSelect
        ? 3
        : 1
      : 3;
  return (
    <>
      <Grid container alignItems="center">
        <Grid
          item
          xs={isSmallScreen ? 7 : 4}
          display={"flex"}
          alignItems={"center"}
        >
          <TournamentUserInfo
            avatar={team?.team?.avatar ? team?.team?.avatar.file : ""}
            team_name={team.team.name}
            battle_tag={team?.team?.users[0].battle_tag}
          />
        </Grid>
        {!isSmallScreen ? (
          <Grid item xs={3}>
            <Box ml={3}>{team?.team?.users[0].battle_tag}</Box>
          </Grid>
        ) : null}
        <Grid item xs={conditions}>
          <Box ml={3} sx={{ cursor: "pointer" }} onClick={copyBattleTag}>
            <ContentCopyIcon />
          </Box>
        </Grid>
        <Grid item xs={isSmallScreen ? 3 : user?.is_staff || isUser ? 2 : 2}>
          <Box ml={3}>
            <Box>{`${Math.round(team?.value)} pts`}</Box>
            {isSmallScreen ? (
              <TournamentUsersTableSelect
                value={value}
                handleChange={handleChange}
              />
            ) : null}
          </Box>
        </Grid>
        {user?.is_staff || isUser ? (
          hiddenSelect || isSmallScreen ? null : (
            <Grid item xs={2}>
              <TournamentUsersTableSelect
                value={value}
                handleChange={handleChange}
              />
            </Grid>
          )
        ) : null}
      </Grid>

      <Modal
        width={450}
        height={180}
        open={showConfirmModal}
        title={t("confirmPlaceModal", { place: value })}
        onClose={closeConfirmModalHandler}
      >
        <TournamentModalButton
          closeConfirmModalHandler={closeConfirmModalHandler}
          loading={loading}
          confirmPlaceHandler={confirmPlaceHandler}
        />
      </Modal>
    </>
  );
};
export const TournamentTeamInfo = withTournamentPk()(
  withGamePk()(TournamentTeamInfoComponent),
);
