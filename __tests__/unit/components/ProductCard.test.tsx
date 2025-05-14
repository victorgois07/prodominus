import { ProductCard } from "@/app/components";
import { useFavorites } from "@/business/store/useFavorites";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/business/store/useFavorites");

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "Test Description",
  category: "test",
  image: "test.jpg",
};

describe("ProductCard", () => {
  const mockAddFavorite = vi.fn();
  const mockRemoveFavorite = vi.fn();
  const mockIsFavorite = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useFavorites as any).mockReturnValue({
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      isFavorite: mockIsFavorite,
    });
  });

  it("should render product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test.jpg");
  });

  it("should call onClick when clicked", () => {
    const mockOnClick = vi.fn();
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />);

    fireEvent.click(screen.getByRole("article"));
    expect(mockOnClick).toHaveBeenCalledWith(mockProduct);
  });

  it("should handle missing image", () => {
    const productWithoutImage = { ...mockProduct, image: "" };
    render(<ProductCard product={productWithoutImage} />);

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/images/placeholder.svg"
    );
  });

  it("should format price correctly", () => {
    const productWithDifferentPrice = { ...mockProduct, price: 1234.56 };
    render(<ProductCard product={productWithDifferentPrice} />);

    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent?.replace(/\s/g, "") === "R$1.234,56"
      )
    ).toBeInTheDocument();
  });

  it("should add to favorites when favorite button is clicked and product is not favorite", () => {
    mockIsFavorite.mockReturnValue(false);
    render(<ProductCard product={mockProduct} />);

    const favoriteButton = screen.getByRole("button", {
      name: "Adicionar aos favoritos",
    });
    fireEvent.click(favoriteButton);

    expect(mockAddFavorite).toHaveBeenCalledWith(mockProduct);
    expect(mockRemoveFavorite).not.toHaveBeenCalled();
  });

  it("should remove from favorites when favorite button is clicked and product is favorite", () => {
    mockIsFavorite.mockReturnValue(true);
    render(<ProductCard product={mockProduct} />);

    const favoriteButton = screen.getByRole("button", {
      name: "Remover dos favoritos",
    });
    fireEvent.click(favoriteButton);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockProduct.id);
    expect(mockAddFavorite).not.toHaveBeenCalled();
  });

  it("should show favorite button with correct text based on favorite status", () => {
    mockIsFavorite.mockReturnValue(false);
    const { rerender } = render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("button", { name: "Adicionar aos favoritos" })
    ).toBeInTheDocument();

    mockIsFavorite.mockReturnValue(true);
    rerender(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("button", { name: "Remover dos favoritos" })
    ).toBeInTheDocument();
  });

  it("should call onEdit when edit button is clicked", () => {
    const mockOnEdit = vi.fn();
    render(<ProductCard product={mockProduct} onEdit={mockOnEdit} />);

    const editButton = screen.getByRole("button", { name: "edit" });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockProduct);
  });

  it("should call onDelete when delete button is clicked", () => {
    const mockOnDelete = vi.fn();
    render(<ProductCard product={mockProduct} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole("button", { name: "delete" });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockProduct);
  });

  it("should not show edit and delete buttons when handlers are not provided", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.queryByRole("button", { name: /editar/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /excluir/i })
    ).not.toBeInTheDocument();
  });
});
