import {useCallback, useState} from 'react'
import {transientOptions} from "@utils";
import styled from "@emotion/styled";
import {Box, IconButton} from "@mui/material";
import {SidebarItems} from "@/app/sidebar/SidebarItems";
import {SidebarContacts} from "@/app/sidebar/SidebarContacts";
import {useGlobalPreloader} from "@/Zustand/globalPreloaderStore";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import {useTheme} from "@emotion/react";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints";

const NavbarContainer = styled(Box, transientOptions)<{ $collapsed: boolean }>`
  width: ${({$collapsed}) => ($collapsed ? '80px' : '300px')};
  background-color: ${({theme}) => theme.backgrounds.sidebarBackground};
  transition: width 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    display: none;
  }

`
const Arrow = styled(IconButton, transientOptions)<{ $collapsed: boolean }>`
  transform: rotate(${({$collapsed}) => (!$collapsed ? '180deg' : '0')});
  transition-duration: 0.5s;
  transition-property: transform;
  position: absolute;
  right: -8px;
  top: 60px;
  z-index: 20;
  width: 20px;
  height: 20px;

`
const ContactsContainer = styled(Box)`
  margin-top: auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`
export const Sidebar = () => {
  const theme = useTheme()
  const [collapsed, setCollapsed] = useState(true)
  const {isLoading} = useGlobalPreloader()
  const toggleCollapsedHandler = useCallback(() => {
    setCollapsed((p) => !p)
  }, [])
  return (
    isLoading ? null : <NavbarContainer $collapsed={collapsed}>
      <SidebarItems collapsed={collapsed}/>
      <Arrow onClick={toggleCollapsedHandler} $collapsed={collapsed}>
        <ArrowCircleRightOutlinedIcon htmlColor={theme.palette.primary.main}/>
      </Arrow>
      <ContactsContainer>
        <SidebarContacts collapsed={collapsed}/>
      </ContactsContainer>
    </NavbarContainer>
  );
};
