import { Modal } from "@/app/components/molecules/Modal";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Modal Snapshot", () => {
  it("should match snapshot with title and children", () => {
    const { container } = render(
      <Modal title="Test Modal" isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with long title", () => {
    const { container } = render(
      <Modal
        title="This is a very long modal title that should be properly displayed"
        isOpen={true}
        onClose={() => {}}
      >
        <div>Modal Content</div>
      </Modal>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with complex content", () => {
    const { container } = render(
      <Modal title="Complex Modal" isOpen={true} onClose={() => {}}>
        <div>
          <h2>Section 1</h2>
          <p>This is a paragraph with some text.</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
          <h2>Section 2</h2>
          <p>Another paragraph with more text.</p>
          <button>Click me</button>
        </div>
      </Modal>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot when closed", () => {
    const { container } = render(
      <Modal title="Closed Modal" isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with custom size", () => {
    const { container } = render(
      <Modal
        title="Custom Size Modal"
        isOpen={true}
        onClose={() => {}}
        size="lg"
      >
        <div>Modal Content</div>
      </Modal>
    );

    expect(container).toMatchSnapshot();
  });
});
