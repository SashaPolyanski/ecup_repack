import {useContext} from "react";
import {ThemeDefaultValueCtx} from "@theme";
import {Button} from "@mui/material";
import {useQuery} from "@/api/hooks/useQuery.ts";
import {PaginatedGameReadOnlyList} from "@/api/types";
import {useTranslation} from "react-i18next";

export const Main = () => {
  const {toggleColorMode} = useContext(ThemeDefaultValueCtx);

  const {i18n, t} = useTranslation('main')
  const {data: as} = useQuery<PaginatedGameReadOnlyList>({path: '/games'})

  const changeLanguageHandler = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }
  return (
    <div>
      main page
      <Button variant={'contained'} onClick={toggleColorMode}>go to about</Button>
      <Button variant={'contained'} onClick={changeLanguageHandler}>{t('PROFILE')}</Button>
    </div>
  );
};
