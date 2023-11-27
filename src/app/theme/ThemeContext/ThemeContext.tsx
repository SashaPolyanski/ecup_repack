import {FC, ReactNode, useMemo, useState} from "react";
import {PaletteMode, ThemeProvider} from "@mui/material";
import {ThemeCtxProvider, ThemeCtxType} from "./types.ts";
import {dark, light} from '../mods';

export const ThemeContext: FC<{ children: ReactNode }> = ({children}) => {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  const theme = useMemo(() => (mode === 'light' ? light : dark), [mode]);
  const contextValue: ThemeCtxType = {
    theme,
    toggleColorMode: colorMode.toggleColorMode,
  };

  return (
    <ThemeProvider theme={theme}>
      <ThemeCtxProvider value={contextValue}>
        {children}
      </ThemeCtxProvider>
    </ThemeProvider>
  );
};
