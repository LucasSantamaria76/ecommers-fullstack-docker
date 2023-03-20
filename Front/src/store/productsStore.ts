import { create } from 'zustand';
import { Product } from '../types/products';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import { immer } from 'zustand/middleware/immer';

type State = {
  error: string;
  products: Product[];
};

type Actions = {
  setProducts: () => void;
};

export const useProductsStore = create<State & Actions>()(
  immer(
    devtools((set) => ({
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
    }))
  )
);
