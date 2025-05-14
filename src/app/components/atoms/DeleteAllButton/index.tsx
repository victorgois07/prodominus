"use client";

import { useProducts } from "@/business/hooks/useProducts";
import { useConfirmDialog } from "@/business/store/useConfirmDialog";

export function DeleteAllButton() {
  const { deleteAllProducts } = useProducts();
  const { show } = useConfirmDialog();

  const handleDeleteAll = () => {
    show(
      "Tem certeza que deseja excluir todos os produtos? Esta ação não pode ser desfeita.",
      async () => {
        await deleteAllProducts();
      }
    );
  };

  return (
    <button
      onClick={handleDeleteAll}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
    >
      Excluir Todos
    </button>
  );
}
