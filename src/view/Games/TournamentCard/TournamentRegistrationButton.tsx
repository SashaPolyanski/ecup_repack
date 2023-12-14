import {FC} from 'react'
import {Box, Button} from "@mui/material";

type TournamentRegistrationButtonProps = {
  real_money: number[]
}

export const TournamentRegistrationButton: FC<TournamentRegistrationButtonProps> = ({real_money}) => {
  const prizePool = real_money.reduce((acc, cur) => {
    return acc + cur
  }, 0)
  return (
    <Box>
      <Button>Регистрация в турнире</Button>
      {prizePool}
    </Box>
  );
};
