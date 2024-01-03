import { FC } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

type TournamentUsersTableSelectProps = {
  value?: number;
  handleChange: (e: SelectChangeEvent) => void;
};
const options = (t: TFunction) => [
  { id: 1, value: 1, label: t("bracketPlace", { place: "1" }) },
  { id: 2, value: 2, label: t("bracketPlace", { place: "2" }) },
  { id: 3, value: 3, label: t("bracketPlace", { place: "3" }) },
  { id: 4, value: 4, label: t("bracketPlace", { place: "4" }) },
  { id: 5, value: 5, label: t("bracketPlace", { place: "5" }) },
  { id: 6, value: 6, label: t("bracketPlace", { place: "6" }) },
  { id: 7, value: 7, label: t("bracketPlace", { place: "7" }) },
  { id: 8, value: 8, label: t("bracketPlace", { place: "8" }) },
];
export const TournamentUsersTableSelect: FC<
  TournamentUsersTableSelectProps
> = ({ value, handleChange }) => {
  const { t } = useTranslation("common");
  return (
    <FormControl
      variant="standard"
      sx={{ width: "100%", position: "relative" }}
    >
      <InputLabel
        id="select-place-label"
        sx={{
          position: "absolute",
          color: "white",
          top: "-13px",
          marginLeft: "15px",
        }}
      >
        Место
      </InputLabel>
      <Select
        variant={"filled"}
        labelId="select-place-label"
        value={value?.toString()}
        onChange={handleChange}
        disableUnderline
        label={"Место"}
        sx={{ backgroundColor: "transparent" }}
      >
        {options(t).map(({ value, label, id }) => (
          <MenuItem key={id} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
