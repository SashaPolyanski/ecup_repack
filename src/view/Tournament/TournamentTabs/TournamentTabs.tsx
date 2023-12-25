import {Dispatch, FC} from 'react'
import {Tabs} from "@shared";
import {useTranslation} from "react-i18next";
import {TFunction} from "i18next";

type TournamentTabsProps = {
  setTabValue: Dispatch<number>
  tabValue: number
}

const tabs = (t: TFunction) => {
  return [
    {id: 1, label: t('review'), value: 0},
    {id: 2, label: t('participants'), value: 1},
    {id: 3, label: t('streamTournament'), value: 2},
    {id: 4, label: t('TournamentGrid'), value: 3},
    {id: 5, label: t('rules'), value: 4}
  ]
}
export const TournamentTabs: FC<TournamentTabsProps> = ({tabValue, setTabValue}) => {
  const {t} = useTranslation('common')
  return <Tabs tabs={tabs(t)} value={tabValue} setTabValue={setTabValue}/>
};
