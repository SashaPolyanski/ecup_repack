import {useCallback, useState} from 'react'
import {Box, Button, Typography} from "@mui/material";
import {Modal} from "@shared";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {FormField} from "@/shared/ui/Forms/FormField.tsx";
import {useForm} from "react-hook-form";

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

export const SignUpButton = () => {
  const [openModal, setOpenModal] = useState(false)
  const {control, handleSubmit} = useForm()
  const openModalHandler = useCallback(() => {
    setOpenModal(true)
  }, [])
  const closeModalHandler = useCallback(() => {
    setOpenModal(false)
  }, [])
  const onSubmit = useCallback(async (values: any) => {
    console.log(values)
  }, [])
  return (
    <>
      <Button onClick={openModalHandler}>
        Sign up
      </Button>
      <Modal open={openModal} onClose={closeModalHandler} title={"Create your account"} height={600} width={500}>
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
            </ButtonContainer>
          </ContentModal>
        </form>
      </Modal>
    </>
  );
};
