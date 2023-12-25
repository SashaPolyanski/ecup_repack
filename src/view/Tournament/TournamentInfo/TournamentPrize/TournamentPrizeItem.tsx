import {FC, ReactNode} from 'react'
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

type TournamentPrizeItemProps = {
  icon?: ReactNode
  place: string | number
  moneys?: number
  coins: number
}

export const TournamentPrizeItem: FC<TournamentPrizeItemProps> = ({icon, place, moneys, coins}) => {
  const {t} = useTranslation('common')
  return (
    <>
      <Box my={1}>{place}</Box>
      <Box>{icon}</Box>
      <Box my={!icon ? 3 : 1}>{`${t('rubles')} ${moneys ? moneys : 0}`}</Box>
      <Box>{`${t('coins')} ${coins ? coins : 0}`}</Box>
    </>
  );
};
