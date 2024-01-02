import { FC } from "react";
import styled from "@emotion/styled";
import { Box, LinearProgress, Typography } from "@mui/material";

type ParticipantsProgressProps = {
  teams: number;
  maxTeams: number;
  px?: number;
};
const ParticipantsProgressMui = styled(LinearProgress)`
  width: 100%;
  height: 4px;
  background-color: #edf2f7;

  & .MuiLinearProgress-bar {
    background-color: #50d8d7;
  }
`;
export const ParticipantsProgress: FC<ParticipantsProgressProps> = ({
  teams,
  maxTeams,
}) => {
  return (
    <Box display={"flex"} alignItems={"center"} mt={1}>
      <ParticipantsProgressMui
        variant="determinate"
        value={Math.max((100 / maxTeams) * teams, 0.001)}
      />
      <Typography ml={2}>{`${teams}/${maxTeams}`}</Typography>
    </Box>
  );
};
