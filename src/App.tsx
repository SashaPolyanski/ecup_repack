import "./i18n";
import { renderPages } from "@utils";
import { pages } from "@pages";
import { useGlobalPreloader } from "@/Zustand/globalPreloaderStore";
import Cookie from "cookie-universal";
import { useMutation } from "@/api/hooks/useMutation";
import { useEffect } from "react";
import { useIsAuthStore } from "@/Zustand/isAuthStore";
import { Preloader } from "@shared";
import { useQuery } from "@/api/hooks/useQuery";
import { useUserStore } from "@/Zustand/userStore";
import { User } from "@/api/types";
import i18next from "i18next";

export const App = () => {
  const { isLoading, setIsLoading } = useGlobalPreloader();
  const { setIsAuth, isAuth } = useIsAuthStore();
  const { setUser } = useUserStore();
  const cookies = Cookie();

  const { mutate: verify } = useMutation({
    path: "/auth/token/verify",
    method: "POST",
  });
  const { mutate: refresh } = useMutation({
    path: "/auth/token/refresh",
    method: "POST",
  });
  const { data } = useQuery<User>({
    path: "/auth/user/",
    skip: isAuth,
    token: true,
  });
  useEffect(() => {
    if (data) {
      data && setUser(data);
      setIsLoading(false);
    }
  }, [data, setIsLoading, setUser]);
  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng");
    i18next.changeLanguage(lang || "en");
    const accessToken = cookies.get("token");
    verify({ token: accessToken }).then((res) => {
      if (res.status === 401) {
        const refreshToken = cookies.get("refresh");
        refresh({ refresh: refreshToken })
          .then((res) => {
            return res.json();
          })
          .then((token) => {
            setIsAuth(true);
            cookies.set("token", token.access_token);
            setIsLoading(false);
          });
      }
      if (res.status === 200) {
        setIsAuth(true);
      }
      if (res.status === 400) {
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? <Preloader /> : renderPages(pages);
};
