import {FC, useCallback} from 'react'
import {FormField} from "@/shared/ui/Forms/FormField.tsx";
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import styled from "@emotion/styled";
import {AuthButtonProps} from "./AuthButton";

type SignUpProps = {
  changeModalComponent: (type: AuthButtonProps['type']) => void
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
export const SignUp: FC<SignUpProps> = ({changeModalComponent}) => {

  const {control, handleSubmit} = useForm()
  const onSubmit = useCallback(async (values: any) => {
    console.log(values)
  }, [])
  const changeFoermToSignUp = useCallback(() => {
    changeModalComponent('signin')
  }, [changeModalComponent])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContentModal>
        <FormField
          type={'string'}
          control={control}
          name={'userName'}
          label={'User Name'}
          marginBottom={30}
        />
        <FormField
          type={'string'}
          control={control}
          name={'email'}
          label={'Email'}
          marginBottom={30}
        />
        <FormField
          type={'string'}
          control={control}
          name={'password'}
          label={'Password'}
          marginBottom={30}
        />
        <FormField
          type={'string'}
          control={control}
          name={'confirmPassword'}
          label={'Confirm password'}
          marginBottom={40}
        />
        <ButtonContainer>
          <Button type={'submit'} variant={'contained'}>Log in</Button>
          <Typography fontSize={12} mb={1} mt={3}>By clicking "Continue", you agree to the <Link to={'/'}>Ecup
            Privacy
            Policy.</Link></Typography>
          <Typography fontSize={12}></Typography>
          <Typography fontSize={12}>Already have an account?</Typography>
          <SignInLink mt={1}
                      onClick={changeFoermToSignUp}>LogIn</SignInLink>
        </ButtonContainer>
      </ContentModal>
    </form>
  );
};