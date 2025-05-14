import { Modal } from "@/app/components";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Modal Component", () => {
  const mockOnClose = vi.fn();

  it("should render modal with title and content", () => {
    render(
      <Modal open={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should not render when open is false", () => {
    render(
      <Modal open={false} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    render(
      <Modal open={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.click(screen.getByLabelText(/close/i));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onClose when clicking outside the modal", () => {
    render(
      <Modal open={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.mouseDown(screen.getByTestId("modal-overlay"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should not call onClose when clicking inside the modal content", () => {
    render(
      <Modal open={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.click(screen.getByText("Modal Content"));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("should handle keyboard events", () => {
    render(
      <Modal open={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should render with custom size", () => {
    render(
      <Modal open={true} onClose={mockOnClose} title="Test Modal" size="lg">
        <p>Modal Content</p>
      </Modal>
    );

    const modalContent = screen.getByRole("dialog");
    expect(modalContent).toHaveClass("max-w-2xl");
  });

  it("should render with custom position", () => {
    render(
      <Modal
        open={true}
        onClose={mockOnClose}
        title="Test Modal"
        position="top"
      >
        <p>Modal Content</p>
      </Modal>
    );

    const modalContent = screen.getByRole("dialog");
    expect(modalContent).toHaveClass("mt-20");
  });
});
