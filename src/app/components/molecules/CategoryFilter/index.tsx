import { Label } from "../../atoms";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="mb-6">
      <Label htmlFor="category-filter">Categoria</Label>
      <select
        id="category-filter"
        className="block w-full p-2 border border-gray-300 rounded"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Todas</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
