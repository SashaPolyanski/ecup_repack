import {FC} from 'react'
import styled from "@emotion/styled";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {TournamentRegistrationProgress} from "./TournamentRegistrationProgress";
import {useQuery} from "@/api/hooks/useQuery.ts";
import {TournamentReadOnly} from "@/api/types";
import {useParams} from "react-router-dom";
import {TournamentRegistrationButton} from "./TournamentRegistrationButton";

type TournamentRegistrationCardProps = {}
const RegistrationCardContainer = styled(Box)`
  border-radius: 16px;
  padding: 30px 40px;
  margin-top: 30px;
  width: 50%;
  border: 4px solid #4a5568;`
export const TournamentRegistrationCard: FC<TournamentRegistrationCardProps> = ({}) => {
  const {t} = useTranslation('common')
  const {gameId, id} = useParams()
  const {data} = useQuery<TournamentReadOnly>({path: `/games/${gameId}/tournaments/${id}`})
  return (
    <RegistrationCardContainer>
      <Typography fontSize={24}>{t('TournamenRegistration')}</Typography>
      <Typography fontSize={18}>{t('TournamenRegistrationDesc')}</Typography>
      <TournamentRegistrationProgress teams={data?.teams.length} max_teams={data?.max_teams}/>
      <TournamentRegistrationButton/>
    </RegistrationCardContainer>
  );
};
