import {FC} from 'react'
import {Box, Chip} from "@mui/material";

type TournamentTitleProps = {
  name: string
  description: string | null
  type: string
}

export const TournamentTitle: FC<TournamentTitleProps> = ({description, type, name}) => {
  return (
    <>
      <Box>
        {name}
      </Box>
      <Box>
        <Chip label={type}/>
      </Box>
      <Box>
        {description}
      </Box>
    </>
  );
};
