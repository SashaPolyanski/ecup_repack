import { useRef } from "react";
import { Avatar, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useUploadAvatar } from "@view/UserSettings/UserInfo/hook";
import { useTranslation } from "react-i18next";

export const UserInfoUploadAvatar = () => {
  const { t } = useTranslation("common");
  const { uploadAvatar, avatar, handleFileChange } = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <Stack direction={"row"} gap={2} mt={2}>
      <input
        ref={fileInputRef}
        type="file"
        id="avatar-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
        value=""
      />
      <Avatar src={avatar} />
      <LoadingButton
        loading={uploadAvatar}
        variant={"outlined"}
        onClick={handleUploadClick}
      >
        {t("downloadAvatar")}
      </LoadingButton>
    </Stack>
  );
};
