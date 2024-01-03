import { Button, notification } from "@shared";
import { useMutation } from "@/api/hooks/useMutation";
import {
  PaginatedTournamentTeamReadOnlyList,
  PatchedTournamentTeamUpdate,
  TournamentTeamUpdate,
} from "@/api/types";
import {
  withTournamentPk,
  withTournamentPkProps,
} from "@/hocs/withTournamentPk";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import { FC } from "react";
import { useQuery } from "@/api/hooks/useQuery";
import { useUserStore } from "@/Zustand/userStore";
import { useTranslation } from "react-i18next";
import { Stack, useMediaQuery } from "@mui/material";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints.ts";
import styled from "@emotion/styled";

type ConfirmButtonProps = WithGamePkProps & withTournamentPkProps;
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
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`);
  const { t } = useTranslation("common");
  const { data } = useQuery<PaginatedTournamentTeamReadOnlyList>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`,
  });
  const { mutate: unRegistered } = useMutation({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/teams/${
      data?.results && data?.results[0].id
    }`,
    method: "DELETE",
    token: true,
    queryKeyRefetch: [
      `/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`,
      `/games/${gamePk}/tournaments/${tournamentPk}/`,
    ],
  });
  const unRegisteredHandler = () => {
    unRegistered({ args: {} });
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
  const registrationConfirmHandler = () => {
    registrationConfirm({ args: { is_confirmed: true } }).then(() => {
      notification({ message: t("confirmNotification"), type: "success" });
    });
  };
  const unRegistrationConfirmHandler = () => {
    registrationConfirm({ args: { is_confirmed: false } }).then(() => {
      notification({ message: t("unConfirmNotification"), type: "error" });
    });
  };
  return !isConfirmed ? (
    <Stack spacing={2} direction={isSmallScreen ? "column" : "row"}>
      <Button
        loading={loading}
        variant={"outlined"}
        onClick={registrationConfirmHandler}
      >
        {t("registerTournament")}
      </Button>
      <Button variant={"outlined"} onClick={unRegisteredHandler}>
        {t("cancelRegistration")}
      </Button>{" "}
    </Stack>
  ) : (
    <CnfrmButton variant={"outlined"} onClick={unRegistrationConfirmHandler}>
      {t("unRegisterTournament")}
    </CnfrmButton>
  );
};
export const ConfirmButton: FC = withTournamentPk()(
  withGamePk()(ConfirmButtonComponent),
);
