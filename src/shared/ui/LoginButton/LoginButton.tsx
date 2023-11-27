import {Box, Button, Typography} from "@mui/material";
import {useCallback, useState} from "react";
import {Modal} from "@shared";
import styled from "@emotion/styled";
import {FormField} from "@/shared/ui/Forms/FormField.tsx";
import {useForm} from "react-hook-form";

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
export const LoginButton = () => {
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
        LogIn
      </Button>
      <Modal open={openModal} onClose={closeModalHandler} title={'Log in'} height={420} width={500}>
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
              <Typography fontSize={12}>Don’t have an account?</Typography>
            </ButtonContainer>
          </ContentModal>
        </form>
      </Modal>
    </>
  );
};
