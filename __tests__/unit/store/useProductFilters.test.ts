import { useProductFilters } from "@/business/store/useProductFilters";
import { beforeEach, describe, expect, it } from "vitest";

describe("useProductFilters", () => {
  beforeEach(() => {
    useProductFilters.setState({
      category: "",
      sort: "",
      page: 1,
      search: "",
    });
  });

  it("should initialize with default values", () => {
    const state = useProductFilters.getState();
    expect(state.category).toBe("");
    expect(state.sort).toBe("");
    expect(state.page).toBe(1);
    expect(state.search).toBe("");
  });

  it("should set category and reset page", () => {
    useProductFilters.getState().setCategory("electronics");
    const state = useProductFilters.getState();
    expect(state.category).toBe("electronics");
    expect(state.page).toBe(1);
  });

  it("should set sort and reset page", () => {
    useProductFilters.getState().setSort("price-asc");
    const state = useProductFilters.getState();
    expect(state.sort).toBe("price-asc");
    expect(state.page).toBe(1);
  });

  it("should set page without affecting other filters", () => {
    useProductFilters.getState().setCategory("electronics");
    useProductFilters.getState().setPage(2);
    const state = useProductFilters.getState();
    expect(state.category).toBe("electronics");
    expect(state.page).toBe(2);
  });

  it("should set search and reset page", () => {
    useProductFilters.getState().setSearch("laptop");
    const state = useProductFilters.getState();
    expect(state.search).toBe("laptop");
    expect(state.page).toBe(1);
  });

  it("should reset all filters to default values", () => {
    useProductFilters.setState({
      category: "electronics",
      sort: "price-asc",
      page: 2,
      search: "laptop",
    });

    useProductFilters.getState().resetFilters();
    const state = useProductFilters.getState();
    expect(state.category).toBe("");
    expect(state.sort).toBe("");
    expect(state.page).toBe(1);
    expect(state.search).toBe("");
  });

  it("should maintain state between multiple filter changes", () => {
    useProductFilters.getState().setCategory("electronics");
    useProductFilters.getState().setSort("price-asc");
    useProductFilters.getState().setSearch("laptop");
    useProductFilters.getState().setPage(2);

    const state = useProductFilters.getState();
    expect(state.category).toBe("electronics");
    expect(state.sort).toBe("price-asc");
    expect(state.search).toBe("laptop");
    expect(state.page).toBe(2);
  });

  it("should reset page when changing any filter except page", () => {
    useProductFilters.getState().setPage(2);
    useProductFilters.getState().setCategory("electronics");
    expect(useProductFilters.getState().page).toBe(1);

    useProductFilters.getState().setPage(2);
    useProductFilters.getState().setSort("price-asc");
    expect(useProductFilters.getState().page).toBe(1);

    useProductFilters.getState().setPage(2);
    useProductFilters.getState().setSearch("laptop");
    expect(useProductFilters.getState().page).toBe(1);
  });
});
