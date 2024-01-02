import { Box, CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

const PreloaderContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Preloader = () => {
  return (
    <PreloaderContainer>
      <CircularProgress size={55} />
    </PreloaderContainer>
  );
};
