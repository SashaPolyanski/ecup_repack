import { FC, ReactNode, useMemo } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";
import { pages } from "@pages";
import { Navbar } from "@/app/navbar";
import { Sidebar } from "@/app/sidebar";
import { WIDTH } from "@/constants/breackpoints.ts";

const Container = styled(Box)`
  display: flex;
  height: 100vh;
  flex-direction: column;
  user-select: none;
`;
const Header = styled(Box)`
  position: relative;
  width: 100%;
`;
const ContentBox = styled(Box)`
  flex-grow: 1;
  position: relative;
  overflow: auto;
`;
const Main = styled(Box)`
  width: 100%;
  flex-grow: 1;
  display: flex;
  position: relative;
`;
const ContentWrapper = styled(Box)`
  width: 100%;
  position: absolute;
  height: 100%;
`;
const ContentContainer = styled(Box)`
  max-width: ${WIDTH}px;
  margin: 0 auto;
  height: 100%;
`;
export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const curPage = useMemo(
    () => pages.find(({ path }) => matchPath(path, location.pathname)),
    [location],
  );
  return (
    <Container>
      <Header>{curPage?.showNavbar ? <Navbar /> : null}</Header>
      <Main component={"main"}>
        {!curPage || curPage.showSidebar ? <Sidebar /> : null}
        <ContentBox>
          <ContentWrapper>
            <ContentContainer>{children}</ContentContainer>
          </ContentWrapper>
        </ContentBox>
      </Main>
      {/*<Footer>{curPage?.layoutOptions?.footer?.footerContent}</Footer>*/}
    </Container>
  );
};
