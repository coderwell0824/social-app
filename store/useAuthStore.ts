import { create } from "zustand";

interface IAuthState {
  userData: Record<string, any>;
}
interface IAuthReducer {
  setAuth: (authUser: any) => void;
  setUserData: (userData: any) => void;
}

export const useAuthStore = create<IAuthState & IAuthReducer>((set) => ({
  userData: {},
  setAuth: (authUser: any) => {
    set({ userData: authUser });
  },
  setUserData: (userData: any) => {
    set({ userData: { ...userData } });
  },
}));
