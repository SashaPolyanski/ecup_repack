import {Dispatch, FC} from 'react'
import {Tab as MuiTab, Tabs as MuiTabs} from "@mui/material";

export type Tab = {
  id: number
  label: string
  value: number
}

type TabsProps = {
  setTabValue: Dispatch<number>;
  tabs: Tab[]
  value: number
}

export const Tabs: FC<TabsProps> = ({tabs, setTabValue, value}) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <MuiTabs value={value}
             onChange={handleChange}
             variant="scrollable"
             scrollButtons="auto">
      {tabs.map(({label, id, value}) => <MuiTab label={label} key={id} value={value}/>)}
    </MuiTabs>
  );
};
