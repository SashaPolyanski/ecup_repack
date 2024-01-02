import { Button, notification } from "@shared";
import { useMutation } from "@/api/hooks/useMutation";
import {
  PaginatedTournamentTeamReadOnlyList,
  PatchedTournamentTeamUpdate,
  TournamentTeamUpdate,
} from "@/api/types";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import { FC, SyntheticEvent } from "react";
import { useQuery } from "@/api/hooks/useQuery";
import { useUserStore } from "@/Zustand/userStore";
import { useTranslation } from "react-i18next";
import { Stack, useMediaQuery } from "@mui/material";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints";
import styled from "@emotion/styled";

type ConfirmButtonProps = WithGamePkProps & {
  tournamentPk: number;
};
const CnfrmButton = styled(Button)`
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    width: 100%;
  }
`;

export const ConfirmButtonComponent: FC<ConfirmButtonProps> = ({
  tournamentPk,
  gamePk,
}) => {
  const { user } = useUserStore();
  const isSmallScreen = useMediaQuery(`(max-width: 931px)`);
  const { t } = useTranslation("common");
  const { data } = useQuery<PaginatedTournamentTeamReadOnlyList>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`,
  });
  const { mutate: unRegistered, loading: unRegLoading } = useMutation({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/teams/${
      data?.results && data?.results[0].id
    }`,
    method: "DELETE",
    token: true,
    queryKeyRefetch: [
      `/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`,
      `/games/${gamePk}/tournaments/?limit=1000`,
    ],
  });
  const unRegisteredHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    unRegistered({});
  };
  const isConfirmed = data?.results && data?.results[0].is_confirmed;
  const { mutate: registrationConfirm, loading } = useMutation<
    PatchedTournamentTeamUpdate,
    TournamentTeamUpdate
  >({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/teams/${
      data?.results && data?.results[0].id
    }`,
    method: "PATCH",
    token: true,
    queryKeyRefetch: [
      `/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`,
    ],
  });
  const registrationConfirmHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    registrationConfirm({ is_confirmed: true }).then(() => {
      notification({ message: t("confirmNotification"), type: "success" });
    });
  };
  const unRegistrationConfirmHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    registrationConfirm({ is_confirmed: false }).then(() => {
      notification({ message: t("unConfirmNotification"), type: "error" });
    });
  };
  return !isConfirmed ? (
    <Stack spacing={2} direction={"row"}>
      <Button
        loading={loading}
        variant={"outlined"}
        onClick={registrationConfirmHandler}
      >
        {t(isSmallScreen ? "smallScreenConfirm" : "registerTournament")}
      </Button>
      <Button
        variant={"outlined"}
        loading={unRegLoading}
        onClick={unRegisteredHandler}
      >
        {t(isSmallScreen ? "smallScreenCancel" : "cancelRegistration")}
      </Button>
    </Stack>
  ) : (
    <CnfrmButton
      variant={"outlined"}
      onClick={unRegistrationConfirmHandler}
      loading={loading}
    >
      {t("unRegisterTournament")}
    </CnfrmButton>
  );
};
export const ConfirmButton: FC<{ tournamentPk: number }> = withGamePk()(
  ConfirmButtonComponent,
);
