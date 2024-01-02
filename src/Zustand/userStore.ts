import { create } from "zustand";
import { User } from "@/api/types";

type UserType = {
  user?: User;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserType>()((set) => {
  return {
    setUser: (user: User) => set({ user }),
  };
});
