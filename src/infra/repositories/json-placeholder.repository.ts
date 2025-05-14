import type {
  Product,
  ProductRepository,
} from "@/domain/entities/product.entity";
import { injectable } from "tsyringe";

@injectable()
export class JsonPlaceholderRepository implements ProductRepository {
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async findAll(): Promise<Product[]> {
    try {
      if (!this.baseUrl) {
        throw new Error("API URL is not configured");
      }

      const response = await fetch(`${this.baseUrl}/products`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("Repository error:", error);
      throw error;
    }
  }

  async findById(id: number): Promise<Product | null> {
    const response = await fetch(`${this.baseUrl}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch product");
    }
    return response.json();
  }

  async create(product: Omit<Product, "id">): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/products`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    return response.json();
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    return response.json();
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  }

  async deleteAll(): Promise<void> {
    const products = await this.findAll();
    await Promise.all(products.map((product) => this.delete(product.id)));
  }
}
