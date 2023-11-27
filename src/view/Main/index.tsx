import {useContext} from "react";
import {ThemeDefaultValueCtx} from "@theme";
import {Button} from "@mui/material";
import {useQuery} from "@/api/hooks";
import {PaginatedGameReadOnlyList} from "@/api/types";

export const Main = () => {
  const {toggleColorMode} = useContext(ThemeDefaultValueCtx);
  const {data: as} = useQuery<PaginatedGameReadOnlyList>({path: '/games'})
  console.log(as)
  return (
    <div>
      main page
      <Button variant={'contained'} onClick={toggleColorMode}>go to about</Button>
    </div>
  );
};
