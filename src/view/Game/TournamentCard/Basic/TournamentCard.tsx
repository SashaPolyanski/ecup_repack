import { FC } from "react";
import { TournamentReadOnly } from "@/api/types";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { TournamentFormatInfo } from "./TournamentStart";
import { TournamentTitle } from "./TournamentTitle";
import { TournamentRegistrationButton } from "./TournamentRegistrationButton";
import { useNavigate } from "react-router-dom";
import { games } from "@constants";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints";
import { ParticipantsProgress } from "@shared";

type TournamentCardProps = {
  tournament: TournamentReadOnly;
};
const TournamentCardContainer = styled(Box)`
  background-color: #252a40;
  border-radius: 20px;
  width: 440px;
  height: 470px;
  cursor: pointer;
  margin-top: 10px;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    width: 350px;
    height: 400px;
  }
`;

const TournamentCardContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TournamentCardImageContainer = styled(Box)`
  height: 60%;
  width: 100%;
`;
const TournamentCardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0 0;
`;
export const TournamentCardComponent: FC<
  TournamentCardProps & WithGamePkProps
> = ({ tournament, gamePk }) => {
  const { name, teams, max_teams, id, avatar, status, schedule } = tournament;
  const navigate = useNavigate();
  const navigateToTournament = () => {
    navigate(
      games.tournament
        .replace(":gameId", gamePk.toString())
        .replace(":id", id.toString()),
    );
  };
  return (
    <TournamentCardContainer onClick={navigateToTournament}>
      <TournamentCardImageContainer>
        <TournamentCardImage src={avatar.file} />
      </TournamentCardImageContainer>
      <TournamentCardContent>
        <TournamentFormatInfo
          startAt={schedule[schedule.length - 1]}
          format={"1x7"}
        />
        <TournamentTitle name={name} />
        <Box px={2}>
          <ParticipantsProgress teams={teams.length} maxTeams={max_teams} />
        </Box>
        <TournamentRegistrationButton tournamentId={id} status={status} />
      </TournamentCardContent>
    </TournamentCardContainer>
  );
};

export const TournamentCard: FC<TournamentCardProps> = withGamePk()(
  TournamentCardComponent,
);
