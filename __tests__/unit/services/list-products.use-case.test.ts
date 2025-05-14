import type { ProductRepository } from "@/domain/entities/product.entity";
import { ListProductsUseCase } from "@/services/list-products.use-case";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("ListProductsUseCase", () => {
  let useCase: ListProductsUseCase;
  let mockRepository: ProductRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteAll: vi.fn(),
    } as any;

    useCase = new ListProductsUseCase(mockRepository);
  });

  it("should return products from repository", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product 1",
        price: 100,
        description: "Description 1",
        category: "category1",
        image: "image1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        price: 200,
        description: "Description 2",
        category: "category2",
        image: "image2.jpg",
      },
    ];

    (mockRepository.findAll as any).mockResolvedValue(mockProducts);

    const result = await useCase.execute();

    expect(result).toEqual(mockProducts);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should handle repository error and throw custom error", async () => {
    const error = new Error("Repository error");
    (mockRepository.findAll as any).mockRejectedValue(error);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => { });

    await expect(useCase.execute()).rejects.toThrow("Failed to list products");
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error listing products:",
      error
    );

    consoleErrorSpy.mockRestore();
  });
});
