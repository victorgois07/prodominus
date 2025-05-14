import { JsonPlaceholderRepository } from "@/infra/repositories/json-placeholder.repository";
import "reflect-metadata";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("JsonPlaceholderRepository", () => {
  let repository: JsonPlaceholderRepository;
  const mockBaseUrl = "http://localhost:3001";

  beforeEach(() => {
    vi.resetAllMocks();
    process.env.NEXT_PUBLIC_API_URL = mockBaseUrl;
    repository = new JsonPlaceholderRepository();
  });

  describe("findAll", () => {
    it("should fetch all products successfully", async () => {
      const mockProducts = [
        { id: 1, title: "Product 1", price: 99.99 },
        { id: 2, title: "Product 2", price: 149.99 },
      ];

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      });

      const result = await repository.findAll();
      expect(result).toEqual(mockProducts);
      expect(fetch).toHaveBeenCalledWith(`${mockBaseUrl}/products`);
    });

    it("should throw error when API URL is not configured", async () => {
      process.env.NEXT_PUBLIC_API_URL = "";
      repository = new JsonPlaceholderRepository();
      await expect(repository.findAll()).rejects.toThrow(
        "API URL is not configured"
      );
    });

    it("should throw error when API request fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: () => Promise.resolve("Server Error"),
      });

      await expect(repository.findAll()).rejects.toThrow(
        "Failed to fetch products: 500 Internal Server Error"
      );
    });
  });

  describe("findById", () => {
    it("should fetch a product by id successfully", async () => {
      const mockProduct = { id: 1, title: "Product 1", price: 99.99 };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      });

      const result = await repository.findById(1);
      expect(result).toEqual(mockProduct);
      expect(fetch).toHaveBeenCalledWith(`${mockBaseUrl}/products/1`);
    });

    it("should return null when product is not found", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      const result = await repository.findById(999);
      expect(result).toBeNull();
    });

    it("should throw error when API request fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(repository.findById(1)).rejects.toThrow(
        "Failed to fetch product"
      );
    });
  });

  describe("create", () => {
    it("should create a product successfully", async () => {
      const newProduct = {
        title: "New Product",
        price: 199.99,
        description: "New product description",
        category: "electronics",
        image: "https://example.com/image.jpg",
      };
      const createdProduct = { id: 3, ...newProduct };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(createdProduct),
      });

      const result = await repository.create(newProduct);
      expect(result).toEqual(createdProduct);
      expect(fetch).toHaveBeenCalledWith(`${mockBaseUrl}/products`, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });

    it("should throw error when creation fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      });

      await expect(
        repository.create({
          title: "New Product",
          price: 199.99,
          description: "New product description",
          category: "electronics",
          image: "https://example.com/image.jpg",
        })
      ).rejects.toThrow("Failed to create product");
    });
  });

  describe("update", () => {
    it("should update a product successfully", async () => {
      const updateData = { price: 299.99 };
      const updatedProduct = { id: 1, title: "Product 1", ...updateData };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(updatedProduct),
      });

      const result = await repository.update(1, updateData);
      expect(result).toEqual(updatedProduct);
      expect(fetch).toHaveBeenCalledWith(`${mockBaseUrl}/products/1`, {
        method: "PATCH",
        body: JSON.stringify(updateData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });

    it("should throw error when update fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      });

      await expect(repository.update(1, { price: 299.99 })).rejects.toThrow(
        "Failed to update product"
      );
    });
  });

  describe("delete", () => {
    it("should delete a product successfully", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
      });

      await expect(repository.delete(1)).resolves.not.toThrow();
      expect(fetch).toHaveBeenCalledWith(`${mockBaseUrl}/products/1`, {
        method: "DELETE",
      });
    });

    it("should throw error when deletion fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      });

      await expect(repository.delete(1)).rejects.toThrow(
        "Failed to delete product"
      );
    });
  });

  describe("deleteAll", () => {
    it("should delete all products successfully", async () => {
      const mockProducts = [
        { id: 1, title: "Product 1" },
        { id: 2, title: "Product 2" },
      ];

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        })
        .mockResolvedValueOnce({ ok: true })
        .mockResolvedValueOnce({ ok: true });

      await expect(repository.deleteAll()).resolves.not.toThrow();
      expect(fetch).toHaveBeenCalledTimes(3);
    });

    it("should throw error when findAll fails during deleteAll", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      });

      await expect(repository.deleteAll()).rejects.toThrow();
    });
  });
});
