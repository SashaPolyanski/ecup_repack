import {FC, useCallback, useState} from 'react'
import {Button} from "@mui/material";
import {SingIn} from "./SingIn";
import {SignUp} from "./SignUp";
import {Modal} from "@shared";

export type AuthButtonProps = {
  type: 'signin' | 'signup'
}
type Components = {
  [K in AuthButtonProps['type']]: FC<{
  changeModalComponent: (type: AuthButtonProps['type']) => void
}> | null;
};
type ComponentConfig = {
  title: {
    [K in AuthButtonProps['type']]: string;
  },
  desc: {
    [K in AuthButtonProps['type']]: string;
  },
  height: {
    [K in AuthButtonProps['type']]: number
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
    signup: 630,
    signin: 450,
  }
}
export const AuthButton: FC<AuthButtonProps> = ({type}) => {
  const [formType, setFormType] = useState<AuthButtonProps['type'] | null>(null)
  const Component = formType && components[formType]
  const {desc, height, title} = componentConfig
  const [modalHeight, setModalHeight] = useState<number>(height[type])
  const openModalFormHandler = useCallback(() => {
    setFormType(type)
  }, [type])
  const changeModalComponent = useCallback((type: AuthButtonProps['type']) => {
    setFormType(type)
    setModalHeight(height[type])
  }, [height])
  const closeModalHandler = useCallback(() => {
    setFormType(null)
  }, [])
  return (
    <div>
      <Button onClick={openModalFormHandler}>
        {title[type]}
      </Button>
      <Modal open={!!formType} onClose={closeModalHandler} title={desc[type]} height={modalHeight} width={500}>
        {Component && <Component changeModalComponent={changeModalComponent}/>}
      </Modal>
    </div>
  );
};
