import { FC } from "react";
import { TeamScoreReadOnly } from "@/api/types";
import { Avatar, Box, Grid } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { notification } from "@shared";
import { useTranslation } from "react-i18next";

type TeamInfoProps = {
  team: TeamScoreReadOnly;
};

export const TeamInfo: FC<TeamInfoProps> = ({ team }) => {
  const { t } = useTranslation("common");
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
    <Grid container>
      <Grid item xs={4} display={"flex"} alignItems={"center"}>
        <Avatar
          sx={{ marginRight: "20px" }}
          src={team?.team?.avatar ? team?.team?.avatar.file : ""}
        />
        {team.team.name}
      </Grid>
      <Grid item xs={3}>
        <Box ml={3}>{team.team.users[0].battle_tag}</Box>
      </Grid>
      <Grid item xs={3}>
        <Box ml={3} sx={{ cursor: "pointer" }} onClick={copyBattleTag}>
          <ContentCopyIcon />
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box ml={3}>{`${Math.round(team?.value)} pts`}</Box>
      </Grid>
    </Grid>
  );
};
