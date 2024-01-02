import { FC } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints.ts";

type TournamentRegistrationProgressProps = {
  max_teams?: number;
  teams?: number;
};
const ParticipantsProgress = styled(LinearProgress)`
  width: 100%;
  height: 4px;
  background-color: #edf2f7;

  & .MuiLinearProgress-bar {
    background-color: #50d8d7;
  }
`;
const TournamentRegistrationProgressContainer = styled(Box)`
  width: 90%;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    margin-left: 0;
    margin-top: 20px;
    flex-direction: column-reverse;
    width: 100%;
  }
`;
const TournamentRegistrationProgressTeams = styled(Typography)`
  display: flex;
  margin-left: 16px;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    margin-bottom: 16px;
  }
`;
export const TournamentRegistrationProgress: FC<
  TournamentRegistrationProgressProps
> = ({ max_teams, teams }) => {
  const { t } = useTranslation("common");
  return (
    <TournamentRegistrationProgressContainer>
      {max_teams && teams !== undefined && (
        <ParticipantsProgress
          variant="determinate"
          value={Math.max((100 / max_teams) * teams, 0.001)}
        />
      )}
      <TournamentRegistrationProgressTeams>
        <Typography>{`${teams || 0}/${max_teams}`}</Typography>
        <Typography ml={1}>{t("tournamenParticipants")}</Typography>
      </TournamentRegistrationProgressTeams>
    </TournamentRegistrationProgressContainer>
  );
};
