import { Pagination } from "@/app/components/molecules/Pagination";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockOnPageChange = vi.fn();

describe("Pagination Component", () => {
  it("should render pagination with correct number of pages", () => {
    render(<Pagination page={1} totalPages={5} onPage={mockOnPageChange} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should highlight current page", () => {
    render(<Pagination page={3} totalPages={5} onPage={mockOnPageChange} />);

    const currentPageButton = screen.getByText("3");
    expect(currentPageButton).toHaveClass(
      "px-4 py-2 rounded font-semibold transition disabled:opacity-50 bg-green-500 text-white border border-green-600"
    );
  });

  it("should handle page click", () => {
    render(<Pagination page={1} totalPages={5} onPage={mockOnPageChange} />);

    fireEvent.click(screen.getByText("2"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("should render pagination buttons", () => {
    render(<Pagination page={2} totalPages={5} onPage={() => {}} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should call onPage when button is clicked", () => {
    const onPage = vi.fn();
    render(<Pagination page={1} totalPages={3} onPage={onPage} />);
    fireEvent.click(screen.getByText("2"));
    expect(onPage).toHaveBeenCalledWith(2);
  });
});
