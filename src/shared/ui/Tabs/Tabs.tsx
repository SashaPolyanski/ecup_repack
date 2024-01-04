import { Dispatch, FC } from "react";
import { Tab as MuiTab, Tabs as MuiTabs, useMediaQuery } from "@mui/material";
import { MEDIA_QUERY_LG } from "@/constants/breackpoints";

export type Tab = {
  id: number;
  label: string;
  value: number;
};

type TabsProps = {
  setTabValue: Dispatch<number>;
  tabs: Tab[];
  value: number;
};

export const Tabs: FC<TabsProps> = ({ tabs, setTabValue, value }) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_LG}px)`);
  return (
    <MuiTabs
      value={value}
      centered
      onChange={handleChange}
      variant={isSmallScreen ? "scrollable" : "fullWidth"}
    >
      {tabs.map(({ label, id, value }) => (
        <MuiTab label={label} key={id} value={value} />
      ))}
    </MuiTabs>
  );
};
