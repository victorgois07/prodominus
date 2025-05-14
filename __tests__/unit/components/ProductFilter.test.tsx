import { ProductFilters } from "@/app/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockCategories = ["electronics", "clothing", "books"];
const mockOnFilterChange = vi.fn();
const queryClient = new QueryClient();

function renderWithQueryClient(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("ProductFilter Component", () => {
  it("should render search input and category select", () => {
    renderWithQueryClient(
      <ProductFilters
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
  });

  it("should handle search input change", () => {
    renderWithQueryClient(
      <ProductFilters
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: "test",
      category: "",
    });
  });

  it("should render category select", () => {
    renderWithQueryClient(
      <ProductFilters
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
  });

  it("should handle category select change", () => {
    renderWithQueryClient(
      <ProductFilters
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />
    );

    const categorySelect = screen.getByLabelText(/categoria/i);
    fireEvent.change(categorySelect, { target: { value: "electronics" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: "test",
      category: "electronics",
    });
  });

  it("should handle combined filter changes", () => {
    renderWithQueryClient(
      <ProductFilters
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search products/i);
    const categorySelect = screen.getByLabelText(/categoria/i);

    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.change(categorySelect, { target: { value: "electronics" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: "test",
      category: "electronics",
    });
  });

  it("should render all categories in select", () => {
    renderWithQueryClient(
      <ProductFilters
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />
    );

    mockCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("should handle empty categories", () => {
    renderWithQueryClient(
      <ProductFilters categories={[]} onFilterChange={mockOnFilterChange} />
    );

    const categorySelect = screen.getByLabelText(/categoria/i);
    expect(categorySelect).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: /electronics/i })
    ).not.toBeInTheDocument();
  });
});
