import { Product } from "@/domain/entities/product.entity";
import { create } from "zustand";

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavorites = create<FavoritesState>((set, get) => ({
  favorites: [],
  addFavorite: (product) =>
    set((state) =>
      state.favorites.some((p) => p.id === product.id)
        ? state
        : { favorites: [...state.favorites, product] }
    ),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== id),
    })),
  isFavorite: (id) => get().favorites.some((p) => p.id === id),
}));
