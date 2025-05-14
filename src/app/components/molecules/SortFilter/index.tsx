import { Label } from "../../atoms";

interface SortFilterProps {
  sort: string;
  onSort: (sort: string) => void;
}

export function SortFilter({ sort, onSort }: SortFilterProps) {
  return (
    <div className="mb-6">
      <Label htmlFor="sort-filter">Ordenar por</Label>
      <select
        id="sort-filter"
        className="block w-full p-2 border border-gray-300 rounded"
        value={sort}
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="">Padrão</option>
        <option value="asc">Preço: Menor para Maior</option>
        <option value="desc">Preço: Maior para Menor</option>
      </select>
    </div>
  );
}
