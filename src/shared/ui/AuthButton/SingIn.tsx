import {FC, useCallback} from 'react'
import {FormField} from "@/shared/ui/Forms/FormField";
import {Box, Typography} from "@mui/material";
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
import {notification} from "@shared";
import {LoadingButton} from "@mui/lab";

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
}
const forms: FormsType[] = [
  {id: 1, name: 'email', marginBottom: 35, label: 'Email'},
  {id: 4, name: 'password', marginBottom: 45, label: 'Password'},
]
export const SingIn: FC<SingInProps> = ({changeModalComponent}) => {
  const cookies = Cookie()
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
          notification({message: `Hello ${data.user.username}`})
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
  }, [Login, cookies, setIsAuth, setUser])
  const changeFormToSignUp = useCallback(() => {
    changeModalComponent('signup')
  }, [changeModalComponent])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContentModal>
        {forms.map(({id, name, marginBottom, label}) => <FormField
          key={id}
          type={'string'}
          control={control}
          name={name}
          label={label}
          disabled={loading}
          marginBottom={marginBottom}
        />)}
        <ButtonContainer>
          <LoadingButton loading={loading} type={'submit'} variant={'contained'}>Log in</LoadingButton>
          <Typography fontSize={12} mb={1} mt={2}>Forgot your password</Typography>
          <Typography fontSize={12}>Don’t have an account?</Typography>
          <SignUpLink mt={1}
                      onClick={changeFormToSignUp}>Go to registration</SignUpLink>
        </ButtonContainer>
      </ContentModal>
    </form>
  );
};
