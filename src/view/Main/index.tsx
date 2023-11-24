import {useContext} from "react";
import {ThemeDefaultValueCtx} from "@theme";
import {Button} from "@mui/material";

export const Main = () => {
  const {toggleColorMode} = useContext(ThemeDefaultValueCtx);

  return (
    <div>
      main page
      <Button variant={'contained'} onClick={toggleColorMode}>go to about</Button>
    </div>
  );
};
