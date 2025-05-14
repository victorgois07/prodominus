"use client";

import {
  ProductFormData,
  productFormSchema,
} from "@/business/dtos/product.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Input } from "../../atoms";
import { FormField } from "../../molecules";

interface ProductFormProps {
  initialValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  loading?: boolean;
  submitLabel?: string;
}

export function ProductForm({
  initialValues = {},
  onSubmit,
  loading,
  submitLabel = "Salvar",
}: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    initialValues.image
  );
  const [imageError, setImageError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isDirty, isValid },
    control,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues as ProductFormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (initialValues.image) {
      validateImage(initialValues.image);
    }
  }, [initialValues.image]);

  const validateImage = (url: string) => {
    setImageError(undefined);
    if (!url) {
      setImagePreview(undefined);
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      setImagePreview(url);
      setImageError(undefined);
    };
    img.onerror = () => {
      setImageError("Não foi possível carregar a imagem");
      setImagePreview(undefined);
    };
    img.src = url;
  };

  const onSubmitForm = (data: ProductFormData) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-4 max-w-md mx-auto"
    >
      <FormField
        label="Título"
        htmlFor="title"
        error={formErrors.title?.message}
      >
        <Input
          id="title"
          {...register("title")}
          disabled={loading}
          placeholder="Digite o título do produto"
          aria-invalid={!!formErrors.title}
        />
      </FormField>
      <FormField
        label="Preço"
        htmlFor="price"
        error={formErrors.price?.message}
      >
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <NumericFormat
              id="price"
              customInput={Input}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              value={field.value}
              onValueChange={(values) => {
                field.onChange(values.floatValue || 0);
              }}
              disabled={loading}
              placeholder="R$ 0,00"
              aria-invalid={!!formErrors.price}
            />
          )}
        />
      </FormField>
      <FormField
        label="Descrição"
        htmlFor="description"
        error={formErrors.description?.message}
      >
        <textarea
          id="description"
          className="w-full border rounded p-2 min-h-[100px] resize-y"
          {...register("description")}
          disabled={loading}
          placeholder="Digite a descrição do produto"
          aria-invalid={!!formErrors.description}
        />
      </FormField>
      <FormField
        label="Categoria"
        htmlFor="category"
        error={formErrors.category?.message}
      >
        <Input
          id="category"
          {...register("category")}
          disabled={loading}
          placeholder="Digite a categoria do produto"
          aria-invalid={!!formErrors.category}
        />
      </FormField>
      <FormField
        label="URL da Imagem"
        htmlFor="image"
        error={formErrors.image?.message || imageError}
      >
        <div className="space-y-2">
          <Input
            id="image"
            {...register("image", {
              onChange: (e) => {
                const url = e.target.value;
                if (url) {
                  validateImage(url);
                } else {
                  setImagePreview(undefined);
                  setImageError(undefined);
                }
              },
            })}
            disabled={loading}
            placeholder="https://exemplo.com/imagem.jpg"
            aria-invalid={!!formErrors.image || !!imageError}
          />
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                width={300}
                height={160}
                className="max-w-full h-40 object-contain rounded border"
                onError={() => {
                  setImageError("Erro ao carregar a imagem");
                  setImagePreview(undefined);
                }}
              />
            </div>
          )}
        </div>
      </FormField>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded font-semibold disabled:opacity-50 hover:bg-green-700 transition-colors"
        disabled={loading || !isDirty || !isValid}
      >
        {loading ? "Salvando..." : submitLabel}
      </button>
    </form>
  );
}
