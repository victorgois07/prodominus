import { ProductCard } from "@/app/components";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("ProductCard Snapshot", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    description: "Test Description",
    category: "test",
    image: "test.jpg",
  };

  const mockOnClick = vi.fn();

  it("should match snapshot", () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with missing image", () => {
    const productWithoutImage = { ...mockProduct, image: "" };
    const { container } = render(<ProductCard product={productWithoutImage} />);

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with long title", () => {
    const productWithLongTitle = {
      ...mockProduct,
      title:
        "This is a very long product title that should be truncated in the UI",
    };
    const { container } = render(
      <ProductCard product={productWithLongTitle} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with long description", () => {
    const productWithLongDescription = {
      ...mockProduct,
      description:
        "This is a very long product description that should be truncated in the UI. It contains multiple sentences and should be properly formatted.",
    };
    const { container } = render(
      <ProductCard product={productWithLongDescription} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with high price", () => {
    const productWithHighPrice = {
      ...mockProduct,
      price: 999999.99,
    };
    const { container } = render(
      <ProductCard product={productWithHighPrice} />
    );

    expect(container).toMatchSnapshot();
  });
});
