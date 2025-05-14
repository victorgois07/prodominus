import { ProductController } from "@/business/controllers/product.controller";
import type { ProductFormData } from "@/business/dtos/product.dto";
import { useLoadingBackdrop } from "@/business/store/useLoadingBackdrop";
import { useProductFilters } from "@/business/store/useProductFilters";
import { Product } from "@/domain/entities/product.entity";
import { container } from "@/infra/container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

const PAGE_SIZE = 8;

export function useProducts() {
  const loadingBackdrop = useLoadingBackdrop();
  const queryClient = useQueryClient();
  const { category, sort, page, search, setCategory, setSort, setPage } =
    useProductFilters();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const controller = container.resolve(ProductController);
      return controller.listProducts();
    },
    refetchInterval: 30000,
  });

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    ).sort();
  }, [products]);

  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const controller = container.resolve(ProductController);
      return controller.createProduct(data);
    },
    onSuccess: (newProduct) => {
      queryClient.setQueryData<Product[]>(["products"], (old = []) => [
        newProduct,
        ...old,
      ]);
      if (!categories.includes(newProduct.category)) {
        setCategory("");
      }
    },
    onSettled: () => {
      loadingBackdrop.close();
    },
    onMutate: () => {
      loadingBackdrop.open();
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ProductFormData>;
    }) => {
      const controller = container.resolve(ProductController);
      return controller.updateProduct(id, data);
    },
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.map((p) =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        )
      );
      if (
        updatedProduct.category &&
        !categories.includes(updatedProduct.category)
      ) {
        setCategory("");
      }
    },
    onSettled: () => {
      loadingBackdrop.close();
    },
    onMutate: () => {
      loadingBackdrop.open();
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const controller = container.resolve(ProductController);
      return controller.deleteProduct(id);
    },
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.filter((p) => p.id !== deletedId)
      );
      const deletedProduct = products.find((p) => p.id === deletedId);
      if (deletedProduct && !categories.includes(deletedProduct.category)) {
        setCategory("");
      }
    },
    onSettled: () => {
      loadingBackdrop.close();
    },
    onMutate: () => {
      loadingBackdrop.open();
    },
  });

  const deleteAllProductsMutation = useMutation({
    mutationFn: async () => {
      const controller = container.resolve(ProductController);
      return controller.deleteAllProducts();
    },
    onSuccess: () => {
      queryClient.setQueryData<Product[]>(["products"], []);
      setCategory("");
    },
    onSettled: () => {
      loadingBackdrop.close();
    },
    onMutate: () => {
      loadingBackdrop.open();
    },
  });

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [products, category, search]);

  const sortedProducts = useMemo(() => {
    if (!sort) return filteredProducts;
    return [...filteredProducts].sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [filteredProducts, sort]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedProducts.length / PAGE_SIZE) || 1;
  }, [sortedProducts]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [sortedProducts, page]);

  const createProduct = async (data: ProductFormData) => {
    await createProductMutation.mutateAsync(data);
  };

  const updateProduct = async (id: number, data: Partial<ProductFormData>) => {
    await updateProductMutation.mutateAsync({ id, data });
  };

  const deleteProduct = async (id: number) => {
    await deleteProductMutation.mutateAsync(id);
  };

  const deleteAllProducts = async () => {
    await deleteAllProductsMutation.mutateAsync();
  };

  const errorMessage = useMemo(() => {
    if (error)
      return error instanceof Error
        ? error.message
        : "Failed to fetch products";
    return null;
  }, [error]);

  return {
    products: paginatedProducts,
    loading: isLoading,
    error: errorMessage,
    categories,
    category,
    setCategory,
    sort,
    setSort,
    page,
    setPage,
    totalPages,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    formLoading:
      createProductMutation.isPending ||
      updateProductMutation.isPending ||
      deleteProductMutation.isPending ||
      deleteAllProductsMutation.isPending,
    formError:
      createProductMutation.error?.message ||
      updateProductMutation.error?.message ||
      deleteProductMutation.error?.message ||
      deleteAllProductsMutation.error?.message,
    refreshProducts: () =>
      queryClient.invalidateQueries({ queryKey: ["products"] }),
  };
}
