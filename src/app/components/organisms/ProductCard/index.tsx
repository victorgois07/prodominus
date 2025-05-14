import { Button } from "@/app/components/atoms";
import { useFavorites } from "@/business/store/useFavorites";
import { Product } from "@/domain/entities/product.entity";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onClick?: (product: Product) => void;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  onClick,
}: ProductCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <div
      role="article"
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative cursor-pointer"
      onClick={() => onClick?.(product)}
    >
      <div className="absolute top-2 left-2 z-10">
        <Button
          type="button"
          className={`p-1 rounded-full ${
            favorite ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"
          }`}
          onClick={() =>
            favorite ? removeFavorite(product.id) : addFavorite(product)
          }
          aria-label={
            favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          {favorite ? "❤️" : "🤍"}
        </Button>
      </div>
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {onEdit && (
          <Button
            className="bg-gray-100 hover:bg-gray-200 rounded p-1 text-gray-600"
            onClick={() => onEdit(product)}
            title="Editar"
            type="button"
            aria-label="edit"
          >
            ✎
          </Button>
        )}
        {onDelete && (
          <Button
            className="bg-gray-100 hover:bg-gray-200 rounded p-1 text-red-600"
            onClick={() => onDelete(product)}
            title="Excluir"
            type="button"
            aria-label="delete"
          >
            🗑️
          </Button>
        )}
      </div>
      <div className="relative h-48 w-full">
        <Image
          src={product.image || "/images/placeholder.svg"}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">
            R$
            {product.price.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-sm text-gray-500 capitalize">
            {product.category}
          </span>
        </div>
        {product.rating && (
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span className="mr-1">★</span>
            <span>{product.rating.rate}</span>
            <span className="mx-1">•</span>
            <span>{product.rating.count} reviews</span>
          </div>
        )}
      </div>
    </div>
  );
}
