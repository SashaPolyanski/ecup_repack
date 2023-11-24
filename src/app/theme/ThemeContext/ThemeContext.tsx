import {FC, ReactNode, useMemo, useState} from "react";
import {createTheme, PaletteMode} from "@mui/material";
import {ThemeCtxProvider, ThemeCtxType} from "./types.ts";
import {dark, light} from '../mods';

export const ThemeContext: FC<{ children: ReactNode }> = ({children}) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );


  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? light
        : dark),
    },
  });
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const contextValue: ThemeCtxType = {
    theme,
    toggleColorMode: colorMode.toggleColorMode,
  };
  return (
    <ThemeCtxProvider
      value={contextValue}
    >
      {children}
    </ThemeCtxProvider>
  )
}
