import {FC, useCallback} from 'react'
import {FormField} from "@/shared/ui/Forms";
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import styled from "@emotion/styled";
import {AuthButtonProps} from "./AuthButton";
import {useMutation} from "@/api/hooks/useMutation";
import {JWT, Register} from "@/api/types";
import Cookie from "cookie-universal";
import {useUserStore} from "@/Zustand/userStore.ts";
import {useIsAuthStore} from "@/Zustand/isAuthStore.ts";
import {signUpResolver} from "@/shared/ui/AuthButton/Schemas.ts";
import {notification} from "@shared";
import {getError} from "@utils";
import {LoadingButton} from "@mui/lab";

type SignUpProps = {
  changeModalComponent: (type: AuthButtonProps['action']) => void
}
const ContentModal = styled(Box)`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ButtonContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`
const SignInLink = styled(Box)`
  color: lightseagreen;
  cursor: pointer;
`
type SignUpFormTypes = {
  email: string
  username: string
  password1: string
  password2: string
}
type FormsType = {
  id: number
  name: keyof SignUpFormTypes
  marginBottom: number
  label: string
  password?: boolean
}
const forms: FormsType[] = [
  {id: 1, name: 'username', marginBottom: 35, label: 'User Name'},
  {id: 2, name: 'email', marginBottom: 35, label: 'Email'},
  {id: 3, name: 'password1', marginBottom: 35, label: 'Password', password: true},
  {id: 4, name: 'password2', marginBottom: 45, label: 'Confirm password', password: true},
]
export const SignUp: FC<SignUpProps> = ({changeModalComponent}) => {
  const cookies = Cookie()
  const {setUser} = useUserStore()
  const {setIsAuth} = useIsAuthStore()
  const {mutate: register, loading} = useMutation<Register, JWT>({
    path: '/auth/registration',
    method: 'POST'
  })
  const {mutate: verify, loading: loadingVerify} = useMutation({path: '/auth/token/verify', method: 'POST'})
  const {control, handleSubmit} = useForm<SignUpFormTypes>({resolver: signUpResolver})

  const onSubmit: SubmitHandler<SignUpFormTypes> = useCallback(async (values) => {
    register(values).then((res) => {
      if (res.status === 201) {
        res.json().then((data) => {
          verify({token: data.access_token}).then(() => {
            setIsAuth(true)
          })
          setUser(data.user)
          notification({message: `Hello ${data.user.username}`})
          cookies.set('token', data.access_token);
          cookies.set('refresh', data.refresh_token);
        })
      }
      if (res.status !== 201) {
        res.json().then((data) => {
          notification({message: getError(data)})
        })
      }
    })
  }, [register, verify, setUser, cookies, setIsAuth])

  const changeFormToSignIn = useCallback(() => {
    changeModalComponent('signin')
  }, [changeModalComponent])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContentModal>
        {forms.map(({id, name, marginBottom, label, password}) => <FormField
          key={id}
          type={'string'}
          control={control}
          name={name}
          disabled={loading || loadingVerify}
          label={label}
          marginBottom={marginBottom}
          password={password}
        />)}
        <ButtonContainer>
          <LoadingButton type={'submit'} variant={'contained'}
                         loading={loading || loadingVerify}>Registration
          </LoadingButton>
          <Typography fontSize={12} mb={1} mt={3}>By clicking "Continue", you agree to the <Link to={'/'}>Ecup
            Privacy
            Policy.</Link></Typography>
          <Typography fontSize={12}></Typography>
          <Typography fontSize={12}>Already have an account?</Typography>
          <SignInLink mt={1}
                      onClick={changeFormToSignIn}>Go to login</SignInLink>
        </ButtonContainer>
      </ContentModal>
    </form>
  );
};
