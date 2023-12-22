import {useUserStore} from "@/Zustand/userStore";
import {Box, Typography} from "@mui/material";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import PaidIcon from '@mui/icons-material/Paid';
import styled from "@emotion/styled";
import {LoadingButton} from "@mui/lab";
import {useTranslation} from "react-i18next";

const UserBalanceContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CurrencyContainer = styled(Box)`
  display: flex;
  align-items: center;
`;
const Button = styled(LoadingButton)`
  margin: 20px 0px`
export const UserBalance = ({}) => {
  const {user} = useUserStore()
  const {t} = useTranslation('common')
  return (
    <UserBalanceContainer>
      <Typography fontSize={30} mb={4}>{t('balance')}</Typography>
      <Box flex="1">
        <CurrencyContainer mb={2}>
          <CurrencyRubleIcon fontSize={'large'}/>
          <Typography fontSize={30}>
            {`: ${user?.real_currency} ${t('rubles')}`}
          </Typography>
        </CurrencyContainer>
        <CurrencyContainer>
          <PaidIcon fontSize={'large'}/>
          <Typography fontSize={30}>
            {`: ${user?.virtual_currency} ${t('coins')}`}
          </Typography>
        </CurrencyContainer>
      </Box>
      <Button variant={'outlined'}>{t('withdrawMoney')}</Button>
    </UserBalanceContainer>
  );
};