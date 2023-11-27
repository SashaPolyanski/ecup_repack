import {useCallback, useState} from 'react'
import {transientOptions} from "@utils";
import styled from "@emotion/styled";
import {Box} from "@mui/material";
import {SidebarItems} from "@/app/sidebar/SidebarItems";
import {SidebarContacts} from "@/app/sidebar/SidebarContacts.tsx";

const NavbarContainer = styled(Box, transientOptions)<{ $collapsed: boolean }>`
  width: ${({$collapsed}) => ($collapsed ? '80px' : '300px')};
  background-color: ${({theme}) => theme.backgrounds.sidebarBackground};
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
`
const ContactsContainer = styled(Box)`
  margin-top: auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`
export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleCollapsedHandler = useCallback(() => {
    setCollapsed((p) => !p)
  }, [])
  return (
    <NavbarContainer $collapsed={collapsed}>
      <SidebarItems collapsed={collapsed}/>
      <button onClick={toggleCollapsedHandler}>asdasd</button>
      <ContactsContainer>
        <SidebarContacts collapsed={collapsed}/>
      </ContactsContainer>
    </NavbarContainer>
  );
};
