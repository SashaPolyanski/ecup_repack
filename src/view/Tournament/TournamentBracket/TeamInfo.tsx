import { FC } from "react";
import { TeamScoreReadOnly } from "@/api/types";
import { Avatar, Box, Grid, useMediaQuery } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { notification } from "@shared";
import { useTranslation } from "react-i18next";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints.ts";

type TeamInfoProps = {
  team: TeamScoreReadOnly;
};

export const TeamInfo: FC<TeamInfoProps> = ({ team }) => {
  const { t } = useTranslation("common");
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`);
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
  return (
    <Grid container alignItems="center">
      <Grid item xs={4} display={"flex"} alignItems={"center"}>
        <Avatar
          sx={{ marginRight: "20px" }}
          src={team?.team?.avatar ? team?.team?.avatar.file : ""}
        />
        <Box>
          <Box>{team.team.name}</Box>
          {isSmallScreen ? (
            <Box mt={1}>{team.team.users[0].battle_tag}</Box>
          ) : null}
        </Box>
      </Grid>
      <Grid item xs={3}>
        {!isSmallScreen ? (
          <Box ml={3}>{team.team.users[0].battle_tag}</Box>
        ) : null}
      </Grid>
      <Grid item xs={isSmallScreen ? 2 : 3}>
        <Box ml={3} sx={{ cursor: "pointer" }} onClick={copyBattleTag}>
          <ContentCopyIcon />
        </Box>
      </Grid>
      <Grid item xs={isSmallScreen ? 3 : 2}>
        <Box ml={3}>{`${Math.round(team?.value)} pts`}</Box>
      </Grid>
    </Grid>
  );
};
