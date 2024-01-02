/// <reference types="@emotion/react/types/css-prop" />

import "@emotion/react";

declare module "@emotion/react" {
  type DefaultTheme = typeof import("src/app/theme/mods").dark;

  export interface Theme extends DefaultTheme {}
}
