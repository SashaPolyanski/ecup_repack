import {useContext} from "react";
import {ThemeDefaultValueCtx} from "@theme";
import {Button} from "@mui/material";
import {useQuery} from "@/api/hooks/useQuery.ts";
import {JWT, PaginatedGameReadOnlyList, Register} from "@/api/types";
import {useMutation} from "@/api/hooks/useMutation.ts";
import {useTranslation} from "react-i18next";

export const Main = () => {
  const {toggleColorMode} = useContext(ThemeDefaultValueCtx);
  const {i18n, t} = useTranslation('main')
  const {data: as} = useQuery<PaginatedGameReadOnlyList>({path: '/games'})
  console.log(as)
  const {mutate} = useMutation<Register, JWT>({path: '/auth/registration/', method: 'POST'})
  const registr = () => {
    mutate({email: 'asasasdasd@mail.com', password1: '1162346qQ', password2: '1162346qQ', username: 'heftyqqaaa'})
  }

  const changeLanguageHandler = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }
  return (
    <div>
      main page
      <Button variant={'contained'} onClick={toggleColorMode}>go to about</Button>
      <Button variant={'contained'} onClick={registr}>registr test</Button>
      <Button variant={'contained'} onClick={changeLanguageHandler}>{t('PROFILE')}</Button>
    </div>
  );
};
