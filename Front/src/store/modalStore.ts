import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  logInUp: boolean;
};

type Actions = {
  onClose: (modal: string) => void;
  onShow: (modal: string) => void;
};

export const useModalStore = create<State & Actions>()(
  devtools((set) => ({
    logInUp: false,
    onClose: (modal: string) => set(() => ({ [modal]: false })),
    onShow: (modal: string) => set(() => ({ [modal]: true })),
  }))
);
