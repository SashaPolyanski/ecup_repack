import {FC, useCallback, useState} from 'react'
import {useQuery} from "@/api/hooks/useQuery";
import {GameReadOnly, PaginatedGameReadOnlyList} from "@/api/types";
import {Box, Collapse, IconButton, Skeleton, Typography} from "@mui/material";
import styled from "@emotion/styled";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {transientOptions} from "@utils";
import {useTheme} from "@emotion/react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {games} from "@/constants/pagePath";

type SidebarItemsProps = {
  collapsed: boolean
}
const NavbarItemsContainer = styled(Box)`
  margin-top: 20px;
  width: 100%;
`
const NavbarItemContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 20px;
  width: 100%;
  cursor: pointer;
`
const ShowMoreIcon = styled(KeyboardArrowDownIcon, transientOptions)<{ $collapsed: boolean }>`
  transition-duration: 0.3s;
  transition-property: transform;
  transform: rotate(${({$collapsed}) => ($collapsed ? '180deg' : '0')});
`
type ModifyData = {
  visibleItems: GameReadOnly[];
  collapsedItems: GameReadOnly[];
}

const renderNavbarItems = (items?: GameReadOnly[], collapsed?: boolean, navigate?: NavigateFunction) => {
  const navigateToGameHandler = (gameId: string) => () => {
    navigate && navigate(games.game.replace(':gameId', gameId))
  }
  return items ? items?.map(({avatar, id, name}) => (
    <NavbarItemContainer key={id} onClick={navigateToGameHandler(id.toString())}>
      <img src={avatar.file} alt="asd" width="35px" height="35px"/>
      <Typography fontSize={19} ml={1}>
        {collapsed ? null : name}
      </Typography>
    </NavbarItemContainer>
  )) : <NavbarItemContainer><Skeleton variant="rounded" width={35} height={35}/></NavbarItemContainer>;
};
export const SidebarItems: FC<SidebarItemsProps> = ({collapsed}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const {data} = useQuery<PaginatedGameReadOnlyList>({path: '/games'})
  const [collapsedItems, setCollapsedItems] = useState(false)
  const modifyData = data?.results?.reduce((acc, cur, i) => {
    if (i < 1) {
      acc.visibleItems.push(cur);
    } else {
      acc.collapsedItems.push(cur);
    }
    return acc;
  }, {visibleItems: [], collapsedItems: []} as ModifyData);

  const toggleNavbarItems = useCallback(() => {
    setCollapsedItems((p) => !p)
  }, [])
  return (
    <NavbarItemsContainer>
      {renderNavbarItems(modifyData?.visibleItems, collapsed, navigate)}
      <Collapse in={collapsedItems}>
        {renderNavbarItems(modifyData?.collapsedItems, collapsed, navigate)}
      </Collapse>
      <Box sx={{width: '100%'}} display={'flex'} justifyContent={'center'}>
        <IconButton onClick={toggleNavbarItems}>
          <ShowMoreIcon $collapsed={collapsedItems} htmlColor={theme.palette.text.primary}/>
        </IconButton>
      </Box>
    </NavbarItemsContainer>
  );
};
