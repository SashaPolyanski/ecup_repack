import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { LanguageEnum, PatchedUser, User } from "@/api/types";
import { useMutation } from "@/api/hooks/useMutation";
import { useIsAuthStore } from "@/Zustand/isAuthStore";
import { useState } from "react";
import i18next from "i18next";

const options = [
  { id: 1, value: "en", label: "En" },
  { id: 2, value: "ru", label: "Ru" },
  { id: 3, value: "fr", label: "Fr" },
];

export const LanguageSwitcher = () => {
  const { isAuth } = useIsAuthStore();
  const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));
  const { mutate: updateUser } = useMutation<PatchedUser, User>({
    path: "/auth/user",
    method: "PATCH",
    token: true,
    queryKeyRefetch: ["/auth/user/"],
  });

  const handleChange = (e: SelectChangeEvent) => {
    const language = e.target.value as LanguageEnum;
    localStorage.setItem("i18nextLng", language);
    i18next.changeLanguage(language);
    setLanguage(language);
    if (isAuth) {
      updateUser({ args: { language } });
    }
  };
  return (
    <Select
      variant={"filled"}
      value={language || "en"}
      onChange={handleChange}
      disableUnderline
      sx={{ backgroundColor: "transparent" }}
    >
      {options.map(({ value, label, id }) => (
        <MenuItem key={id} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
