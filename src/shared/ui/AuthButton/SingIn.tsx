import {FC, useCallback} from 'react'
import {FormField} from "@/shared/ui/Forms/FormField";
import {Box, Typography, useMediaQuery} from "@mui/material";
import styled from "@emotion/styled";
import {SubmitHandler, useForm} from "react-hook-form";
import {AuthButtonProps} from "./AuthButton";
import {useMutation} from "@/api/hooks/useMutation";
import {JWT, Login} from "@/api/types";
import Cookie from "cookie-universal";
import {useUserStore} from "@/Zustand/userStore";
import {useIsAuthStore} from "@/Zustand/isAuthStore";
import {signInResolver} from "./Schemas";
import {getError} from "@utils";
import {Button, notification} from "@shared";
import {useTranslation} from "react-i18next";
import {TFunction} from "i18next";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints";

type SingInProps = {
  changeModalComponent: (type: AuthButtonProps['action']) => void
}
const ContentModal = styled(Box)`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const ButtonContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`
const SignUpLink = styled(Box)`
  color: lightseagreen;
  cursor: pointer;
`
type SignInTypes = {
  email: string
  password: string
}
type FormsType = {
  id: number
  name: keyof SignInTypes
  marginBottom: number
  label: string
  password?: boolean
}
const forms = (t: TFunction, isSmallScreen: boolean): FormsType[] => [
  {id: 1, name: 'email', marginBottom: isSmallScreen ? 27 : 35, label: t('email')},
  {id: 4, name: 'password', marginBottom: isSmallScreen ? 27 : 45, label: t('password'), password: true},
]
export const SingIn: FC<SingInProps> = ({changeModalComponent}) => {
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`)
  const cookies = Cookie()
  const {t} = useTranslation('common')
  const {setUser} = useUserStore()
  const {setIsAuth} = useIsAuthStore()
  const {control, handleSubmit} = useForm<SignInTypes>({resolver: signInResolver})
  const {mutate: Login, loading} = useMutation<Login, JWT>({path: '/auth/login', method: 'POST'})
  const onSubmit: SubmitHandler<SignInTypes> = useCallback(async (values) => {
    Login(values).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setIsAuth(true)
          setUser(data.user)
          notification({message: `${t('hi')} ${data.user.username}`, type: 'success'})
          cookies.set('token', data.access_token);
          cookies.set('refresh', data.refresh_token);
        });
      }
      if (res.status !== 200) {
        res.json().then((data) => {
          notification({message: getError(data)})
        });
      }
    })
  }, [t, Login, cookies, setIsAuth, setUser])
  const changeFormToSignUp = useCallback(() => {
    changeModalComponent('signup')
  }, [changeModalComponent])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContentModal>
        {forms(t, isSmallScreen).map(({id, name, marginBottom, label, password}) => <FormField
          key={id}
          type={'string'}
          control={control}
          name={name}
          password={password}
          label={label}
          disabled={loading}
          marginBottom={marginBottom}
        />)}
        <ButtonContainer>
          <Button loading={loading} type={'submit'} variant={'contained'}>{t('login')}</Button>
          <Typography fontSize={12} mb={1} mt={2}>{t('forgotPassword')}</Typography>
          <Typography fontSize={12}>{t('dontHaveAccount')}</Typography>
          <SignUpLink mt={1}
                      onClick={changeFormToSignUp}>{t('goToRegistration')}</SignUpLink>
        </ButtonContainer>
      </ContentModal>
    </form>
  );
};
