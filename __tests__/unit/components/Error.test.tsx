import { Error } from "@/app/components";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Error", () => {
  it("should render error message", () => {
    render(<Error message="Erro de teste" />);
    expect(screen.getByText("Erro de teste")).toBeInTheDocument();
  });

  it("should render nothing if no message", () => {
    const { container } = render(<Error message={""} />);
    const span = container.querySelector("span");
    expect(span).toBeEmptyDOMElement();
  });
});
