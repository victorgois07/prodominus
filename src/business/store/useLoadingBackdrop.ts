import { create } from "zustand";

interface LoadingBackdropState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useLoadingBackdrop = create<LoadingBackdropState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => {
    setTimeout(() => {
      set({ isOpen: false });
    }, 1000);
  },
}));
