import { useConfirmDialog } from "@/business/store/useConfirmDialog";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConfirmDialog } from "../../../src/app/components/molecules/ConfirmDialog";

vi.mock("@/business/store/useConfirmDialog", () => ({
  useConfirmDialog: vi.fn(),
}));

describe("ConfirmDialog", () => {
  const mockClose = vi.fn();
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not render when dialog is closed", () => {
    (useConfirmDialog as any).mockReturnValue({
      open: false,
      message: "",
      onConfirm: null,
      onCancel: null,
      close: mockClose,
    });

    const { container } = render(<ConfirmDialog />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render dialog with message when open", () => {
    (useConfirmDialog as any).mockReturnValue({
      open: true,
      message: "Are you sure you want to delete this item?",
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
      close: mockClose,
    });

    render(<ConfirmDialog />);
    expect(
      screen.getByText("Are you sure you want to delete this item?")
    ).toBeInTheDocument();
  });

  it("should call onConfirm and close when confirm button is clicked", () => {
    (useConfirmDialog as any).mockReturnValue({
      open: true,
      message: "Are you sure?",
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
      close: mockClose,
    });

    render(<ConfirmDialog />);
    fireEvent.click(screen.getByText("Confirmar"));

    expect(mockClose).toHaveBeenCalled();
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it("should call onCancel and close when cancel button is clicked", () => {
    (useConfirmDialog as any).mockReturnValue({
      open: true,
      message: "Are you sure?",
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
      close: mockClose,
    });

    render(<ConfirmDialog />);
    fireEvent.click(screen.getByText("Cancelar"));

    expect(mockClose).toHaveBeenCalled();
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should not throw error when onCancel is not provided", () => {
    (useConfirmDialog as any).mockReturnValue({
      open: true,
      message: "Are you sure?",
      onConfirm: mockOnConfirm,
      onCancel: null,
      close: mockClose,
    });

    render(<ConfirmDialog />);
    expect(() => {
      fireEvent.click(screen.getByText("Cancelar"));
    }).not.toThrow();
  });

  it("should not throw error when onConfirm is not provided", () => {
    (useConfirmDialog as any).mockReturnValue({
      open: true,
      message: "Are you sure?",
      onConfirm: null,
      onCancel: mockOnCancel,
      close: mockClose,
    });

    render(<ConfirmDialog />);
    expect(() => {
      fireEvent.click(screen.getByText("Confirmar"));
    }).not.toThrow();
  });
});
