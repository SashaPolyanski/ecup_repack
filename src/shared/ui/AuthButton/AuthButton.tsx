import {FC, useCallback, useState} from 'react'
import {Button, useMediaQuery} from "@mui/material";
import {SingIn} from "./SingIn";
import {SignUp} from "./SignUp";
import {Modal} from "@shared";
import {TFunction} from "i18next";
import {useTranslation} from "react-i18next";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints.ts";

export type AuthButtonProps = {
  action: 'signin' | 'signup'
  title: string
}
type Components = {
  [K in AuthButtonProps['action']]: FC<{
  changeModalComponent: (type: AuthButtonProps['action']) => void
}> | null;
};
type ComponentConfig = {
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
const componentConfig = (t: TFunction, isSmallScreen: boolean): ComponentConfig => {
  return {
    desc: {
      signup: t("registration"),
      signin: t("login")
    },
    height: {
      signup: isSmallScreen ? 600 : 690,
      signin: isSmallScreen ? 400 : 470,
    }
  };
};
export const AuthButton: FC<AuthButtonProps> = ({action, title}) => {
  const {t} = useTranslation('common')
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`)
  const [formType, setFormType] = useState<AuthButtonProps['action'] | null>(null)
  const Component = formType && components[formType]
  const {desc, height} = componentConfig(t, isSmallScreen)
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
        {title}
      </Button>
      <Modal open={!!formType} onClose={closeModalHandler} title={formType ? desc[formType] : ''} height={modalHeight}
             width={500}>
        {Component && <Component changeModalComponent={changeModalComponent}/>}
      </Modal>
    </>
  );
};
