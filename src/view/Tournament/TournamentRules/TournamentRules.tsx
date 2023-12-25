import {FC, useState} from 'react'
import {Box, Tab, Tabs} from "@mui/material";
import styled from "@emotion/styled";
import {TFunction} from "i18next";
import {useTranslation} from "react-i18next";
import {MEDIA_QUERY_LG, MEDIA_QUERY_MD, MEDIA_QUERY_SM} from "@/constants/breackpoints";
import {TournamentTabInfo} from "./TournamentTabInfo";
import {TournamentInfoRules} from "./TournamentInfoRules";
import {TournamentInfoPrize} from "./TournamentInfoPrize";
import {TournamentInfoContact} from "./TournamentInfoContact";

type TournamentRulesProps = {}
export const OverviewDetailsTab = styled(Tabs)`
  .MuiTab-root {
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    color: #fff;
    border-bottom: 1px solid #4A5568;
    width: 250px;
    @media (max-width: ${MEDIA_QUERY_LG}px) {
      width: 151px;
    }
    @media (max-width: ${MEDIA_QUERY_MD}px) {
      width: 113px;
      font-size: 16px;
    }
    @media (max-width: ${MEDIA_QUERY_SM}px) {
      width: 90px;
      font-size: 14px;
    }
  }

  .Mui-selected {
    color: #F5F5F5 !important;
    border-radius: 6px 6px 0px 0px;
    border-top: 1px solid #4A5568;
    border-right: 1px solid #4A5568;
    border-left: 1px solid #4A5568;
  }
`;
const tabs = (t: TFunction) => [
  {id: 1, label: t('infoTab'), value: 0},
  {id: 2, label: t('rules'), value: 1},
  {id: 3, label: t('prizeTab'), value: 2},
  {id: 4, label: t('contactsTab'), value: 3},
]
const tabContent = [TournamentTabInfo, TournamentInfoRules, TournamentInfoPrize, TournamentInfoContact]
export const TournamentRules: FC<TournamentRulesProps> = ({}) => {
  const {t} = useTranslation('common')
  const [tabValue, setTabValue] = useState(0)
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const Component = tabContent[tabValue]
  return (
    <Box mt={2} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}
    >
      <OverviewDetailsTab value={tabValue}
                          TabIndicatorProps={{
                            style: {
                              backgroundColor: '#171C26',
                            },
                          }}
                          onChange={handleChange}
                          variant="scrollable"
                          scrollButtons="auto">
        {tabs(t).map(({value, label, id}) => <Tab label={label} key={id} value={value}/>)}
      </OverviewDetailsTab>
      <Component/>
    </Box>
  );
};
