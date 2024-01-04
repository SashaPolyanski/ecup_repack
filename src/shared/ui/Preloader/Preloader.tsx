import { Box, CircularProgress } from "@mui/material";
import styled from "@emotion/styled";
import { FC } from "react";

const PreloaderContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Preloader: FC<{ size?: number }> = ({ size = 50 }) => {
  return (
    <PreloaderContainer>
      <CircularProgress size={size} />
    </PreloaderContainer>
  );
};
