import { useFavorites } from "@/business/store/useFavorites";
import { useState } from "react";
import { Modal } from "../../molecules";
import { ProductGrid } from "../ProductGrid";

export function FavoritesManagement() {
  const { favorites } = useFavorites();
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setFavoritesOpen(true)}
        className="bg-pink-600 text-white px-4 py-2 rounded font-semibold hover:bg-pink-700 transition"
      >
        Favoritos ({favorites.length})
      </button>

      <Modal open={isFavoritesOpen} onClose={() => setFavoritesOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Favoritos</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">Nenhum produto favoritado.</p>
        ) : (
          <ProductGrid products={favorites} />
        )}
      </Modal>
    </>
  );
}
