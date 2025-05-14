import Home from "@/app/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockProducts = [
  {
    id: 1,
    title: "Test Product",
    price: 99.99,
    description: "Test Description",
    category: "test",
    image: "test.jpg",
  },
];

vi.mock("tsyringe", () => ({
  injectable: () => (target: any) => target,
  inject: () => (target: any, propertyKey: string) => {},
  container: {
    registerSingleton: vi.fn(),
    resolve: vi.fn(() => ({
      listProducts: vi.fn().mockResolvedValue(mockProducts),
      getProducts: vi.fn().mockResolvedValue(mockProducts),
    })),
  },
}));

const queryClient = new QueryClient();
function renderWithQueryClient(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("Home Page E2E", () => {
  it("should render the home page", async () => {
    renderWithQueryClient(<Home />);

    // Aguarda o carregamento inicial
    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    // Verifica se o título da página está presente
    expect(screen.getByText("Products")).toBeInTheDocument();

    // Verifica se o preço está formatado corretamente
    expect(
      screen.getByText(
        (_, element) => element?.textContent?.replace(/\s/g, "") === "R$99,99"
      )
    ).toBeInTheDocument();
  });

  it("should filter products", async () => {
    renderWithQueryClient(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    const categoryFilter = screen.getByLabelText(/categoria/i);
    fireEvent.change(categoryFilter, { target: { value: "test" } });

    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should handle product click", async () => {
    renderWithQueryClient(<Home />);

    // Aguarda o carregamento inicial
    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    // Simula o clique no produto
    const productCard = screen.getByText("Test Product").closest("div");
    fireEvent.click(productCard!);

    // Verifica se os detalhes do produto são exibidos
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});
