import { ProductGrid } from "@/app/components/organisms/ProductGrid";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("ProductGrid Snapshot", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Product 1",
      price: 99.99,
      description: "Description 1",
      category: "category1",
      image: "image1.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      price: 149.99,
      description: "Description 2",
      category: "category2",
      image: "image2.jpg",
    },
  ];

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  it("should match snapshot with products", () => {
    const { container } = render(
      <ProductGrid
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with empty products", () => {
    const { container } = render(
      <ProductGrid products={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with loading state", () => {
    const { container } = render(
      <ProductGrid
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isLoading={true}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with error state", () => {
    const { container } = render(
      <ProductGrid
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        error="Failed to load products"
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with many products", () => {
    const manyProducts = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Product ${index + 1}`,
      price: (index + 1) * 10,
      description: `Description ${index + 1}`,
      category: `category${index + 1}`,
      image: `image${index + 1}.jpg`,
    }));

    const { container } = render(
      <ProductGrid
        products={manyProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
