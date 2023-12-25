import {Dispatch, FC} from 'react'
import {Tab as MuiTab, Tabs as MuiTabs} from "@mui/material";
import styled from "@emotion/styled";

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
const TabsMui = styled(MuiTabs)`
  && {
    .MuiTabs-flexContainer {
      justify-content: center;
    }
  }
`;
export const Tabs: FC<TabsProps> = ({tabs, setTabValue, value}) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <TabsMui value={value}
             centered
             onChange={handleChange}
             variant="scrollable"
             scrollButtons="auto">
      {tabs.map(({label, id, value}) => <MuiTab label={label} key={id} value={value}/>)}
    </TabsMui>
  );
};
