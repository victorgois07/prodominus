import { describe, expect, it } from "vitest";
import type { Product, ProductRepository } from "../product.entity";

describe("Product Entity", () => {
  it("should have all required properties", () => {
    const product: Product = {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "Test Description",
      category: "test",
      image: "https://example.com/image.jpg",
    };

    expect(product).toHaveProperty("id", 1);
    expect(product).toHaveProperty("title", "Test Product");
    expect(product).toHaveProperty("price", 100);
    expect(product).toHaveProperty("description", "Test Description");
    expect(product).toHaveProperty("category", "test");
    expect(product).toHaveProperty("image", "https://example.com/image.jpg");
  });

  it("should have optional rating property", () => {
    const product: Product = {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "Test Description",
      category: "test",
      image: "https://example.com/image.jpg",
      rating: {
        rate: 4.5,
        count: 100,
      },
    };

    expect(product.rating).toBeDefined();
    expect(product.rating).toHaveProperty("rate", 4.5);
    expect(product.rating).toHaveProperty("count", 100);
  });

  it("should work without rating property", () => {
    const product: Product = {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "Test Description",
      category: "test",
      image: "https://example.com/image.jpg",
    };

    expect(product.rating).toBeUndefined();
  });
});

describe("ProductRepository Interface", () => {
  it("should define all required methods", () => {
    const repository: ProductRepository = {
      findAll: async () => [],
      findById: async () => null,
      create: async (product) => ({ id: 1, ...product }),
      update: async (id, product) => ({
        id,
        title: product.title || "Default Title",
        price: product.price || 0,
        description: product.description || "Default Description",
        category: product.category || "default",
        image: product.image || "default.jpg",
      }),
      delete: async () => {},
      deleteAll: async () => {},
    };

    expect(repository).toHaveProperty("findAll");
    expect(repository).toHaveProperty("findById");
    expect(repository).toHaveProperty("create");
    expect(repository).toHaveProperty("update");
    expect(repository).toHaveProperty("delete");
    expect(repository).toHaveProperty("deleteAll");
  });

  it("should have correct method signatures", async () => {
    const repository: ProductRepository = {
      findAll: async () => [],
      findById: async () => null,
      create: async (product) => ({ id: 1, ...product }),
      update: async (id, product) => ({
        id,
        title: product.title || "Default Title",
        price: product.price || 0,
        description: product.description || "Default Description",
        category: product.category || "default",
        image: product.image || "default.jpg",
      }),
      delete: async () => {},
      deleteAll: async () => {},
    };

    // Test findAll
    const products = await repository.findAll();
    expect(Array.isArray(products)).toBe(true);

    // Test findById
    const product = await repository.findById(1);
    expect(product).toBeNull();

    // Test create
    const newProduct = await repository.create({
      title: "New Product",
      price: 100,
      description: "Description",
      category: "test",
      image: "image.jpg",
    });
    expect(newProduct).toHaveProperty("id");
    expect(newProduct).toHaveProperty("title", "New Product");

    // Test update
    const updatedProduct = await repository.update(1, { title: "Updated" });
    expect(updatedProduct).toHaveProperty("id", 1);
    expect(updatedProduct).toHaveProperty("title", "Updated");

    // Test delete
    await expect(repository.delete(1)).resolves.not.toThrow();

    // Test deleteAll
    await expect(repository.deleteAll()).resolves.not.toThrow();
  });
});
