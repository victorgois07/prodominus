import { z } from "zod";

export const productSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Image must be a valid URL"),
  rating: z
    .object({
      rate: z.number().min(0).max(5),
      count: z.number().int().nonnegative(),
    })
    .optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
