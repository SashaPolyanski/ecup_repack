import {renderPages} from "@utils";
import {ThemeProvider} from "@mui/material";
import {useContext} from "react";
import {ThemeDefaultValueCtx} from "@theme";
import {pages} from "@pages";

export const App = () => {
  const {theme} = useContext(ThemeDefaultValueCtx);
  return <ThemeProvider theme={theme}>
    {renderPages(pages)}
  </ThemeProvider>
}

