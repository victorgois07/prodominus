import type {
  Product,
  ProductRepository,
} from "@/domain/entities/product.entity";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject("JsonPlaceholderRepository")
    private readonly jsonPlaceholderRepository: ProductRepository
  ) {}

  async execute(): Promise<Product[]> {
    try {
      const jsonPlaceholderProducts =
        await this.jsonPlaceholderRepository.findAll();

      return jsonPlaceholderProducts;
    } catch (error) {
      console.error("Error listing products:", error);
      throw new Error("Failed to list products");
    }
  }
}
