import RootLayout from "@/app/layout";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/app/globals.css", () => ({}));

vi.mock("next/font/google", () => ({
  Inter: () => ({
    className: "inter-class",
    subsets: ["latin"],
  }),
}));

vi.mock("@/app/components/atoms/LoadingBackdrop", () => ({
  LoadingBackdrop: () => <div data-testid="loading-backdrop" />,
}));

vi.mock("@/app/providers", () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}));

describe("RootLayout", () => {
  it("should render the layout with all components", () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByText("Prodominus")).toBeInTheDocument();

    expect(screen.getByText("Test Content")).toBeInTheDocument();

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Prodominus. All rights reserved.`)
    ).toBeInTheDocument();

    expect(screen.getByTestId("loading-backdrop")).toBeInTheDocument();

    expect(screen.getByTestId("providers")).toBeInTheDocument();
  });

  it("should have correct metadata", () => {
    const metadata = {
      title: "Prodominus - Product Management",
      description: "A modern product management system built with Next.js",
    };
    expect(metadata).toEqual({
      title: "Prodominus - Product Management",
      description: "A modern product management system built with Next.js",
    });
  });

  it("should have correct HTML structure", () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
      { container: document.documentElement }
    );

    expect(document.documentElement).toHaveAttribute("lang", "en");

    expect(document.body).toHaveClass("inter-class", "antialiased");
  });
});
