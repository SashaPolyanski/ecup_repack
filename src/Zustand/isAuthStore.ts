import {create} from 'zustand'

type IsAuthType = {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}

export const useIsAuthStore = create<IsAuthType>()((set) => {
  return ({
    isAuth: false,
    setIsAuth: (isAuth: boolean) => set({isAuth}),
  })
})
