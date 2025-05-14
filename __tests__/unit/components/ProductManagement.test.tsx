import { ProductManagement } from "@/app/components";
import { useProducts } from "@/business/hooks/useProducts";
import { useConfirmDialog } from "@/business/store/useConfirmDialog";
import { container } from "@/infra/container";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/business/hooks/useProducts");
vi.mock("@/business/store/useConfirmDialog");
vi.mock("@/infra/container", () => ({
  container: {
    resolve: vi.fn(),
  },
}));

const mockProducts = [
  {
    id: 1,
    title: "Test Product",
    price: 99.99,
    description: "Test Description",
    category: "test",
    image: "test.jpg",
  },
];

vi.setConfig({ testTimeout: 10000 });

describe("ProductManagement", () => {
  const mockCreateProduct = vi.fn();
  const mockUpdateProduct = vi.fn();
  const mockDeleteProduct = vi.fn();
  const mockShowConfirmDialog = vi.fn();
  const mockProductController = {
    listProducts: vi.fn(),
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
    deleteAllProducts: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    (container.resolve as any).mockReturnValue(mockProductController);

    (useProducts as any).mockReturnValue({
      products: mockProducts,
      createProduct: mockCreateProduct,
      updateProduct: mockUpdateProduct,
      deleteProduct: mockDeleteProduct,
      deleteAllProducts: vi.fn(),
      formLoading: false,
      formError: null,
    });

    (useConfirmDialog as any).mockReturnValue({
      show: mockShowConfirmDialog,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render product grid with products", () => {
    render(<ProductManagement />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should open modal when clicking new product button", () => {
    render(<ProductManagement />);
    fireEvent.click(screen.getByRole("button", { name: "Novo Produto" }));
    expect(screen.getAllByText("Novo Produto")[1]).toBeInTheDocument();
  });

  it("should open modal with product data when editing", async () => {
    render(<ProductManagement />);

    const editButton = screen.getByLabelText("edit");
    fireEvent.click(editButton);

    expect(screen.getByText("Editar Produto")).toBeInTheDocument();
    expect(screen.getByLabelText("Título")).toHaveValue("Test Product");
  });

  it("should show confirm dialog when deleting product", () => {
    render(<ProductManagement />);

    const deleteButton = screen.getAllByRole("button", { name: /Excluir/i })[0];
    fireEvent.click(deleteButton);

    expect(mockShowConfirmDialog).toHaveBeenCalled();
  });

  it("should show form error when provided", () => {
    (useProducts as any).mockReturnValue({
      products: mockProducts,
      createProduct: mockCreateProduct,
      updateProduct: mockUpdateProduct,
      deleteProduct: mockDeleteProduct,
      deleteAllProducts: vi.fn(),
      formLoading: false,
      formError: "Form error message",
    });

    render(<ProductManagement />);
    fireEvent.click(screen.getByRole("button", { name: "Novo Produto" }));

    expect(screen.getByText("Form error message")).toBeInTheDocument();
  });

  it("should show loading state in form", () => {
    (useProducts as any).mockReturnValue({
      products: mockProducts,
      createProduct: mockCreateProduct,
      updateProduct: mockUpdateProduct,
      deleteProduct: mockDeleteProduct,
      deleteAllProducts: vi.fn(),
      formLoading: true,
      formError: null,
    });

    render(<ProductManagement />);
    fireEvent.click(screen.getByRole("button", { name: "Novo Produto" }));

    expect(screen.getByText("Salvando...")).toBeInTheDocument();
  });
});
