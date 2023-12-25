import {FC} from 'react';
import Gold from '@assets/PrizeIcon1th.svg';
import Silver from '@assets/PrizeIcon2th.svg';
import Bronze from '@assets/PrizeIcon3th.svg';
import styled from "@emotion/styled";
import {Box} from "@mui/material";
import {useQuery} from "@/api/hooks/useQuery";
import {TournamentReadOnly} from "@/api/types";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {TournamentPrizeItem} from "./TournamentPrizeItem";
import {MEDIA_QUERY_XL} from "@/constants/breackpoints.ts";

type TournamentsPrizeProps = WithGamePkProps & withTournamentPkProps;

const ItemContainer = styled(Box)`
  width: calc(33.33% - 40px);
  height: 130px;
  background-color: #252a40;
  border-radius: 16px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  @media (max-width: ${MEDIA_QUERY_XL}px) {
    width: calc(33.33% - 16px);
  }
`;
const TournamentsPrizeContainer = styled(Box)`
  display: flex;
  justify-content: center;
  width: 50%;
  flex-wrap: wrap;
  @media (max-width: ${MEDIA_QUERY_XL}px) {
    width: 100%;
    margin-top: 30px;
  }
`
export const TournamentsPrizeComponent: FC<TournamentsPrizeProps> = ({tournamentPk, gamePk}) => {
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
    <TournamentsPrizeContainer>
      {prizeItems.map(({place, coins, moneys, icon, id}) => (
        <ItemContainer key={id}>
          <TournamentPrizeItem icon={icon} place={place} moneys={moneys} coins={coins}/>
        </ItemContainer>
      ))}
    </TournamentsPrizeContainer>
  );
};

export const TournamentsPrize = withTournamentPk()(withGamePk()(TournamentsPrizeComponent));
