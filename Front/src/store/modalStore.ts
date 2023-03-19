import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  logInUp: boolean;
};

type Actions = {
  onClose: (modal: string) => void;
  onShow: (modal: string) => void;
};

export const useModalStore = create(
  devtools<State & Actions>((set) => ({
    logInUp: false,
    onClose: (modal: string) => set((state) => ({ [modal]: false })),
    onShow: (modal: string) => set((state) => ({ [modal]: true })),
  }))
);
