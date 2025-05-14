import { ProductGrid } from "@/app/components/organisms/ProductGrid";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    description: "Description 1",
    category: "category1",
    image: "image1.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    description: "Description 2",
    category: "category2",
    image: "image2.jpg",
  },
];

const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();

describe("ProductGrid Component", () => {
  it("should render all products", () => {
    render(
      <ProductGrid
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("should handle empty products list", () => {
    render(
      <ProductGrid products={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it("should call onEdit when edit button is clicked", () => {
    render(
      <ProductGrid
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByLabelText(/edit/i);
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockProducts[0]);
  });

  it("should call onDelete when delete button is clicked", () => {
    render(
      <ProductGrid
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByLabelText(/delete/i);
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockProducts[0]);
  });

  it("should render product images", () => {
    render(
      <ProductGrid
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "image1.jpg");
    expect(images[1]).toHaveAttribute("src", "image2.jpg");
  });

  it("should render product categories", () => {
    render(
      <ProductGrid
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("category1")).toBeInTheDocument();
    expect(screen.getByText("category2")).toBeInTheDocument();
  });

  it("should render product descriptions", () => {
    render(
      <ProductGrid
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });
});
