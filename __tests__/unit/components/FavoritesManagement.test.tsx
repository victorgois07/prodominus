import { FavoritesManagement } from "@/app/components/organisms/FavoritesManagement";
import { useFavorites } from "@/business/store/useFavorites";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/business/store/useFavorites", () => ({
  useFavorites: vi.fn(),
}));

vi.mock("@/app/components/organisms/ProductGrid", () => ({
  ProductGrid: ({ products }: { products: any[] }) => (
    <div data-testid="product-grid">
      {products.map((product) => (
        <div key={product.id} data-testid={`product-${product.id}`}>
          {product.title}
        </div>
      ))}
    </div>
  ),
}));

describe("FavoritesManagement", () => {
  it("should render empty state message when there are no favorites", () => {
    (useFavorites as any).mockReturnValue({
      favorites: [],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });

    render(<FavoritesManagement />);

    const favoritesButton = screen.getByText("Favoritos (0)");
    fireEvent.click(favoritesButton);

    const emptyMessage = screen.getByText("Nenhum produto favoritado.");
    expect(emptyMessage).toBeInTheDocument();
    expect(emptyMessage).toHaveClass("text-gray-500");
  });

  it("should render ProductGrid when there are favorites", () => {
    const mockFavorites = [
      { id: 1, title: "Product 1", price: 100, category: "test" },
      { id: 2, title: "Product 2", price: 200, category: "test" },
    ];

    (useFavorites as any).mockReturnValue({
      favorites: mockFavorites,
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });

    render(<FavoritesManagement />);

    const favoritesButton = screen.getByText("Favoritos (2)");
    fireEvent.click(favoritesButton);

    const productGrid = screen.getByTestId("product-grid");
    expect(productGrid).toBeInTheDocument();

    mockFavorites.forEach((product) => {
      const productElement = screen.getByTestId(`product-${product.id}`);
      expect(productElement).toBeInTheDocument();
      expect(productElement).toHaveTextContent(product.title);
    });
  });

  it("should not render empty state message when there are favorites", () => {
    const mockFavorites = [
      { id: 1, title: "Product 1", price: 100, category: "test" },
    ];

    (useFavorites as any).mockReturnValue({
      favorites: mockFavorites,
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });

    render(<FavoritesManagement />);

    const favoritesButton = screen.getByText("Favoritos (1)");
    fireEvent.click(favoritesButton);

    const emptyMessage = screen.queryByText("Nenhum produto favoritado.");
    expect(emptyMessage).not.toBeInTheDocument();
  });
});
