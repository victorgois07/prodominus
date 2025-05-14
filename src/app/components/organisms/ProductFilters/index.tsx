import { useProducts } from "@/business/hooks/useProducts";
import { useProductFilters } from "@/business/store/useProductFilters";
import { Input } from "../../atoms";
import { CategoryFilter, SortFilter } from "../../molecules";

interface ProductFiltersProps {
  categories?: string[];
  onFilterChange?: (filters: { search: string; category: string }) => void;
}

export function ProductFilters({
  categories: propCategories,
  onFilterChange,
}: ProductFiltersProps = {}) {
  const {
    categories: hookCategories,
    category,
    setCategory,
    sort,
    setSort,
  } = useProducts();

  const { search, setSearch } = useProductFilters();

  const categories = propCategories || hookCategories;
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    onFilterChange?.({ search, category: newCategory });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onFilterChange?.({ search: newSearch, category: category || "" });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input
        type="text"
        placeholder="Search products"
        onChange={handleSearchChange}
        value={search}
        className="mb-6 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      />
      <CategoryFilter
        categories={categories}
        selected={category}
        onSelect={handleCategoryChange}
      />
      <SortFilter sort={sort} onSort={setSort} />
    </div>
  );
}
