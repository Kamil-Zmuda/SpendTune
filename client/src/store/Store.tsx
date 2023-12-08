import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TUser } from '../types/types';

type TStore = {
  logged: TUser | null;
  token: string | null;
  // fetchLoggedUser: () => void;
  setLoggedUser: (user: TUser | null) => void;
  setAuthToken: (token: string | null) => void;
};
const createLoggedStore = persist<TStore>(
  (set) => ({
    logged: null,
    token: null,
    setLoggedUser: (user) => {
      set({ logged: user });
    },
    setAuthToken: (token) => {
      set({ token });
    },
  }),
  {
    name: 'logged-store',
    storage: createJSONStorage(() => sessionStorage),
  }
);

export const useCombinedStore = create<TStore>((...params) => ({
  ...createLoggedStore(...params),
}));
