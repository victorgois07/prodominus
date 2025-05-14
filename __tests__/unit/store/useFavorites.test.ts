import { useFavorites } from "@/business/store/useFavorites";
import { Product } from "@/domain/entities/product.entity";
import { beforeEach, describe, expect, it } from "vitest";

describe("useFavorites", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    description: "Test Description",
    category: "test",
    image: "test.jpg",
  };

  beforeEach(() => {
    useFavorites.setState({ favorites: [] });
  });

  it("should initialize with empty favorites", () => {
    const { favorites } = useFavorites.getState();
    expect(favorites).toEqual([]);
  });

  it("should add a product to favorites", () => {
    useFavorites.getState().addFavorite(mockProduct);
    const { favorites } = useFavorites.getState();
    expect(favorites).toContainEqual(mockProduct);
  });

  it("should not add duplicate products to favorites", () => {
    useFavorites.getState().addFavorite(mockProduct);
    useFavorites.getState().addFavorite(mockProduct);
    const { favorites } = useFavorites.getState();
    expect(favorites).toHaveLength(1);
    expect(favorites).toContainEqual(mockProduct);
  });

  it("should remove a product from favorites", () => {
    useFavorites.getState().addFavorite(mockProduct);
    useFavorites.getState().removeFavorite(mockProduct.id);
    const { favorites } = useFavorites.getState();
    expect(favorites).not.toContainEqual(mockProduct);
  });

  it("should check if a product is favorite", () => {
    useFavorites.getState().addFavorite(mockProduct);
    const isFavorite = useFavorites.getState().isFavorite(mockProduct.id);
    expect(isFavorite).toBe(true);
  });

  it("should return false when checking non-favorite product", () => {
    const isFavorite = useFavorites.getState().isFavorite(mockProduct.id);
    expect(isFavorite).toBe(false);
  });

  it("should handle multiple products in favorites", () => {
    const mockProduct2: Product = {
      ...mockProduct,
      id: 2,
      title: "Test Product 2",
    };

    useFavorites.getState().addFavorite(mockProduct);
    useFavorites.getState().addFavorite(mockProduct2);
    const { favorites } = useFavorites.getState();

    expect(favorites).toHaveLength(2);
    expect(favorites).toContainEqual(mockProduct);
    expect(favorites).toContainEqual(mockProduct2);
  });

  it("should maintain favorites after removing one product", () => {
    const mockProduct2: Product = {
      ...mockProduct,
      id: 2,
      title: "Test Product 2",
    };

    useFavorites.getState().addFavorite(mockProduct);
    useFavorites.getState().addFavorite(mockProduct2);
    useFavorites.getState().removeFavorite(mockProduct.id);
    const { favorites } = useFavorites.getState();

    expect(favorites).toHaveLength(1);
    expect(favorites).toContainEqual(mockProduct2);
    expect(favorites).not.toContainEqual(mockProduct);
  });
});
