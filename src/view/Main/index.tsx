import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

export const Main = () => {
  const {t} = useTranslation('main')
  return (
    <div>
      main page
      <Typography>{`Example: ${t('PROFILE')}`}</Typography>
    </div>
  );
};
