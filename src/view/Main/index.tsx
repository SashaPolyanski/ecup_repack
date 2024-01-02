import { MainImage } from "./MainImage";
import { MainDescription } from "./MainDescription";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const MainContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
`;

export const Main = () => {
  return (
    <MainContainer>
      <MainImage />
      <MainDescription />
    </MainContainer>
  );
};
