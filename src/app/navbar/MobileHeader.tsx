import styled from "@emotion/styled";
import {Box, Stack} from "@mui/material";
import EcupLogo from "@assets/ecupLogo.svg";
import MenuIcon from '@mui/icons-material/Menu';
import {useTheme} from "@emotion/react";
import {useCallback, useState} from "react";
import {MobileHeaderContent} from "@/app/navbar/MobileHeaderContent.tsx";
import {NoAuthHeader} from "@/app/navbar/NoAuthHeader.tsx";
import {LanguageSwitcher, ThemeSwitcher} from "@shared";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints.ts";
import {useIsAuthStore} from "@/Zustand/isAuthStore.ts";
import {IsAuthHeader} from "@/app/navbar/isAuthHeader.tsx";

const NavbarContainer = styled(Box)`
  background-color: ${({theme}) => theme.backgrounds.sidebarBackground};
  height: 50px;
  display: flex;
  padding: 0 10px 0 23px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    padding-left: 10px;
  }
`
const NavbarContent = styled(Stack)`
  display: flex;
  align-items: center;
`
export const MobileHeader = () => {
  const theme = useTheme()
  const {isAuth} = useIsAuthStore()
  const [collapsed, setCollapsed] = useState(false)
  const showCollapsedGames = useCallback(() => {
    setCollapsed((p) => !p)
  }, [])
  return (
    <NavbarContainer>
      <Box><EcupLogo/></Box>
      <NavbarContent>
        <Box display={'flex'} alignItems={'center'}>
          {isAuth ? <IsAuthHeader/> : <NoAuthHeader/>}
          <ThemeSwitcher/>
          <LanguageSwitcher/>
          <MenuIcon htmlColor={theme.palette.text.primary} sx={{cursor: 'pointer'}} onClick={showCollapsedGames}/>
          <MobileHeaderContent open={collapsed} onClose={showCollapsedGames}/>
        </Box>
      </NavbarContent>
    </NavbarContainer>
  );
};
