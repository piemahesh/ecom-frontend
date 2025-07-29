import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import API from "../../services";

// Add this to your existing API service
export const fetchCategories = async () => {
  const response = await API.get("products/categories/");
  return response.data;
};

export type ProductFormValues = {
  id?: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: { id: number; name: string } | number | string;
  image?: FileList | string;
};

type Category = {
  id: number;
  name: string;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  category: z.string().min(1, "Category is required"),
  image: z.any().optional(),
});

type Props = {
  initialData?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
};

export const AdminProductForm: React.FC<Props> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          category:
            typeof initialData.category === "object"
              ? String(initialData.category.id)
              : String(initialData.category),
        }
      : {
          title: "",
          description: "",
          price: 0,
          stock: 0,
          category: "",
        },
  });

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        category:
          typeof initialData.category === "object"
            ? String(initialData.category.id)
            : String(initialData.category),
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register("title")}
          className="mt-1 block w-full border rounded p-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          className="mt-1 block w-full border rounded p-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price")}
          className="mt-1 block w-full border rounded p-2"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Stock</label>
        <input
          type="number"
          {...register("stock")}
          className="mt-1 block w-full border rounded p-2"
        />
        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          {...register("category")}
          defaultValue={""}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="" disabled selected>
            Select category
          </option>
          {categories.map((cat) => (
            <option
              key={cat.id}
              value={String(cat.id)}
              selected={cat.name == initialData?.category?.name || false}
            >
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="mt-1 block w-full border rounded p-2"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      {initialData?.image && typeof initialData.image === "string" && (
        <div className="mt-2">
          <p className="text-xs text-gray-500">Image:</p>
          <img
            src={initialData.image}
            alt="Preview"
            className="w-20 h-20 object-cover rounded mt-1"
          />
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {initialData ? "Update" : "Add"} Product
        </button>
      </div>
    </form>
  );
};
