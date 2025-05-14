import { productSchema } from "@/business/models/product.schema";
import { describe, expect, it } from "vitest";

describe("Product Schema", () => {
  it("should validate a valid product", () => {
    const validProduct = {
      id: 1,
      title: "Test Product",
      price: 99.99,
      description: "Test Description",
      category: "test",
      image: "https://example.com/image.jpg",
      rating: {
        rate: 4.5,
        count: 100,
      },
    };

    const result = productSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it("should validate a product without rating", () => {
    const productWithoutRating = {
      id: 1,
      title: "Test Product",
      price: 99.99,
      description: "Test Description",
      category: "test",
      image: "https://example.com/image.jpg",
    };

    const result = productSchema.safeParse(productWithoutRating);
    expect(result.success).toBe(true);
  });

  it("should validate a product without id", () => {
    const productWithoutId = {
      title: "Test Product",
      price: 99.99,
      description: "Test Description",
      category: "test",
      image: "https://example.com/image.jpg",
    };

    const result = productSchema.safeParse(productWithoutId);
    expect(result.success).toBe(true);
  });

  it("should reject a product with empty title", () => {
    const invalidProduct = {
      title: "",
      price: 99.99,
      description: "Test Description",
      category: "test",
      image: "https://example.com/image.jpg",
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Title is required");
    }
  });

  it("should reject a product with negative price", () => {
    const invalidProduct = {
      title: "Test Product",
      price: -99.99,
      description: "Test Description",
      category: "test",
      image: "https://example.com/image.jpg",
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Price must be positive");
    }
  });

  it("should reject a product with empty description", () => {
    const invalidProduct = {
      title: "Test Product",
      price: 99.99,
      description: "",
      category: "test",
      image: "https://example.com/image.jpg",
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Description is required");
    }
  });

  it("should reject a product with empty category", () => {
    const invalidProduct = {
      title: "Test Product",
      price: 99.99,
      description: "Test Description",
      category: "",
      image: "https://example.com/image.jpg",
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Category is required");
    }
  });

  it("should reject a product with invalid image URL", () => {
    const invalidProduct = {
      title: "Test Product",
      price: 99.99,
      description: "Test Description",
      category: "test",
      image: "invalid-url",
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Image must be a valid URL");
    }
  });

  it("should reject a product with invalid rating", () => {
    const invalidProduct = {
      title: "Test Product",
      price: 99.99,
      description: "Test Description",
      category: "test",
      image: "https://example.com/image.jpg",
      rating: {
        rate: 6, // Invalid rate (should be 0-5)
        count: -1, // Invalid count (should be non-negative)
      },
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
  });
});
