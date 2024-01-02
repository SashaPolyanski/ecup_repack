import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import EcupLogo from "@assets/ecupLogo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import { useCallback, useState } from "react";
import { MobileHeaderContent } from "@/app/navbar/MobileHeaderContent";
import { NoAuthHeader } from "@/app/navbar/NoAuthHeader";
import { LanguageSwitcher, ThemeSwitcher } from "@shared";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints";
import { useIsAuthStore } from "@/Zustand/isAuthStore";
import { IsAuthHeader } from "@/app/navbar/isAuthHeader";
import { main } from "@constants";
import { useNavigate } from "react-router-dom";

const NavbarContainer = styled(Box)`
  background-color: ${({ theme }) => theme.backgrounds.sidebarBackground};
  height: 50px;
  display: flex;
  padding: 0 10px 0 23px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    padding-left: 10px;
  }
`;
const NavbarContent = styled(Stack)`
  display: flex;
  align-items: center;
`;
export const MobileHeader = () => {
  const theme = useTheme();
  const { isAuth } = useIsAuthStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const showCollapsedGames = useCallback(() => {
    setCollapsed((p) => !p);
  }, []);
  const navigateToHomePage = () => {
    navigate(main.mainRoot);
  };
  return (
    <NavbarContainer>
      <Box>
        <EcupLogo onClick={navigateToHomePage} />
      </Box>
      <NavbarContent>
        <Box display={"flex"} alignItems={"center"}>
          {isAuth ? <IsAuthHeader /> : <NoAuthHeader />}
          <ThemeSwitcher />
          <LanguageSwitcher />
          <MenuIcon
            htmlColor={theme.palette.text.primary}
            sx={{ cursor: "pointer" }}
            onClick={showCollapsedGames}
          />
          <MobileHeaderContent open={collapsed} onClose={showCollapsedGames} />
        </Box>
      </NavbarContent>
    </NavbarContainer>
  );
};
