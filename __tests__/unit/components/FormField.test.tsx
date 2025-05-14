import { FormField } from "@/app/components/molecules/FormField";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("FormField", () => {
  it("should render label and children", () => {
    render(
      <FormField label="Nome" htmlFor="nome">
        <input id="nome" />
      </FormField>
    );
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
  });

  it("should render error message", () => {
    render(
      <FormField label="Nome" htmlFor="nome" error="Campo obrigatório">
        <input id="nome" />
      </FormField>
    );
    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });
});
