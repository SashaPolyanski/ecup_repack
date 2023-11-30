import {useContext} from "react";
import {ThemeDefaultValueCtx} from "@theme";
import {Button} from "@mui/material";
import {useQuery} from "@/api/hooks/useQuery.ts";
import {JWT, PaginatedGameReadOnlyList, Register} from "@/api/types";
import {useMutation} from "@/api/hooks/useMutation.ts";

export const Main = () => {
  const {toggleColorMode} = useContext(ThemeDefaultValueCtx);
  const {data: as} = useQuery<PaginatedGameReadOnlyList>({path: '/games'})
  console.log(as)
  const {mutate} = useMutation<Register, JWT>({path: '/auth/registration/', method: 'POST'})
  const registr = () => {
    mutate({email: 'asasasdasd@mail.com', password1: '1162346qQ', password2: '1162346qQ', username: 'heftyqqaaa'})
  }

  return (
    <div>
      main page
      <Button variant={'contained'} onClick={toggleColorMode}>go to about</Button>
      <Button variant={'contained'} onClick={registr}>registr test</Button>
    </div>
  );
};
