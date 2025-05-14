"use client";

import { useProducts } from "@/business/hooks/useProducts";
import { useProductFilters } from "@/business/store/useProductFilters";
import {
  ConfirmDialog,
  Error,
  Loading,
  Pagination,
  ProductFilters,
  ProductManagement,
} from "./components";

export default function Home() {
  const { loading, error, totalPages } = useProducts();
  const { page, setPage } = useProductFilters();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>

      <ProductFilters />

      <div className="mb-6 flex flex-col gap-4">
        <ProductManagement />
      </div>

      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      <ConfirmDialog />
    </main>
  );
}
