import { LoadingBackdrop } from "@/app/components/atoms/LoadingBackdrop";
import { useLoadingBackdrop } from "@/business/store/useLoadingBackdrop";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/business/store/useLoadingBackdrop", () => ({
  useLoadingBackdrop: vi.fn(),
}));

describe("LoadingBackdrop", () => {
  it("should not render when isOpen is false", () => {
    (useLoadingBackdrop as any).mockReturnValue({ isOpen: false });

    const { container } = render(<LoadingBackdrop />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render loading spinner when isOpen is true", () => {
    (useLoadingBackdrop as any).mockReturnValue({ isOpen: true });

    render(<LoadingBackdrop />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
    expect(spinner).toHaveClass("rounded-full");
    expect(spinner).toHaveClass("h-16");
    expect(spinner).toHaveClass("w-16");
    expect(spinner).toHaveClass("border-t-2");
    expect(spinner).toHaveClass("border-b-2");
    expect(spinner).toHaveClass("border-white");
  });

  it("should render with correct backdrop styles", () => {
    (useLoadingBackdrop as any).mockReturnValue({ isOpen: true });

    render(<LoadingBackdrop />);

    const backdrop = screen.getByRole("status").parentElement;
    expect(backdrop).toHaveClass("fixed");
    expect(backdrop).toHaveClass("inset-0");
    expect(backdrop).toHaveClass("bg-black/50");
    expect(backdrop).toHaveClass("backdrop-blur-sm");
    expect(backdrop).toHaveClass("z-50");
    expect(backdrop).toHaveClass("flex");
    expect(backdrop).toHaveClass("items-center");
    expect(backdrop).toHaveClass("justify-center");
  });
});
