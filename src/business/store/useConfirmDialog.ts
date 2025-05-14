import { create } from "zustand";

type ConfirmDialogState = {
  open: boolean;
  message: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
  show: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
  close: () => void;
};

export const useConfirmDialog = create<ConfirmDialogState>((set) => ({
  open: false,
  message: "",
  onConfirm: null,
  onCancel: null,
  show: (message, onConfirm, onCancel) =>
    set({ open: true, message, onConfirm, onCancel }),
  close: () =>
    set({ open: false, message: "", onConfirm: null, onCancel: null }),
}));
