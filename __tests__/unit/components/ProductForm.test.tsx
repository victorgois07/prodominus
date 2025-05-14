import { ProductForm } from "@/app/components";
import { ProductFormData } from "@/business/dtos/product.dto";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("ProductForm", () => {
  const mockInitialValues: Partial<ProductFormData> = {
    title: "Test Product",
    price: 99.99,
    description: "Test Description",
    category: "test",
    image: "https://example.com/test.jpg",
  };

  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render form with initial values", () => {
    render(
      <ProductForm initialValues={mockInitialValues} onSubmit={mockOnSubmit} />
    );

    expect(screen.getByLabelText("Título")).toHaveValue("Test Product");
    expect(screen.getByLabelText("Preço")).toHaveValue("R$ 99,99");
    expect(screen.getByLabelText("Descrição")).toHaveValue("Test Description");
    expect(screen.getByLabelText("Categoria")).toHaveValue("test");
    expect(screen.getByLabelText("URL da Imagem")).toHaveValue(
      "https://example.com/test.jpg"
    );
  });

  it("should render form with empty values", () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText("Título")).toHaveValue("");
    expect(screen.getByLabelText("Preço")).toHaveValue("");
    expect(screen.getByLabelText("Descrição")).toHaveValue("");
    expect(screen.getByLabelText("Categoria")).toHaveValue("");
    expect(screen.getByLabelText("URL da Imagem")).toHaveValue("");
  });

  it("should show validation errors for invalid inputs", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText("Título");
    const priceInput = screen.getByLabelText("Preço");
    const descriptionInput = screen.getByLabelText("Descrição");
    const categoryInput = screen.getByLabelText("Categoria");
    const imageInput = screen.getByLabelText("URL da Imagem");

    fireEvent.change(titleInput, { target: { value: "ab" } }); // < 3 chars
    fireEvent.change(priceInput, { target: { value: "0" } });   // not positive
    fireEvent.change(descriptionInput, { target: { value: "curto" } }); // < 10 chars
    fireEvent.change(categoryInput, { target: { value: "a" } }); // < 2 chars
    fireEvent.change(imageInput, { target: { value: "invalid-url" } }); // invalid URL

    // Dispara validação ao "blur"
    fireEvent.blur(titleInput);
    fireEvent.blur(priceInput);
    fireEvent.blur(descriptionInput);
    fireEvent.blur(categoryInput);
    fireEvent.blur(imageInput);

    const submitButton = screen.getByRole("button", { name: "Salvar" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Título deve ter no mínimo 3 caracteres")
      ).toBeInTheDocument();

      expect(screen.getByText("Preço deve ser positivo")).toBeInTheDocument();

      expect(
        screen.getByText("Descrição deve ter no mínimo 10 caracteres")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Categoria deve ter no mínimo 2 caracteres")
      ).toBeInTheDocument();

      expect(screen.getByText("URL da imagem inválida")).toBeInTheDocument();
    });
  });

  it("should call onSubmit with form data when valid", async () => {
    render(
      <ProductForm initialValues={mockInitialValues} onSubmit={mockOnSubmit} />
    );

    const titleInput = screen.getByLabelText("Título");
    const priceInput = screen.getByLabelText("Preço");
    const descriptionInput = screen.getByLabelText("Descrição");
    const categoryInput = screen.getByLabelText("Categoria");
    const imageInput = screen.getByLabelText("URL da Imagem");

    fireEvent.change(titleInput, { target: { value: "Novo Título" } });
    fireEvent.change(priceInput, { target: { value: "1234,56" } });
    fireEvent.change(descriptionInput, { target: { value: "Nova Descrição" } });
    fireEvent.change(categoryInput, { target: { value: "nova-categoria" } });
    fireEvent.change(imageInput, {
      target: { value: "https://example.com/nova-imagem.jpg" },
    });

    await waitFor(() => {
      const submitButton = screen.getByRole("button", { name: "Salvar" });
      expect(submitButton).not.toBeDisabled();
    });

    const submitButton = screen.getByRole("button", { name: "Salvar" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Novo Título",
        price: 1234.56,
        description: "Nova Descrição",
        category: "nova-categoria",
        image: "https://example.com/nova-imagem.jpg",
      });
    });
  });

  it("should disable form when loading", () => {
    render(
      <ProductForm
        initialValues={mockInitialValues}
        onSubmit={mockOnSubmit}
        loading={true}
      />
    );

    expect(screen.getByLabelText("Título")).toBeDisabled();
    expect(screen.getByLabelText("Preço")).toBeDisabled();
    expect(screen.getByLabelText("Descrição")).toBeDisabled();
    expect(screen.getByLabelText("Categoria")).toBeDisabled();
    expect(screen.getByLabelText("URL da Imagem")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Salvando..." })).toBeDisabled();
  });

  it("should show image preview when valid image URL is provided", async () => {
    render(
      <ProductForm initialValues={mockInitialValues} onSubmit={mockOnSubmit} />
    );

    const imageInput = screen.getByLabelText("URL da Imagem");
    fireEvent.change(imageInput, {
      target: { value: "https://example.com/test.jpg" },
    });

    await waitFor(() => {
      expect(screen.getByAltText("Preview")).toBeInTheDocument();
    });
  });

  it("should show error for invalid image URL", async () => {
    render(
      <ProductForm initialValues={mockInitialValues} onSubmit={mockOnSubmit} />
    );

    const imageInput = screen.getByLabelText("URL da Imagem");
    fireEvent.change(imageInput, {
      target: { value: "invalid-url" },
    });

    await waitFor(() => {
      expect(screen.getByText(/url da imagem inválida/i)).toBeInTheDocument();
    });
  });

  it("should show custom submit label", () => {
    render(
      <ProductForm
        initialValues={mockInitialValues}
        onSubmit={mockOnSubmit}
        submitLabel="Custom Label"
      />
    );

    expect(
      screen.getByRole("button", { name: "Custom Label" })
    ).toBeInTheDocument();
  });

  it("should handle price input with numeric format", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const priceInput = screen.getByLabelText("Preço");
    fireEvent.change(priceInput, {
      target: { value: "1234,56" },
    });

    expect(priceInput).toHaveValue("R$ 1.234,56");
  });

  it("should not allow negative prices", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText("Título");
    const priceInput = screen.getByLabelText("Preço");
    const descriptionInput = screen.getByLabelText("Descrição");
    const categoryInput = screen.getByLabelText("Categoria");
    const imageInput = screen.getByLabelText("URL da Imagem");

    fireEvent.change(titleInput, { target: { value: "Test Product" } });
    fireEvent.change(priceInput, { target: { value: "-1234,56" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.change(categoryInput, { target: { value: "test" } });
    fireEvent.change(imageInput, {
      target: { value: "https://example.com/test.jpg" },
    });

    await waitFor(() => {
      expect(priceInput).toHaveValue("R$ 1.234,56");
    });

    const submitButton = screen.getByRole("button", { name: "Salvar" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Test Product",
          price: 1234.56,
          description: "Test Description",
          category: "test",
          image: "https://example.com/test.jpg",
        })
      );
    });
  });
});
