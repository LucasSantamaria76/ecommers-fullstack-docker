import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  logInUp: boolean;
  drawerCart: boolean;
};

type Actions = {
  onClose: (modal: string) => void;
  onShow: (modal: string) => void;
};

const initialState = {
  logInUp: false,
  drawerCart: false,
};

export const useModalStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    onClose: (modal: string) => set(() => ({ [modal]: false })),
    onShow: (modal: string) => set(() => ({ [modal]: true })),
  }))
);
