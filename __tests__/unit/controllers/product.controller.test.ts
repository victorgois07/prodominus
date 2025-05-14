import { ProductController } from "@/business/controllers/product.controller";
import type { ProductRepository } from "@/domain/entities/product.entity";
import { ListProductsUseCase } from "@/services/list-products.use-case";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("ProductController", () => {
  let controller: ProductController;
  let mockListProductsUseCase: ListProductsUseCase;
  let mockJsonPlaceholderRepository: ProductRepository;

  beforeEach(() => {
    mockListProductsUseCase = {
      execute: vi.fn(),
    } as any;

    mockJsonPlaceholderRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteAll: vi.fn(),
    } as any;

    controller = new ProductController(
      mockListProductsUseCase,
      mockJsonPlaceholderRepository
    );
  });

  describe("listProducts", () => {
    it("should return products from use case", async () => {
      const mockProducts = [
        { id: 1, title: "Product 1", price: 100 },
        { id: 2, title: "Product 2", price: 200 },
      ];
      (mockListProductsUseCase.execute as any).mockResolvedValue(mockProducts);

      const result = await controller.listProducts();

      expect(result).toEqual(mockProducts);
      expect(mockListProductsUseCase.execute).toHaveBeenCalled();
    });

    it("should handle errors and throw with custom message", async () => {
      const error = new Error("Original error");
      (mockListProductsUseCase.execute as any).mockRejectedValue(error);

      await expect(controller.listProducts()).rejects.toThrow(
        "Failed to list products"
      );
      expect(mockListProductsUseCase.execute).toHaveBeenCalled();
    });
  });

  describe("createProduct", () => {
    it("should create a product using repository", async () => {
      const newProduct = {
        title: "New Product",
        price: 100,
        description: "Description",
        category: "test",
        image: "https://example.com/image.jpg",
      };
      const createdProduct = { id: 1, ...newProduct };
      (mockJsonPlaceholderRepository.create as any).mockResolvedValue(
        createdProduct
      );

      const result = await controller.createProduct(newProduct);

      expect(result).toEqual(createdProduct);
      expect(mockJsonPlaceholderRepository.create).toHaveBeenCalledWith(
        newProduct
      );
    });
  });

  describe("updateProduct", () => {
    it("should update a product using repository", async () => {
      const updateData = { title: "Updated Product" };
      const updatedProduct = { id: 1, ...updateData };
      (mockJsonPlaceholderRepository.update as any).mockResolvedValue(
        updatedProduct
      );

      const result = await controller.updateProduct(1, updateData);

      expect(result).toEqual(updatedProduct);
      expect(mockJsonPlaceholderRepository.update).toHaveBeenCalledWith(
        1,
        updateData
      );
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product using repository", async () => {
      (mockJsonPlaceholderRepository.delete as any).mockResolvedValue(
        undefined
      );

      await controller.deleteProduct(1);

      expect(mockJsonPlaceholderRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe("deleteAllProducts", () => {
    it("should delete all products using repository", async () => {
      (mockJsonPlaceholderRepository.deleteAll as any).mockResolvedValue(
        undefined
      );

      await controller.deleteAllProducts();

      expect(mockJsonPlaceholderRepository.deleteAll).toHaveBeenCalled();
    });
  });
});
