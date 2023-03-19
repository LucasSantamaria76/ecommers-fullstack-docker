import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ProductCart = {
  id: string;
  quantity: number;
  price: number;
};

type State = {
  products: ProductCart[] | null;
  total: number;
};

type Actions = {
  addProductToCart: (product: ProductCart) => void;
};

export const useCartStore = create(
  devtools<State & Actions>((set) => ({
    products: [],
    total: 0,
    addProductToCart: (product: ProductCart) =>
      set((state) => ({
        products: state.products?.concat(product),
        total: state.total + product.price,
      })),
  }))
);
