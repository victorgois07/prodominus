import { create } from "zustand";

interface ProductFiltersState {
  category: string;
  sort: string;
  page: number;
  search: string;
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
}

export const useProductFilters = create<ProductFiltersState>((set) => ({
  category: "",
  sort: "",
  page: 1,
  search: "",
  setCategory: (category) => set({ category, page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search, page: 1 }),
  resetFilters: () => set({ category: "", sort: "", page: 1, search: "" }),
}));
