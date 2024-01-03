import { FC } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { Button, notification } from "@shared";
import { TournamentStageReadOnly } from "@/api/types";
import { MEDIA_QUERY_LG } from "@/constants/breackpoints.ts";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/Zustand/userStore.ts";
import { useMutation } from "@/api/hooks/useMutation.ts";

type TournamentBracketStagesTitleProps = {
  id: number;
  data: TournamentStageReadOnly | undefined;
};
type TournamentBracketStagesTitle = {
  tourmanentBaracketStages: TournamentBracketStagesTitleProps[];
  gamePk: number;
  tournamentPk: number;
};
const StagerTitleContainer = styled(Stack)`
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
`;
const TitleItem = styled(Box)`
  background-color: #252a40;
  width: 230px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
`;
const StartStageButton = styled(Button)`
  width: 230px;
  height: 50px;
  margin-top: 15px;
`;
export const TournamentBracketStagesTitle: FC<TournamentBracketStagesTitle> = ({
  tourmanentBaracketStages,
  tournamentPk,
  gamePk,
}) => {
  const { mutate: startTournamentStage } = useMutation({
    path: ``,
    method: "POST",
    token: true,
    queryKeyRefetch: [`/games/${gamePk}/tournaments/${tournamentPk}/stages/`],
  });
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_LG}px)`);
  const { t } = useTranslation("common");
  const { user } = useUserStore();
  const startTournamentStageHandler =
    (id: number, stageName: string | null) => () => {
      startTournamentStage({
        args: {},
        pathWithParams: `/games/${gamePk}/tournaments/${tournamentPk}/stages/${id}/start`,
      }).then((res) => {
        if (res.ok) {
          notification({
            message: t("stageStarted", { stage: stageName }),
            type: "success",
          });
        } else {
          notification({
            message: t("stageStartedFail", { stage: stageName }),
            type: "error",
          });
        }
      });
    };
  return isSmallScreen ? null : (
    <StagerTitleContainer display={"flex"} direction={"row"} gap={2.3}>
      {tourmanentBaracketStages.map(({ id, data }) => {
        return data ? (
          <Stack alignItems={"end"} key={id}>
            <TitleItem ml={4}>{data?.title}</TitleItem>
            {!user?.is_staff ? null : (
              <StartStageButton
                disabled={data.matches[0]?.status === "STARTED"}
                variant={"outlined"}
                onClick={startTournamentStageHandler(data?.id, data?.title)}
              >
                {t("startStage", { stage: data?.title })}
              </StartStageButton>
            )}
          </Stack>
        ) : null;
      })}
    </StagerTitleContainer>
  );
};
