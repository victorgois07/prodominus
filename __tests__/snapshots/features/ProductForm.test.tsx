import { ProductForm } from "@/app/components/organisms/ProductForm";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("ProductForm Snapshot", () => {
  const mockInitialValues = {
    title: "Test Product",
    price: 99.99,
    description: "Test Description",
    category: "test",
    image: "test.jpg",
  };

  const mockOnSubmit = vi.fn();

  it("should match snapshot with initial values", () => {
    const { container } = render(
      <ProductForm initialValues={mockInitialValues} onSubmit={mockOnSubmit} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with empty initial values", () => {
    const { container } = render(
      <ProductForm
        initialValues={{
          title: "",
          price: 0,
          description: "",
          category: "",
          image: "",
        }}
        onSubmit={mockOnSubmit}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with loading state", () => {
    const { container } = render(
      <ProductForm
        initialValues={mockInitialValues}
        onSubmit={mockOnSubmit}
        loading={true}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with validation errors", () => {
    const { container } = render(
      <ProductForm
        initialValues={mockInitialValues}
        onSubmit={mockOnSubmit}
        errors={{
          title: "Title is required",
          price: "Price must be positive",
          description: "Description is required",
          category: "Category is required",
          image: "Invalid image URL",
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with long values", () => {
    const longValues = {
      title:
        "This is a very long product title that should be properly displayed in the form",
      price: 999999.99,
      description:
        "This is a very long product description that should be properly displayed in the form. It contains multiple sentences and should be properly formatted.",
      category:
        "This is a very long category name that should be properly displayed in the form",
      image:
        "https://example.com/very/long/image/path/that/should/be/properly/displayed/in/the/form.jpg",
    };

    const { container } = render(
      <ProductForm initialValues={longValues} onSubmit={mockOnSubmit} />
    );

    expect(container).toMatchSnapshot();
  });
});
