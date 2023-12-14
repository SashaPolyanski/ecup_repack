import {FC} from 'react'
import {TournamentReadOnly} from "@/api/types";
import {Box} from "@mui/material";
import styled from "@emotion/styled";
import {transientOptions} from "@utils";
import {TournamentEnd} from "./TournamentEnd";
import {TournamentTitle} from "./TournamentTitle";
import {TournamentRegistrationProgress} from "./TournamentRegistrationProgress";
import {TournamentRegistrationButton} from "./TournamentRegistrationButton";

type TournamentCardProps = {
  tournament: TournamentReadOnly
}
const TournamentCardContainer = styled(Box, transientOptions)<{ $backgroundImage: string }>`
  background-image: ${({$backgroundImage}) => $backgroundImage && `url(${$backgroundImage})`};
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  height: 300px;
`
const TournamentCardContent = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
`

export const TournamentCard: FC<TournamentCardProps> = ({tournament}) => {
  const {avatar, id, name, teams, max_teams, start_at, type, description, real_money} = tournament

  return (
    <TournamentCardContainer $backgroundImage={avatar.file} sx={{width: '100%'}} display={'flex'}
                             justifyContent={'end'}>
      <TournamentCardContent>
        <TournamentEnd start_at={start_at}/>
        <TournamentTitle name={name} type={type} description={description}/>
        <TournamentRegistrationProgress teams={teams.length} max_teams={max_teams}/>
        <TournamentRegistrationButton real_money={real_money}/>
      </TournamentCardContent>
    </TournamentCardContainer>
  );
};
