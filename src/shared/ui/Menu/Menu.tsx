import {FC, MouseEvent, ReactNode, useCallback, useState} from 'react'
import {IconButton, Menu as MuiMenu, MenuItem} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

type MenuProps = {
  menuIcon: ReactNode
}

export const Menu: FC<MenuProps> = ({menuIcon}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenuHandler = useCallback((event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }, [])
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        sx={{
          svg: {
            width: '30px',
            height: '30px',
          },
        }}
        onClick={openMenuHandler}
      >
        {menuIcon ? menuIcon : <MoreHorizIcon/>}
      </IconButton>
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}

        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem onClick={handleClose}>
          My account
        </MenuItem>
      </MuiMenu>
    </div>
  );
};
