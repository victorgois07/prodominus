import { Input } from "@/app/components/atoms/Input";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Input Snapshot", () => {
  it("should match snapshot with label", () => {
    const { container } = render(<Input label="Username" name="username" />);

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with placeholder", () => {
    const { container } = render(
      <Input label="Email" name="email" placeholder="Enter your email" />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with error", () => {
    const { container } = render(
      <Input label="Password" name="password" error="Password is required" />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with helper text", () => {
    const { container } = render(
      <Input label="Phone" name="phone" helperText="Format: (123) 456-7890" />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with required field", () => {
    const { container } = render(
      <Input label="Username" name="username" required />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with disabled state", () => {
    const { container } = render(
      <Input label="Username" name="username" disabled />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with value", () => {
    const { container } = render(
      <Input label="Username" name="username" value="john.doe" />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with type password", () => {
    const { container } = render(
      <Input label="Password" name="password" type="password" />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with icon", () => {
    const { container } = render(
      <Input label="Search" name="search" icon="search" />
    );

    expect(container).toMatchSnapshot();
  });
});
