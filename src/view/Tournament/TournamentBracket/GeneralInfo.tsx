import { FC } from "react";
import { ScoreMatch } from "@/api/types";
import { Box, Grid } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { Tooltip } from "@shared";

type GeneralInfoProps = {
  scores: ScoreMatch;
};

export const GeneralInfo: FC<GeneralInfoProps> = ({ scores }) => {
  return (
    <Grid container alignItems={"center"}>
      <Grid item xs={6} display={"flex"}>
        {scores?.team_name}
      </Grid>
      <Grid item xs={6} textAlign={"end"}>
        <Box
          ml={3}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
        >
          {`${Math.round(scores?.sum)} pts`}
          <Tooltip title={scores?.sum}>
            <ErrorIcon sx={{ marginLeft: "10px" }} />
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};
