import { Toast } from "@/app/components/atoms/Toast";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Toast Snapshot", () => {
  it("should match snapshot with success message", () => {
    const { container } = render(
      <Toast
        message="Operation completed successfully!"
        type="success"
        onClose={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with error message", () => {
    const { container } = render(
      <Toast
        message="An error occurred. Please try again."
        type="error"
        onClose={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with long message", () => {
    const { container } = render(
      <Toast
        message="This is a very long toast message that should be properly displayed and wrapped if necessary. It contains multiple sentences and should be properly formatted."
        type="success"
        onClose={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with short message", () => {
    const { container } = render(
      <Toast message="Done!" type="success" onClose={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with error message containing special characters", () => {
    const { container } = render(
      <Toast
        message="Error: Invalid input! Please check your data (code: #123)"
        type="error"
        onClose={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
