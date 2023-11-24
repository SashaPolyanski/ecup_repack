import {createContext} from 'react'
import {createTheme, Theme} from "@mui/material";


export type ThemeCtxType = {
  toggleColorMode: () => void
  theme: Theme
}

export const ThemeDefaultValueCtx = createContext<ThemeCtxType>({
    theme: createTheme(),
    toggleColorMode: () => {
    },
  }
)

export const ThemeCtxProvider = ThemeDefaultValueCtx.Provider
