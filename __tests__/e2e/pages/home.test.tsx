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
  inject: () => (target: any, propertyKey: string) => { },
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

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    expect(screen.getByText("Products")).toBeInTheDocument();

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

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    const productCard = screen.getByText("Test Product").closest("div");
    fireEvent.click(productCard!);

    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});
