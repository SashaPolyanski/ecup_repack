import {useContext} from 'react'
import {IconButton} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {ThemeDefaultValueCtx} from "@theme";
import {useTheme} from "@emotion/react";


export const ThemeSwitcher = () => {
  const {toggleColorMode} = useContext(ThemeDefaultValueCtx);
  const theme = useTheme()
  const themeMode = localStorage.getItem('theme')
  return (
    <IconButton onClick={toggleColorMode}>{themeMode === 'dark' ?
      <LightModeIcon htmlColor={theme.palette.text.primary}/> :
      <DarkModeIcon htmlColor={theme.palette.text.primary}/>}</IconButton>
  );
};
