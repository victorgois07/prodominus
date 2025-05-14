import { z } from "zod";

export const productFormSchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter no mínimo 3 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres")
    .trim(),
  price: z.coerce
    .number()
    .positive("Preço deve ser positivo")
    .min(0.01, "Preço mínimo é R$ 0,01")
    .max(999999.99, "Preço máximo é R$ 999.999,99"),
  description: z
    .string()
    .min(10, "Descrição deve ter no mínimo 10 caracteres")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres")
    .trim(),
  category: z
    .string()
    .min(2, "Categoria deve ter no mínimo 2 caracteres")
    .max(50, "Categoria deve ter no máximo 50 caracteres")
    .trim(),
  image: z
    .string()
    .url("URL da imagem inválida")
    .refine(
      (url) => {
        try {
          const urlObj = new URL(url);
          return urlObj.protocol === "http:" || urlObj.protocol === "https:";
        } catch {
          return false;
        }
      },
      { message: "URL da imagem deve começar com http:// ou https://" }
    )
    .refine(
      (url) => {
        const imageExtensions = [
          ".jpg",
          ".jpeg",
          ".png",
          ".gif",
          ".webp",
          ".svg",
        ];
        return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
      },
      {
        message:
          "URL deve terminar com uma extensão de imagem válida (.jpg, .jpeg, .png, .gif, .webp, .svg)",
      }
    ),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
