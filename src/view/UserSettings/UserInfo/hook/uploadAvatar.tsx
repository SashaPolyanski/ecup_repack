import { ChangeEvent, useState } from "react";
import { notification } from "@shared";
import Cookie from "cookie-universal";
import { useMutation } from "@/api/hooks/useMutation";
import { PatchedUser, User } from "@/api/types";
import { useUserStore } from "@/Zustand/userStore";
import { useTranslation } from "react-i18next";

export const useUploadAvatar = () => {
  const { user } = useUserStore();
  const { t } = useTranslation("common");
  const [avatar, setAvatar] = useState(user?.avatar?.file);
  const [uploadAvatar, setUploadAvatar] = useState(false);
  const baseUrl = import.meta.env.VITE_PUBLIC_API_PATH;
  const cookies = Cookie();
  const { mutate: updateUser } = useMutation<PatchedUser, User>({
    path: "/auth/user",
    method: "PATCH",
    token: true,
    queryKeyRefetch: ["/auth/user"],
  });
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploadAvatar(true);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("file", file);
      reader.onload = async () => {
        const response = await fetch(`${baseUrl}/attachments/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
          body: formData,
          credentials: "include",
        });
        if (response.status === 201) {
          const data = await response.json();
          setAvatar(data.file);
          setUploadAvatar(false);
          updateUser({ avatar_id: data.id }).then(() => {
            notification({
              message: t("downloadAvatarSuccess"),
              type: "success",
            });
          });
        }
        if (response.status !== 201) {
          setUploadAvatar(false);
          notification({ message: t("downloadAvatarFail"), type: "error" });
        }
      };
    }
  };
  return { avatar, uploadAvatar, handleFileChange };
};
