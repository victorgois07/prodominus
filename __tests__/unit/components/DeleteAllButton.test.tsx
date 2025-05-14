import { DeleteAllButton } from "@/app/components/atoms/DeleteAllButton";
import { useProducts } from "@/business/hooks/useProducts";
import { useConfirmDialog } from "@/business/store/useConfirmDialog";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the hooks
vi.mock("@/business/hooks/useProducts", () => ({
  useProducts: vi.fn(),
}));

vi.mock("@/business/store/useConfirmDialog", () => ({
  useConfirmDialog: vi.fn(),
}));

describe("DeleteAllButton", () => {
  const mockDeleteAllProducts = vi.fn();
  const mockShow = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useProducts as any).mockReturnValue({
      deleteAllProducts: mockDeleteAllProducts,
    });
    (useConfirmDialog as any).mockReturnValue({
      show: mockShow,
    });
  });

  it("should render delete all button", () => {
    render(<DeleteAllButton />);
    const button = screen.getByText("Excluir Todos");
    expect(button).toBeInTheDocument();
  });

  it("should show confirmation dialog when clicked", () => {
    render(<DeleteAllButton />);
    const button = screen.getByText("Excluir Todos");
    fireEvent.click(button);

    expect(mockShow).toHaveBeenCalledWith(
      "Tem certeza que deseja excluir todos os produtos? Esta ação não pode ser desfeita.",
      expect.any(Function)
    );
  });

  it("should call deleteAllProducts when confirmed", async () => {
    render(<DeleteAllButton />);
    const button = screen.getByText("Excluir Todos");
    fireEvent.click(button);

    // Get the confirm callback from the show function
    const confirmCallback = mockShow.mock.calls[0][1];
    await confirmCallback();

    expect(mockDeleteAllProducts).toHaveBeenCalled();
  });
});
