import { ProductFormData } from "@/business/dtos/product.dto";
import type {
  Product,
  ProductRepository,
} from "@/domain/entities/product.entity";
import { ListProductsUseCase } from "@/services/list-products.use-case";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProductController {
  constructor(
    @inject(ListProductsUseCase)
    private readonly listProductsUseCase: ListProductsUseCase,
    @inject("JsonPlaceholderRepository")
    private readonly jsonPlaceholderRepository: ProductRepository
  ) {}

  async listProducts(): Promise<Product[]> {
    try {
      return await this.listProductsUseCase.execute();
    } catch (error) {
      console.error("Error in ProductController:", error);
      throw new Error("Failed to list products");
    }
  }

  async createProduct(data: ProductFormData): Promise<Product> {
    return this.jsonPlaceholderRepository.create(data);
  }

  async updateProduct(
    id: number,
    data: Partial<ProductFormData>
  ): Promise<Product> {
    return this.jsonPlaceholderRepository.update(id, data);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.jsonPlaceholderRepository.delete(id);
  }

  async deleteAllProducts(): Promise<void> {
    return this.jsonPlaceholderRepository.deleteAll();
  }
}
