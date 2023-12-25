import {FC} from 'react'
import styled from "@emotion/styled";
import {Box, Typography} from "@mui/material";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk.tsx";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk.tsx";
import {useQuery} from "@/api/hooks/useQuery.ts";
import {TournamentReadOnly} from "@/api/types";
import {useTranslation} from "react-i18next";
import {MEDIA_QUERY_MD, MEDIA_QUERY_SM} from "@/constants/breackpoints.ts";

type TournamentInfoRulesProps = WithGamePkProps & withTournamentPkProps
const TournamentTabInfoRulesComponentContainer = styled(Box)`
  border: 1px solid #4A5568;
  border-top: none;
  padding-left: 20px;
  width: 72.2%;
  margin-bottom: 40px;
  padding-bottom: 30px;
`
export const OverviewTabRulesList = styled(Box)`
  padding-left: 20px;
  color: #F5F5F5;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  @media (max-width: ${MEDIA_QUERY_MD}) {
    font-size: 16px;
  }
  @media (max-width: ${MEDIA_QUERY_SM}) {
    font-size: 14px;
  }
`;
export const OverviewTabRulesLists = styled(Box)`
  color: #F5F5F5;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.4px;
  @media (max-width: ${MEDIA_QUERY_MD}px) {
    font-size: 14px;
  }
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    font-size: 12px;
  }

  span {
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
`;
export const TournamentInfoRulesComponent: FC<TournamentInfoRulesProps> = ({tournamentPk, gamePk}) => {
  const {t} = useTranslation('common')
  const {data} = useQuery<TournamentReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/`,
  });
  return (
    <TournamentTabInfoRulesComponentContainer>
      <Typography fontSize={20} fontWeight={600} pt={2} mb={3}>{t('generalInfo')}</Typography>
      <OverviewTabRulesLists style={{whiteSpace: 'pre-wrap'}}>
        {data?.rules}
      </OverviewTabRulesLists>
    </TournamentTabInfoRulesComponentContainer>
  );
};

export const TournamentInfoRules = withTournamentPk()(withGamePk()(TournamentInfoRulesComponent))
