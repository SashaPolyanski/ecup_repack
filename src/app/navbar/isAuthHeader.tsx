import {Button} from "@mui/material";
import {useMutation} from "@/api/hooks/useMutation";
import {useCallback} from "react";
import Cookie from "cookie-universal";
import {useIsAuthStore} from "@/Zustand/isAuthStore.ts";
import {notification} from "@/shared/ui";
import {useUserStore} from "@/Zustand/userStore.ts";


export const IsAuthHeader = () => {
  const cookies = Cookie()
  const {setIsAuth} = useIsAuthStore()
  const {user} = useUserStore()
  const {mutate: logout} = useMutation({path: '/auth/logout', method: 'POST'})
  const logoutHandler = useCallback(() => {
    logout({}).then(() => {
      setIsAuth(false)
      notification({message: `Мы будем скучать по тебе, ${user?.username}, скорее возвращайся!`})
      cookies.remove('token');
    })
  }, [cookies, logout, setIsAuth, user?.username])
  return <Button onClick={logoutHandler}>Logout</Button>
};
