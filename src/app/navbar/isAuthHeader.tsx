import { Avatar as MuiAvatar } from "@mui/material";
import { useMutation } from "@/api/hooks/useMutation";
import { useCallback } from "react";
import Cookie from "cookie-universal";
import { useIsAuthStore } from "@/Zustand/isAuthStore";
import { Button, notification } from "@/shared";
import { useUserStore } from "@/Zustand/userStore";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { userSettings } from "@/constants/pagePath";

const Avatar = styled(MuiAvatar)`
  margin: 0 20px;
  cursor: pointer;
`;

export const IsAuthHeader = () => {
  const cookies = Cookie();
  const navigate = useNavigate();
  const { setIsAuth } = useIsAuthStore();
  const { t } = useTranslation("common");
  const { user } = useUserStore();
  const navigateToUsersettings = () => {
    navigate(userSettings.userSettingsRoot);
  };
  const { mutate: logout } = useMutation({
    path: "/auth/logout",
    method: "POST",
  });
  const logoutHandler = useCallback(() => {
    logout({}).then(() => {
      setIsAuth(false);
      notification({ message: t("missYou", { username: user?.username }) });
      cookies.remove("token");
    });
  }, [cookies, logout, setIsAuth, t, user?.username]);
  return (
    <>
      <Avatar src={user?.avatar?.file} onClick={navigateToUsersettings} />
      <Button onClick={logoutHandler}>{t("logout")}</Button>
    </>
  );
};
