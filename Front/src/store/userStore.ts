import axios from 'axios';
import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { IProfile, IUser } from '../types/user';

const initialState = {
  logged: false,
  token: '',
  userId: '',
  email: '',
  profile: {},
};

type State = {
  logged: boolean;
  token: string;
  userId: string;
  email: string;
  profile: IProfile;
};

type Actions = {
  login: ({ email, password }: IUser) => void;
  logout: () => void;
  toggleFavorite: (id: string) => void;
};

export const useUserStore = create<State & Actions>()(
  immer(
    devtools(
      persist(
        (set, get) => ({
          ...initialState,
          login: async ({ email, password }: IUser) => {
            const {
              data: { ok, token, id },
            } = await axios.post('users/login', { email, password });
            if (ok) {
              const { data } = await axios.get(`users/${id}`);
              if (data.ok) {
                set({ logged: true, token, userId: id, email, profile: data.user.profile });
                axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
              }
            } else {
              toast.error('Error al intentar iniciar sesión');
            }
          },
          logout: () => set({ ...initialState }),
          toggleFavorite: async (id) => {
            get().profile?.favorites?.includes(id)
              ? set((state) => {
                  state.profile.favorites = state.profile?.favorites?.filter((el: string) => el !== id);
                })
              : set((state) => {
                  state.profile.favorites && state.profile?.favorites.push(id);
                });
            const {
              data: { ok, error },
            } = await axios.patch('users', { id: get().profile?.id, favorites: get().profile?.favorites });
            error && toast.error(error);
          },
        }),
        { name: 'userMyMarket' }
      )
    )
  )
);
