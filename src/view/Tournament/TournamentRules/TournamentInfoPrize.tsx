import {FC, ReactNode} from 'react'
import {useTranslation} from "react-i18next";
import styled from "@emotion/styled";
import {Box, Typography} from "@mui/material";

import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {useQuery} from "@/api/hooks/useQuery";
import {TournamentReadOnly} from "@/api/types";
import Gold from "@assets/PrizeIcon1th.svg";
import Silver from "@assets/PrizeIcon2th.svg";
import Bronze from "@assets/PrizeIcon3th.svg";
import {MEDIA_QUERY_MD, MEDIA_QUERY_SM, MEDIA_QUERY_XL} from "@/constants/breackpoints";

type TournamentInfoPrizeProps = WithGamePkProps & withTournamentPkProps
const TournamentTabInfoPrizeComponentContainer = styled(Box)`
  border: 1px solid #4A5568;
  border-top: none;
  padding-left: 20px;
  width: 100%;
  margin-bottom: 40px;
  padding-bottom: 30px;
`
const TournamentsPrizeContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 16px 0 16px 0;
  @media (max-width: ${MEDIA_QUERY_XL}px) {
    width: 100%;
    margin-top: 30px;
  }
`
type TournamentPrizeInfoItemProps = {
  icon?: ReactNode
  place: string | number
  moneys?: number
  coins: number
}
const ItemContainer = styled(Box)`
  width: calc(33.33% - 40px);
  height: 160px;
  background-color: #252a40;
  border-radius: 16px;
  display: flex;
  margin: 8px 8px 8px 0;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  @media (max-width: ${MEDIA_QUERY_XL}px) {
    width: calc(33.33% - 16px);
  }
  @media (max-width: ${MEDIA_QUERY_MD}px) {
    width: calc(50% - 16px);
  }
`;
export const OverviewTabPrizesDescr = styled(Typography)`
  color: #A0AEC0;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  @media (max-width: ${MEDIA_QUERY_MD}px) {
    font-size: 14px;
  }
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    font-size: 12px;
  }
`;
export const TournamentInfoPrizeItem: FC<TournamentPrizeInfoItemProps> = ({icon, place, moneys, coins}) => {
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
export const TournamentInfoPrizeComponent: FC<TournamentInfoPrizeProps> = ({tournamentPk, gamePk}) => {
  const {t} = useTranslation('common')
  const {data} = useQuery<TournamentReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/`,
  });
  const moneyPrizes = data?.prizes['MONEY'] as number[];
  const virtualPrizes = data?.prizes['VIRTUAL'] as number[];
  const prizeItems = [
    {place: 1, icon: <Gold/>, moneys: moneyPrizes[0], coins: virtualPrizes[0], id: 1},
    {place: 2, icon: <Silver/>, moneys: moneyPrizes[1], coins: virtualPrizes[1], id: 2},
    {place: 3, icon: <Bronze/>, moneys: moneyPrizes[2], coins: virtualPrizes[2], id: 3},
    {place: 4, moneys: moneyPrizes[3], coins: virtualPrizes[3], id: 4},
    {place: '5-8', coins: virtualPrizes[5], id: 5},
    {place: '9-16', coins: virtualPrizes[9], id: 6},
  ];

  return (
    <TournamentTabInfoPrizeComponentContainer>
      <Box>
        <TournamentsPrizeContainer>
          {prizeItems.map(({place, coins, moneys, icon, id}) => (
            <ItemContainer key={id}>
              <TournamentInfoPrizeItem icon={icon} place={place} moneys={moneys} coins={coins}/>
            </ItemContainer>
          ))}
        </TournamentsPrizeContainer>
      </Box>
      <Box>
        <OverviewTabPrizesDescr>
          {t('prizeInfo')}
        </OverviewTabPrizesDescr>
      </Box>
    </TournamentTabInfoPrizeComponentContainer>
  );
};
export const TournamentInfoPrize = withTournamentPk()(withGamePk()(TournamentInfoPrizeComponent))
