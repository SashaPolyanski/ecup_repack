import { FC } from "react";
import { Button, notification } from "@shared";
import { Box } from "@mui/material";
import { useQuery } from "@/api/hooks/useQuery";
import { PaginatedTournamentTeamReadOnlyList } from "@/api/types";
import {
  withTournamentPk,
  withTournamentPkProps,
} from "@/hocs/withTournamentPk";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import { useUserStore } from "@/Zustand/userStore";
import { useMutation } from "@/api/hooks/useMutation";
import styled from "@emotion/styled";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints";
import { useTranslation } from "react-i18next";

type InTournamentButtonProps = WithGamePkProps & withTournamentPkProps;
const ButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const UnregisterButton = styled(Button)`
  margin-left: 20px;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

export const InTournamentButtonComponent: FC<InTournamentButtonProps> = ({
  tournamentPk,
  gamePk,
}) => {
  const { user } = useUserStore();
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
    unRegistered({ args: {} }).then(() => {
      notification({
        message: t("unRegisterTournamentNotification"),
        type: "error",
      });
    });
  };
  return (
    <ButtonContainer>
      <Button variant={"outlined"}>Вы зарегистрированы</Button>
      <UnregisterButton variant={"outlined"} onClick={unRegisteredHandler}>
        {t("cancelRegistration")}
      </UnregisterButton>
    </ButtonContainer>
  );
};
export const InTournamentButton: FC = withTournamentPk()(
  withGamePk()(InTournamentButtonComponent),
);
