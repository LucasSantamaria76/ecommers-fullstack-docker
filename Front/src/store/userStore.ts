import axios from 'axios';
import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { IProfile, IUser } from '../types/user';
import { useProductsStore } from './productsStore';

type ProductCart = {
  id: string;
  quantity: number;
};

type Cart = {
  total: number;
  products: ProductCart[];
};

type State = {
  logged: boolean;
  token: string;
  userId: string;
  email: string;
  profile: IProfile;
  cart: Cart;
};

type Actions = {
  login: ({ email, password }: IUser) => void;
  logout: () => void;
  toggleFavorite: (id: string) => void;
  addProductToCart: ({ id, quantity }: ProductCart) => void;
  emptyCart: () => void;
  removeToCart: (id: string) => void;
};

const initialState = {
  logged: false,
  token: '',
  userId: '',
  email: '',
  profile: {},
  cart: {
    total: 0,
    products: [],
  },
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
            if (get().logged) {
              get().profile?.favorites?.includes(id)
                ? set(({ profile }) => {
                    profile.favorites = profile?.favorites?.filter((el: string) => el !== id);
                  })
                : set(({ profile }) => {
                    profile.favorites && profile?.favorites.push(id);
                  });
              const {
                data: { ok, error },
              } = await axios.patch('users', { id: get().profile?.id, favorites: get().profile?.favorites });
              error && toast.error(error);
            } else toast.error('Debes inicir sesión para guardar en favoritos');
          },
          addProductToCart: ({ id, quantity }: ProductCart) => {
            const product = useProductsStore.getState().products.find((el) => el.id === id);

            if (get().logged) {
              const indexProductInCart = get().cart?.products?.findIndex((el) => el.id === id);
              indexProductInCart >= 0
                ? set(({ cart }) => {
                    cart.products[indexProductInCart].quantity += quantity;
                    cart.total += (product!.price - product!.price * (product!.discount / 100)) * quantity;
                  })
                : set(({ cart }) => {
                    cart.products.push({ id, quantity: 1 });
                    cart.total += (product!.price - product!.price * (product!.discount / 100)) * quantity;
                  });
            } else toast.error('Debes inicir sesión para agregar al carrito');
          },
          removeToCart: (id: string) => {
            const product = useProductsStore.getState().products.find((el) => el.id === id);
            const indexProductInCart = get().cart?.products?.findIndex((el) => el.id === id);
            set(({ cart }) => {
              cart.total -=
                (product!.price - product!.price * (product!.discount / 100)) *
                cart.products[indexProductInCart].quantity;
              cart.products = cart.products.filter((el) => el.id !== id);
            });
          },
          emptyCart: () =>
            set(({ cart }) => {
              cart.products = [];
              cart.total = 0;
            }),
        }),
        { name: 'userMyMarket' }
      )
    )
  )
);
