import {FC, useCallback, useState} from 'react'
import {useTheme} from "@emotion/react";
import {useQuery} from "@/api/hooks/useQuery";
import {GameReadOnly, PaginatedGameReadOnlyList} from "@/api/types";
import {Box, Collapse, Drawer, IconButton, Skeleton, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {transientOptions} from "@utils";
import styled from "@emotion/styled";
import {useTranslation} from "react-i18next";
import EcupLogo from "@assets/ecupLogo.svg";
import {games} from "@constants";
import {NavigateFunction, useNavigate} from "react-router-dom";

type MobileHeaderContentProps = {
  onClose: () => void
  open: boolean
}
type ModifyData = {
  visibleItems: GameReadOnly[];
  collapsedItems: GameReadOnly[];
}
const ShowMoreIcon = styled(KeyboardArrowDownIcon, transientOptions)<{ $collapsed: boolean }>`
  transition-duration: 0.3s;
  transition-property: transform;
  transform: rotate(${({$collapsed}) => ($collapsed ? '180deg' : '0')});
`
const DrawerContentContainer = styled(Box)`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`
const MobileMenuItemWrapper = styled(Box, transientOptions)<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }

`
const renderMobileMenuItems = (items?: GameReadOnly[], collapsed?: boolean, navigate?: NavigateFunction, onClose?: () => void) => {
  const navigateToGameHandler = (gameId: string) => () => {
    navigate && navigate(games.game.replace(':gameId', gameId))
    onClose && onClose()
  }
  return items ? items?.map(({avatar, id, name}) => (
    <MobileMenuItemWrapper key={id} $collapsed={collapsed} onClick={navigateToGameHandler(id.toString())}>
      <img src={avatar.file} alt="asd" width="35px" height="35px"/>
      <Typography fontSize={19} ml={1}>
        {name}
      </Typography>
    </MobileMenuItemWrapper>
  )) : <Box><Skeleton variant="rounded" width={35} height={35}/></Box>;
};
export const MobileHeaderContent: FC<MobileHeaderContentProps> = ({onClose, open}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const {t} = useTranslation()
  const {data} = useQuery<PaginatedGameReadOnlyList>({path: '/games/'})
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
    <Drawer open={open} onClose={onClose} variant={'temporary'}>
      <DrawerContentContainer>
        <Box display={'flex'} alignItems={'center'} mb={3}>
          <Box mr={2}><EcupLogo/></Box>
          <Typography>{t('menuGames')}</Typography>
        </Box>
        <Box>
          {renderMobileMenuItems(modifyData?.visibleItems, collapsedItems, navigate, onClose)}
          <Collapse in={collapsedItems}>
            {renderMobileMenuItems(modifyData?.collapsedItems, collapsedItems, navigate, onClose)}
          </Collapse>
          <Box sx={{width: '100%'}} display={'flex'} justifyContent={'center'}>
            <IconButton onClick={toggleNavbarItems}>
              <ShowMoreIcon $collapsed={collapsedItems} htmlColor={theme.palette.text.primary}/>
            </IconButton>
          </Box>
        </Box>
      </DrawerContentContainer>
    </Drawer>
  );
};
