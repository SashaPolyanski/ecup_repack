import { FC } from "react";
import { Box, Stack } from "@mui/material";
import { Button } from "@shared";
import TelegramIcon from "@mui/icons-material/Telegram";
import DiscordIcon from "@assets/discordIcon.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type TournamentModalContentProps = {
  closeModalHandler: () => void;
};

export const TournamentModalContent: FC<TournamentModalContentProps> = ({
  closeModalHandler,
}) => {
  const { t } = useTranslation("common");
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box textAlign={"center"}>{t("registerTournamentDescModal")}</Box>
      <Stack flexDirection={"row"} gap={3} mt={4} sx={{ width: "100%" }}>
        <Link
          to={"https://go.ecup.pro/tg-main"}
          target={"_blank"}
          style={{ width: "50%" }}
        >
          <Button
            sx={{ backgroundColor: "#25a2e0", width: "100%" }}
            startIcon={<TelegramIcon />}
          >
            Telegram
          </Button>
        </Link>
        <Link
          to={"https://go.ecup.pro/ds-main"}
          target={"_blank"}
          style={{ width: "50%" }}
        >
          <Button
            sx={{ backgroundColor: "#5865f2", width: "100%" }}
            startIcon={<DiscordIcon width={18} />}
          >
            Discord
          </Button>
        </Link>
      </Stack>
      <Button
        variant={"outlined"}
        onClick={closeModalHandler}
        sx={{ width: "100%", marginTop: "20px" }}
      >
        {t("ready")}
      </Button>
    </Box>
  );
};
