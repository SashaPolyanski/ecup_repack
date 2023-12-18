import {Box, Typography} from "@mui/material";
import EcupLogo from "@assets/ecupLogo.svg";
import {LanguageSwitcher, ThemeSwitcher} from "@shared";
import {IsAuthHeader} from "@/app/navbar/isAuthHeader";
import {NoAuthHeader} from "@/app/navbar/NoAuthHeader";
import {useIsAuthStore} from "@/Zustand/isAuthStore";
import styled from "@emotion/styled";

const NavbarContainer = styled(Box)`
  background-color: ${({theme}) => theme.backgrounds.sidebarBackground};
  height: 50px;
  display: flex;
  padding: 0 40px 0 23px;
  justify-content: space-between;
  align-items: center;
`


export const Header = () => {
  const {isAuth} = useIsAuthStore()
  return (
    <NavbarContainer>
      <Box display={'flex'} alignItems={'center'}>
        <EcupLogo/>
        <Typography fontSize={20} ml={2.5}>Ecup eSport</Typography>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <LanguageSwitcher/>
        <ThemeSwitcher/>
        {isAuth ? <IsAuthHeader/> : <NoAuthHeader/>}
      </Box>
    </NavbarContainer>
  );
};
