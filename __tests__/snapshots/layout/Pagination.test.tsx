import { Pagination } from "@/app/components";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Pagination Snapshot", () => {
  it("should match snapshot with first page", () => {
    const { container } = render(
      <Pagination page={1} totalPages={5} onPage={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with middle page", () => {
    const { container } = render(
      <Pagination page={3} totalPages={5} onPage={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with last page", () => {
    const { container } = render(
      <Pagination page={5} totalPages={5} onPage={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with many pages", () => {
    const { container } = render(
      <Pagination page={10} totalPages={20} onPage={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with single page", () => {
    const { container } = render(
      <Pagination page={1} totalPages={1} onPage={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });
});
