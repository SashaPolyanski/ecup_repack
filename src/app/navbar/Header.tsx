import {Box, Typography} from "@mui/material";
import EcupLogo from "@assets/ecupLogo.svg";
import {LanguageSwitcher, ThemeSwitcher} from "@shared";
import {IsAuthHeader} from "@/app/navbar/isAuthHeader";
import {NoAuthHeader} from "@/app/navbar/NoAuthHeader";
import {useIsAuthStore} from "@/Zustand/isAuthStore";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {main} from "@constants";

const NavbarContainer = styled(Box)`
  background-color: ${({theme}) => theme.backgrounds.sidebarBackground};
  height: 50px;
  display: flex;
  padding: 0 40px 0 23px;
  justify-content: space-between;
  align-items: center;
`
const EcupLogoCOntainer = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Header = () => {
  const {isAuth} = useIsAuthStore()
  const navigate = useNavigate()
  const navigateToHomePage = () => {
    navigate(main.mainRoot)
  }
  return (
    <NavbarContainer>
      <EcupLogoCOntainer onClick={navigateToHomePage}>
        <EcupLogo/>
        <Typography fontSize={20} ml={2.5}>Ecup eSport</Typography>
      </EcupLogoCOntainer>
      <Box display={'flex'} alignItems={'center'}>
        <LanguageSwitcher/>
        <ThemeSwitcher/>
        {isAuth ? <IsAuthHeader/> : <NoAuthHeader/>}
      </Box>
    </NavbarContainer>
  );
};
