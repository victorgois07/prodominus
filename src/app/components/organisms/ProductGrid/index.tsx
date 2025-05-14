import { Product } from "@/domain/entities/product.entity";
import { ProductCard } from "../ProductCard";

interface ProductGridProps {
  modal?: boolean;
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export function ProductGrid({ products, onEdit, onDelete, modal = false }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No products found</div>
    );
  }

  return (
    <div className={`${modal ? 'grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
