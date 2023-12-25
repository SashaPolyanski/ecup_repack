import {FC} from 'react'
import {Box, Button, Typography} from "@mui/material";

type TournamentRegistrationButtonProps = {
  prizes: {
    [key: string]: unknown;
  }
}

export const TournamentRegistrationButton: FC<TournamentRegistrationButtonProps> = ({prizes}) => {
  console.log(prizes)
  return (
    <Box display={'flex'} alignItems={'center'} mt={2}>
      <Button variant={'outlined'}>Регистрация в турнире</Button>
      <Typography ml={2}>{}</Typography>
    </Box>
  );
};
