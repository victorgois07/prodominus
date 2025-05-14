import { useConfirmDialog } from "@/business/store/useConfirmDialog";

export function ConfirmDialog() {
  const { open, message, onConfirm, onCancel, close } = useConfirmDialog();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <div className="mb-4 text-gray-800">{message}</div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => {
              close();
              onCancel?.();
            }}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={() => {
              close();
              onConfirm?.();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
