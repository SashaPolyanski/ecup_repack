import {FC, useCallback, useState} from 'react'
import {Button} from "@mui/material";
import {SingIn} from "./SingIn";
import {SignUp} from "./SignUp";
import {Modal} from "@shared";

export type AuthButtonProps = {
  action: 'signin' | 'signup'
}
type Components = {
  [K in AuthButtonProps['action']]: FC<{
  changeModalComponent: (type: AuthButtonProps['action']) => void
}> | null;
};
type ComponentConfig = {
  title: {
    [K in AuthButtonProps['action']]: string;
  },
  desc: {
    [K in AuthButtonProps['action']]: string;
  },
  height: {
    [K in AuthButtonProps['action']]: number
  }
};
const components: Components = {
  signin: SingIn,
  signup: SignUp
}
const componentConfig: ComponentConfig = {
  title: {
    signup: 'Sign Up',
    signin: 'Login'
  },
  desc: {
    signup: "Create your account",
    signin: 'Log in'
  },
  height: {
    signup: 670,
    signin: 470,
  }
}
export const AuthButton: FC<AuthButtonProps> = ({action}) => {
  const [formType, setFormType] = useState<AuthButtonProps['action'] | null>(null)
  const Component = formType && components[formType]
  const {desc, height, title} = componentConfig
  const [modalHeight, setModalHeight] = useState<number>(height[action])
  const openModalFormHandler = useCallback(() => {
    setFormType(action)
    setModalHeight(height[action])
  }, [height, action])
  const changeModalComponent = useCallback((type: AuthButtonProps['action']) => {
    setFormType(type)
    setModalHeight(height[type])
  }, [height])
  const closeModalHandler = useCallback(() => {
    setFormType(null)
  }, [])
  return (
    <>
      <Button onClick={openModalFormHandler}>
        {title[action]}
      </Button>
      <Modal open={!!formType} onClose={closeModalHandler} title={formType ? desc[formType] : ''} height={modalHeight}
             width={500}>
        {Component && <Component changeModalComponent={changeModalComponent}/>}
      </Modal>
    </>
  );
};
