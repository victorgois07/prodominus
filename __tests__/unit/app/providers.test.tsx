import { Providers } from "@/app/providers";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockQueryClient = vi.hoisted(() =>
  vi.fn().mockImplementation(() => ({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        retryOnMount: true,
        refetchOnReconnect: true,
      },
    },
  }))
);

vi.mock("@tanstack/react-query", () => ({
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-client-provider">{children}</div>
  ),
  QueryClient: mockQueryClient,
}));

describe("Providers", () => {
  it("should render children wrapped in QueryClientProvider", () => {
    render(
      <Providers>
        <div>Test Content</div>
      </Providers>
    );

    expect(screen.getByTestId("query-client-provider")).toBeInTheDocument();

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should initialize QueryClient with correct default options", () => {
    render(
      <Providers>
        <div>Test Content</div>
      </Providers>
    );

    expect(mockQueryClient).toHaveBeenCalledWith({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          retry: 1,
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: true,
        },
      },
    });
  });
});
