import {FC, useCallback} from 'react'
import {FormField} from "@/shared/ui/Forms/FormField.tsx";
import {Box, Button, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {useForm} from "react-hook-form";
import {AuthButtonProps} from "./AuthButton";

type SingInProps = {
  changeModalComponent: (type: AuthButtonProps['type']) => void
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
export const SingIn: FC<SingInProps> = ({changeModalComponent}) => {
  const {control, handleSubmit} = useForm()
  const onSubmit = useCallback(async (values: any) => {
    console.log(values)
  }, [])
  const changeFoermToSignUp = useCallback(() => {
    changeModalComponent('signup')
  }, [changeModalComponent])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContentModal>
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
          name={'Password'}
          label={'Password'}
          marginBottom={40}/>
        <ButtonContainer>
          <Button type={'submit'} variant={'contained'}>Log in</Button>
          <Typography fontSize={12} mb={1} mt={2}>Forgot your password</Typography>
          <Typography fontSize={12}>Don’t have an account? </Typography>
          <SignUpLink mt={1}
                      onClick={changeFoermToSignUp}>SignUp</SignUpLink>
        </ButtonContainer>
      </ContentModal>
    </form>
  );
};
