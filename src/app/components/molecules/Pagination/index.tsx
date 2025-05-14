import { Button } from "../../atoms";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
}

export function Pagination({ page, totalPages, onPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center my-8">
      <ul className="inline-flex items-center gap-1">
        <li>
          <Button onClick={() => onPage(page - 1)} disabled={page === 1}>
            Anterior
          </Button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <Button
              onClick={() => onPage(p)}
              disabled={p === page}
              className={
                p === page
                  ? "bg-green-500 text-white border border-green-600"
                  : "bg-white border border-gray-300"
              }
            >
              {p}
            </Button>
          </li>
        ))}
        <li>
          <Button
            onClick={() => onPage(page + 1)}
            disabled={page === totalPages}
          >
            Próxima
          </Button>
        </li>
      </ul>
    </nav>
  );
}
