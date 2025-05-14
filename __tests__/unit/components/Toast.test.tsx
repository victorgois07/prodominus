import { Toast } from "@/app/components/atoms/Toast";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Toast Component", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render toast with message", () => {
    render(
      <Toast message="Test Message" type="success" onClose={mockOnClose} />
    );

    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    render(
      <Toast message="Test Message" type="success" onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByLabelText(/close/i));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should auto close after duration", () => {
    render(
      <Toast message="Test Message" type="success" onClose={mockOnClose} />
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should render with different types", () => {
    const { rerender } = render(
      <Toast message="Success Message" type="success" onClose={mockOnClose} />
    );

    expect(
      screen.getByText("Success Message").parentElement?.parentElement
    ).toHaveClass("bg-green-500");

    rerender(
      <Toast message="Error Message" type="error" onClose={mockOnClose} />
    );

    expect(
      screen.getByText("Error Message").parentElement?.parentElement
    ).toHaveClass("bg-red-500");
  });

  it("should handle multiple toasts", () => {
    render(
      <>
        <Toast message="First Message" type="success" onClose={mockOnClose} />
        <Toast message="Second Message" type="error" onClose={mockOnClose} />
      </>
    );

    expect(screen.getByText("First Message")).toBeInTheDocument();
    expect(screen.getByText("Second Message")).toBeInTheDocument();
  });

  it("should render toast message", () => {
    render(
      <Toast
        message="Mensagem de toast"
        type={"error"}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(screen.getByText("Mensagem de toast")).toBeInTheDocument();
  });

  it("should render nothing if no message", () => {
    const { container } = render(
      <Toast
        message={""}
        type={"error"}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const span = container.querySelector("span");
    expect(span).toBeEmptyDOMElement();
  });
});
