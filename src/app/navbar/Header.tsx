import {useMemo} from 'react'
import {AuthButton} from "@shared";

type ButtonType = {
  id: number
  action: 'signin' | 'signup'
}

export const Header = () => {
  const buttons: ButtonType[] = useMemo(() => [
    {id: 1, action: 'signin'},
    {id: 2, action: 'signup'},
  ], [])
  return buttons.map(({id, action}) => <AuthButton key={id} action={action}/>)
};
