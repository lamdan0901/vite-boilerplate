import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IUserInfo {
  name: string;
  fullName: string;
  userId: number;
  role: number;
}

interface IAuth {
  userInfo: IUserInfo | null;
  token: string;
  refreshToken: string;
}

const initialState: IAuth = {
  userInfo: null,
  token: '',
  refreshToken: '',
};

interface IAuthAction {
  login: (auth: IAuth) => void;
  setNewToken: (auth: Omit<IAuth, 'userInfo'>) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuth & IAuthAction>()(
  persist(
    immer((set) => ({
      ...initialState,
      login: ({ userInfo, token, refreshToken }) =>
        set({ userInfo, token, refreshToken }),
      setNewToken: ({ token, refreshToken }) => set({ token, refreshToken }),
      logout: () => set(initialState),
    })),
    {
      name: 'auth',
    }
  )
);
