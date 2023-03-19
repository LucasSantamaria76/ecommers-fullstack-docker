import { create } from 'zustand';
import { Product } from '../types/products';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

type State = {
  error: string;
  products: Product[];
};

type Actions = {
  setProducts: () => void;
};

export const useProductsStore = create(
  devtools<State & Actions>((set) => ({
    products: [],
    error: '',

    setProducts: async () => {
      try {
        set({ error: '', products: [] });
        const {
          data: { ok, products, error },
        } = await axios.get('products');
        ok ? set({ products }) : set({ error });
      } catch (error: any) {
        set({ error: error.message });
      }
    },
    //setProducts: (products: Product[]) => set(() => ({ products })),
  }))
);
