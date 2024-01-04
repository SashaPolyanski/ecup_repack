import { FC } from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TournamentRegistrationProgress } from "./TournamentRegistrationProgress";
import { useQuery } from "@/api/hooks/useQuery";
import { TournamentReadOnly } from "@/api/types";
import { TournamentRegistrationButton } from "./TournamentRegistrationButton";
import {
  withTournamentPk,
  withTournamentPkProps,
} from "@/hocs/withTournamentPk";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import { TournamentsPrize } from "@view/Tournament/TournamentInfo/TournamentPrize";
import { MEDIA_QUERY_SM, MEDIA_QUERY_XL } from "@/constants/breackpoints";
import { Button, notification } from "@shared";
import { useUserStore } from "@/Zustand/userStore";
import { useMutation } from "@/api/hooks/useMutation";

type TournamentRegistrationCardProps = WithGamePkProps & withTournamentPkProps;
const RegistrationCardContainer = styled(Box)`
  border-radius: 16px;
  width: 50%;
  padding: 30px 40px;
  border: 4px solid #4a5568;
  @media (max-width: ${MEDIA_QUERY_XL}px) {
    width: 100%;
  }
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    text-align: center;
  }
`;
const TournamentRegistrationCardContainer = styled(Box)`
  display: flex;
  margin-top: 32px;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${MEDIA_QUERY_XL}px) {
    flex-direction: column;
  }
`;
export const TournamentRegistrationCardComponent: FC<
  TournamentRegistrationCardProps
> = ({ tournamentPk, gamePk }) => {
  const { t } = useTranslation("common");
  const { user } = useUserStore();
  const { data } = useQuery<TournamentReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/`,
  });
  const { mutate: startTournament } = useMutation({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/start`,
    method: "POST",
    token: true,
    queryKeyRefetch: [
      `/games/${gamePk}/tournaments/${tournamentPk}/`,
      `/games/${gamePk}/tournaments/${tournamentPk}/stages/`,
    ],
  });
  const startTournamentHandler = () => {
    startTournament({ args: {} }).then((res) => {
      if (res.ok) {
        notification({
          message: t("tournamentStartSuccessNotification"),
          type: "success",
        });
      } else {
        notification({
          message: t("tournamentStartFailNotification"),
          type: "error",
        });
      }
    });
  };
  return (
    <TournamentRegistrationCardContainer>
      <RegistrationCardContainer>
        <Typography fontSize={24}>{t("TournamenRegistration")}</Typography>
        <Typography fontSize={18} my={3}>
          {t("TournamenRegistrationDesc")}
        </Typography>
        <TournamentRegistrationProgress
          teams={data?.teams.length}
          max_teams={data?.max_teams}
        />
        <Box mb={2}>
          <TournamentRegistrationButton />
        </Box>
        {!user?.is_staff ? null : data?.status === "NOT_STARTED" ? (
          <Button variant={"outlined"} onClick={startTournamentHandler}>
            {t("start")}
          </Button>
        ) : null}
      </RegistrationCardContainer>
      <TournamentsPrize />
    </TournamentRegistrationCardContainer>
  );
};
export const TournamentRegistrationCard = withTournamentPk()(
  withGamePk()(TournamentRegistrationCardComponent),
);
