import { Button } from "@/app/components/atoms/Button";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Button Snapshot", () => {
  it("should match snapshot with primary variant", () => {
    const { container } = render(
      <Button variant="primary">Primary Button</Button>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with secondary variant", () => {
    const { container } = render(
      <Button variant="secondary">Secondary Button</Button>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with danger variant", () => {
    const { container } = render(
      <Button variant="danger">Danger Button</Button>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with loading state", () => {
    const { container } = render(
      <Button variant="primary" loading>
        Loading Button
      </Button>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with disabled state", () => {
    const { container } = render(
      <Button variant="primary" disabled>
        Disabled Button
      </Button>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with icon", () => {
    const { container } = render(
      <Button variant="primary" icon="plus">
        Button with Icon
      </Button>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with long text", () => {
    const { container } = render(
      <Button variant="primary">
        This is a very long button text that should be properly displayed
      </Button>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with small size", () => {
    const { container } = render(
      <Button variant="primary" size="sm">
        Small Button
      </Button>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with large size", () => {
    const { container } = render(
      <Button variant="primary" size="lg">
        Large Button
      </Button>
    );

    expect(container).toMatchSnapshot();
  });
});
