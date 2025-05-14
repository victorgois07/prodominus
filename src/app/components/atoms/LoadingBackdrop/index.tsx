"use client";

import { useLoadingBackdrop } from "@/business/store/useLoadingBackdrop";

export function LoadingBackdrop() {
  const { isOpen } = useLoadingBackdrop();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        role="status"
        className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"
      ></div>
    </div>
  );
}
