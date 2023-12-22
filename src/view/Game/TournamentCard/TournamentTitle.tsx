import {FC} from 'react'
import {Box, Chip} from "@mui/material";
import styled from "@emotion/styled";

type TournamentTitleProps = {
  name: string
  description: string | null
  type: string
}
const TournamentName = styled(Box)`
  margin-bottom: 10px;
`
const TournamentDescription = styled(Box)`
  opacity: 0.7;
`
export const TournamentTitle: FC<TournamentTitleProps> = ({description, type, name}) => {
  return (
    <>
      <TournamentName fontSize={28}>
        {name}
        <Chip sx={{marginLeft: '10px'}} label={type}/>
      </TournamentName>
      <TournamentDescription>
        {description}
      </TournamentDescription>
    </>
  );
};
