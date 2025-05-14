import { ProductFilters } from "@/app/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/business/hooks/useProducts", () => ({
  useProducts: () => ({
    categories: ["electronics", "clothing", "books", "home", "sports"],
    category: "",
    setCategory: () => {},
    sort: "asc",
    setSort: () => {},
    page: 1,
    setPage: () => {},
    totalPages: 1,
    products: [],
    loading: false,
    error: null,
  }),
}));

describe("ProductFilter Snapshot", () => {
  const mockCategories = ["electronics", "clothing", "books", "home", "sports"];
  const queryClient = new QueryClient();

  it("should match snapshot with categories", () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <ProductFilters categories={mockCategories} />
      </QueryClientProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
