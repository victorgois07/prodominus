import { container } from "@/infra/container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useProducts } from "../../../src/business/hooks/useProducts";

vi.mock("@/infra/container", () => ({
  container: {
    resolve: vi.fn(),
  },
}));

const mockProductController = {
  listProducts: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
  deleteAllProducts: vi.fn(),
};

vi.mock("@/business/store/useLoadingBackdrop", () => ({
  useLoadingBackdrop: () => ({
    open: vi.fn(),
    close: vi.fn(),
  }),
}));

const mockFilters = {
  category: "",
  sort: null as string | null,
  page: 1,
  search: "",
  setCategory: vi.fn(),
  setSort: vi.fn(),
  setPage: vi.fn((page: number) => {
    mockFilters.page = page;
  }),
  setSearch: vi.fn((search: string) => {
    mockFilters.search = search;
  }),
};

vi.mock("@/business/store/useProductFilters", () => ({
  useProductFilters: () => mockFilters,
}));

describe("useProducts", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    (container.resolve as any).mockReturnValue(mockProductController);
    queryClient.clear();

    // Reset mock filters state
    mockFilters.page = 1;
    mockFilters.category = "";
    mockFilters.sort = null;
    mockFilters.search = "";
  });

  it("should fetch products on mount", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 100, category: "test" },
      { id: 2, title: "Product 2", price: 200, category: "test" },
    ];
    mockProductController.listProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), { wrapper });

    // Initially loading should be true
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch error", async () => {
    const error = new Error("Failed to fetch");
    mockProductController.listProducts.mockRejectedValue(error);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to fetch");
  });

  it("should create a product", async () => {
    const newProduct = {
      title: "New Product",
      price: 100,
      description: "Description",
      category: "test",
      image: "https://example.com/image.jpg",
    };
    const createdProduct = { id: 1, ...newProduct };
    mockProductController.createProduct.mockResolvedValue(createdProduct);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await result.current.createProduct(newProduct);
    });

    expect(mockProductController.createProduct).toHaveBeenCalledWith(
      newProduct
    );
  });

  it("should update a product", async () => {
    const updateData = { title: "Updated Product" };
    const updatedProduct = { id: 1, ...updateData };
    mockProductController.updateProduct.mockResolvedValue(updatedProduct);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await result.current.updateProduct(1, updateData);
    });

    expect(mockProductController.updateProduct).toHaveBeenCalledWith(
      1,
      updateData
    );
  });

  it("should delete a product", async () => {
    mockProductController.deleteProduct.mockResolvedValue(undefined);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await result.current.deleteProduct(1);
    });

    expect(mockProductController.deleteProduct).toHaveBeenCalledWith(1);
  });

  it("should delete all products", async () => {
    mockProductController.deleteAllProducts.mockResolvedValue(undefined);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await result.current.deleteAllProducts();
    });

    expect(mockProductController.deleteAllProducts).toHaveBeenCalled();
  });

  it("should filter products by category", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 100, category: "test1" },
      { id: 2, title: "Product 2", price: 200, category: "test2" },
    ];
    mockProductController.listProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.categories).toEqual(["test1", "test2"]);
  });

  it("should sort products by price", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 200, category: "test" },
      { id: 2, title: "Product 2", price: 100, category: "test" },
    ];
    mockProductController.listProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      mockFilters.sort = "asc";
      result.current.setSort("asc");
    });

    await waitFor(() => {
      expect(result.current.products[0].price).toBe(200);
    });

    await act(async () => {
      mockFilters.sort = "desc";
      result.current.setSort("desc");
    });

    await waitFor(() => {
      expect(result.current.products[0].price).toBe(200);
    });
  });

  it("should handle pagination", async () => {
    const mockProducts = Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      title: `Product ${index + 1}`,
      price: (index + 1) * 100,
      description: `Description ${index + 1}`,
      category: `category${index + 1}`,
      image: `image${index + 1}.jpg`,
    }));
    mockProductController.listProducts.mockResolvedValue(mockProducts);

    const { result, rerender } = renderHook(() => useProducts(), { wrapper });

    // Wait for initial data load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check initial page
    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.products.length).toBe(8);

    // Change page
    result.current.setPage(2);

    // Force a rerender to ensure the hook updates
    rerender();

    // Wait for the page change to be reflected
    await waitFor(() => {
      expect(result.current.page).toBe(2);
    });

    // Check second page
    expect(result.current.products.length).toBe(4);
    expect(result.current.products[0].id).toBe(9);
  });

  it("should handle category reset when updating product with new category", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 100, category: "test1" },
      { id: 2, title: "Product 2", price: 200, category: "test2" },
    ];
    mockProductController.listProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Set initial category
    await act(async () => {
      result.current.setCategory("test1");
    });

    // Update product with new category
    const updatedProduct = {
      id: 1,
      title: "Updated Product",
      category: "test3",
    };
    mockProductController.updateProduct.mockResolvedValue(updatedProduct);

    await act(async () => {
      await result.current.updateProduct(1, { category: "test3" });
    });

    // Category should be reset because new category is not in the list
    expect(result.current.category).toBe("");
  });

  it("should handle category reset when deleting last product of a category", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 100, category: "test1" },
      { id: 2, title: "Product 2", price: 200, category: "test2" },
    ];
    mockProductController.listProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Set initial category
    await act(async () => {
      result.current.setCategory("test1");
    });

    // Delete the only product in the category
    mockProductController.deleteProduct.mockResolvedValue(undefined);

    await act(async () => {
      await result.current.deleteProduct(1);
    });

    // Category should be reset because the category no longer exists
    expect(result.current.category).toBe("");
  });

  it("should handle search functionality", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Test Product",
        price: 100,
        description: "Test description",
        category: "test",
      },
      {
        id: 2,
        title: "Another Product",
        price: 200,
        description: "Another description",
        category: "test",
      },
    ];
    mockProductController.listProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      mockFilters.setSearch("Test");
      await result.current.refreshProducts();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(2);
      expect(result.current.products[0].title).toBe("Test Product");
    });

    await act(async () => {
      mockFilters.setSearch("Another description");
      await result.current.refreshProducts();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(2);
      expect(result.current.products[0].title).toBe("Test Product");
    });
  });

  it("should handle form errors", async () => {
    const error = new Error("Failed to create product");
    mockProductController.createProduct.mockRejectedValue(error);

    const { result } = renderHook(() => useProducts(), { wrapper });

    try {
      await act(async () => {
        await result.current.createProduct({
          title: "New Product",
          price: 100,
          description: "Description",
          category: "test",
          image: "https://example.com/image.jpg",
        });
      });
    } catch (e) {
      // Expected error
    }

    await waitFor(() => {
      expect(result.current.formError).toBe("Failed to create product");
    });
  });

  it("should handle refresh functionality", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 100, category: "test" },
    ];
    mockProductController.listProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Change mock data
    const newMockProducts = [
      { id: 2, title: "Product 2", price: 200, category: "test" },
    ];
    mockProductController.listProducts.mockResolvedValue(newMockProducts);

    // Refresh products
    await act(async () => {
      await result.current.refreshProducts();
    });

    await waitFor(() => {
      expect(result.current.products).toEqual(newMockProducts);
    });
  });

  it("should handle non-Error error objects", async () => {
    const error = "Failed to fetch";
    mockProductController.listProducts.mockRejectedValue(error);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to fetch products");
  });
});
