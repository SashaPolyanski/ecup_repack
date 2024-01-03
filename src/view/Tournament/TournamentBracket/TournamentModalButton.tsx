import { FC } from "react";
import { Stack } from "@mui/material";
import { Button } from "@shared";
import { useTranslation } from "react-i18next";

type TournamentModalButtonProps = {
  loading: boolean;
  closeConfirmModalHandler: () => void;
  confirmPlaceHandler: () => void;
};

export const TournamentModalButton: FC<TournamentModalButtonProps> = ({
  closeConfirmModalHandler,
  confirmPlaceHandler,
  loading,
}) => {
  const { t } = useTranslation("common");
  return (
    <Stack
      direction={"row"}
      sx={{ display: "flex", justifyContent: "center" }}
      gap={4}
    >
      <Button
        variant={"outlined"}
        disabled={loading}
        onClick={closeConfirmModalHandler}
      >
        {t("calcelConfirmPlace")}
      </Button>
      <Button
        variant={"outlined"}
        loading={loading}
        onClick={confirmPlaceHandler}
      >
        {t("confirmPlace")}
      </Button>
    </Stack>
  );
};
