import {FC} from 'react'
import {Box, Button, Typography} from "@mui/material";

type TournamentRegistrationButtonProps = {
  real_money: number[]
}

export const TournamentRegistrationButton: FC<TournamentRegistrationButtonProps> = ({real_money}) => {
  const prizePool = real_money.reduce((acc, cur) => {
    return acc + cur
  }, 0)
  return (
    <Box display={'flex'} alignItems={'center'} mt={2}>
      <Button variant={'outlined'}>Регистрация в турнире</Button>
      <Typography ml={2}>{prizePool}</Typography>
    </Box>
  );
};
