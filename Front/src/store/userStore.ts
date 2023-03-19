import axios from 'axios';
import { toast } from 'react-hot-toast';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { IProfile, IUser } from '../types/user';

const initialState = {
  logged: false,
  token: '',
  userId: '',
  email: '',
  profile: {},
  favorites: [],
};

type State = {
  logged: boolean;
  token: string;
  userId: string;
  email: string;
  profile: IProfile;
  favorites: string[];
};

type Actions = {
  login: ({ email, password }: IUser) => void;
  logout: () => void;
  toggleFavorite: (id: string) => void;
};

export const useUserStore = create(
  devtools<State & Actions>((set, get) => ({
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
    toggleFavorite: (id) => {
      get().favorites.includes(id)
        ? set((state) => ({ favorites: state.favorites.filter((el) => el !== id) }))
        : set((state) => ({ favorites: [...state.favorites, id] }));
    },
  }))
);
