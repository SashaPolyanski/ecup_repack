import {Box, Typography} from "@mui/material";
import styled from "@emotion/styled";
import EcupLogo from '@assets/ecupLogo.svg'
import {AuthButton} from "@shared";

const NavbarContainer = styled(Box)`
  background-color: ${({theme}) => theme.backgrounds.sidebarBackground};
  height: 50px;
  display: flex;
  padding: 0 40px 0 23px;
  justify-content: space-between;
  align-items: center;
`
export const Navbar = () => {
  return (
    <NavbarContainer>
      <Box display={'flex'} alignItems={'center'}>
        <EcupLogo/>
        <Typography fontSize={20} ml={2.5}>Ecup eSport</Typography>
      </Box>
      <Box>
        <AuthButton type={'signin'}/>
        <AuthButton type={'signup'}/>
      </Box>
    </NavbarContainer>
  );
};
