import { ProductRepository } from "@/domain/entities/product.entity";
import { JsonPlaceholderRepository } from "@/infra/repositories/json-placeholder.repository";
import "reflect-metadata";
import { container } from "tsyringe";

container.registerSingleton<ProductRepository>(
  "JsonPlaceholderRepository",
  JsonPlaceholderRepository
);

export { container };
