import {Box, Typography} from "@mui/material";
import styled from "@emotion/styled";
import EcupLogo from '@assets/ecupLogo.svg'
import {useIsAuthStore} from "@/Zustand/isAuthStore";
import {useGlobalPreloader} from "@/Zustand/globalPreloaderStore";
import {Header} from "./Header";
import {IsAuthHeader} from "./isAuthHeader";

const NavbarContainer = styled(Box)`
  background-color: ${({theme}) => theme.backgrounds.sidebarBackground};
  height: 50px;
  display: flex;
  padding: 0 40px 0 23px;
  justify-content: space-between;
  align-items: center;
`

export const Navbar = () => {
  const {isAuth} = useIsAuthStore()
  const {isLoading} = useGlobalPreloader()

  return (
    isLoading ? null : <NavbarContainer>
      <Box display={'flex'} alignItems={'center'}>
        <EcupLogo/>
        <Typography fontSize={20} ml={2.5}>Ecup eSport</Typography>
      </Box>
      <Box>
        {isAuth ? <IsAuthHeader/> : <Header/>}
      </Box>
    </NavbarContainer>
  );
};
