import { create } from "zustand";

type GlobalPreloaderType = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const useGlobalPreloader = create<GlobalPreloaderType>()((set) => {
  return {
    isLoading: true,
    setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  };
});
