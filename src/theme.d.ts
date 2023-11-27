// theme.d.ts

import {Theme as MuiTheme, ThemeOptions as MuiThemeOptions} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    backgrounds: {
      sidebarBackground: string;
      modalBackground: string,
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions extends MuiThemeOptions {
    backgrounds?: {
      sidebarBackground?: string;
      modalBackground?: string,
    };
  }
}

declare module '@mui/material' {
  interface Theme extends MuiTheme {
    backgrounds: {
      sidebarBackground: string;
      modalBackground: string,
    };
  }

  interface ThemeOptions extends MuiThemeOptions {
    backgrounds?: {
      sidebarBackground?: string;
      modalBackground?: string,
    };
  }
}
