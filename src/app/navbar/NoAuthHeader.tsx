import {useMemo} from 'react'
import {AuthButton} from "@shared";
import {useTranslation} from "react-i18next";

type ButtonType = {
  id: number
  action: 'signin' | 'signup'
  title: string
}

export const NoAuthHeader = () => {
  const {t} = useTranslation('common')
  const buttons: ButtonType[] = useMemo(() => [
    {id: 1, action: 'signin', title: t('login')},
    {id: 2, action: 'signup', title: t('registration')},
  ], [t])
  return buttons.map(({id, action, title}) => <AuthButton key={id} action={action} title={title}/>)
};
