import { ProductFormData } from "@/business/dtos/product.dto";
import { useProducts } from "@/business/hooks/useProducts";
import { useConfirmDialog } from "@/business/store/useConfirmDialog";
import { Product } from "@/domain/entities/product.entity";
import { useCallback, useState } from "react";
import { Toast } from "../../atoms";
import { DeleteAllButton } from "../../atoms/DeleteAllButton";
import { Modal } from "../../molecules";
import { FavoritesManagement } from "../FavoritesManagement";
import { ProductForm } from "../ProductForm";
import { ProductGrid } from "../ProductGrid";

type ToastType = {
  message: string;
  type: "success" | "error";
} | null;

export function ProductManagement() {
  const {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    formLoading,
    formError,
  } = useProducts();
  const confirmDialog = useConfirmDialog();

  const [isModalOpen, setModalOpen] = useState(false);
  const [productBeingEdited, setProductBeingEdited] = useState<Product | null>(
    null
  );
  const [toast, setToast] = useState<ToastType>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
    },
    []
  );

  const handleEdit = useCallback((product: Product) => {
    setProductBeingEdited(product);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (product: Product) => {
      confirmDialog.show(
        `Deseja realmente excluir o produto "${product.title}"?`,
        async () => {
          try {
            await deleteProduct(product.id);
            showToast("Produto excluído com sucesso!", "success");
          } catch {
            showToast("Erro ao excluir produto.", "error");
          }
        }
      );
    },
    [deleteProduct, showToast, confirmDialog]
  );

  const handleSubmit = useCallback(
    async (data: ProductFormData) => {
      try {
        if (productBeingEdited) {
          await updateProduct(productBeingEdited.id, data);
          showToast("Produto editado com sucesso!", "success");
        } else {
          await createProduct(data);
          showToast("Produto criado com sucesso!", "success");
        }
        setModalOpen(false);
        setProductBeingEdited(null);
      } catch {
        showToast("Erro ao salvar produto.", "error");
      }
    },
    [productBeingEdited, createProduct, updateProduct, showToast]
  );

  const handleModalClose = () => {
    setModalOpen(false);
    setProductBeingEdited(null);
  };

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition"
          >
            Novo Produto
          </button>
          <DeleteAllButton />
        </div>
        <FavoritesManagement />
      </div>

      <ProductGrid
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <h2 className="text-xl font-bold mb-4">
          {productBeingEdited ? "Editar Produto" : "Novo Produto"}
        </h2>
        <ProductForm
          initialValues={productBeingEdited ?? {}}
          onSubmit={handleSubmit}
          loading={formLoading}
          submitLabel={productBeingEdited ? "Salvar alterações" : "Criar"}
        />
        {formError && <div className="text-red-500 mt-2">{formError}</div>}
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
