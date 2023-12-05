import {Button} from "@mui/material";
import {useMutation} from "@/api/hooks/useMutation";
import {useCallback} from "react";
import Cookie from "cookie-universal";
import {useIsAuthStore} from "@/Zustand/isAuthStore";
import {notification} from "@/shared/ui";
import {useUserStore} from "@/Zustand/userStore";
import {useTranslation} from "react-i18next";


export const IsAuthHeader = () => {
  const cookies = Cookie()
  const {setIsAuth} = useIsAuthStore()
  const {t} = useTranslation('common')
  const {user} = useUserStore()
  const {mutate: logout} = useMutation({path: '/auth/logout', method: 'POST'})
  const logoutHandler = useCallback(() => {
    logout({}).then(() => {
      setIsAuth(false)
      notification({message: t('missYou', {username: user?.username})})
      cookies.remove('token');
    })
  }, [cookies, logout, setIsAuth, t])
  return <Button onClick={logoutHandler}>{t('logout')}</Button>
};
