import { Brand, Category, Product } from "@/types";
import { apiRequest } from "./index";

// ======================================================
// 🛍 ТОВАРЫ
// ======================================================

// Получить список товаров с фильтрацией
export type ProductQuery = {
  category?: number;
  brand?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  ordering?: string;
};

export async function getProducts(
  params: ProductQuery = {}
): Promise<Product[]> {
  const query = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, val]) => {
      if (val !== undefined && val !== null) acc[key] = String(val);
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const url = query ? `/products/?${query}` : "/products/";
  return apiRequest<Product[]>(url, { method: "GET" });
}

// Получить один товар по ID
export async function getProduct(id: number): Promise<Product> {
  return apiRequest<Product>(`/products/${id}/`, { method: "GET" });
}

// Создать товар (только админ)
export async function createProduct(data: Partial<Product>): Promise<Product> {
  return apiRequest<Product>("/products/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Обновить товар
export async function updateProduct(
  id: number,
  data: Partial<Product>
): Promise<Product> {
  return apiRequest<Product>(`/products/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// Удалить товар
export async function deleteProduct(id: number): Promise<void> {
  await apiRequest<void>(`/products/${id}/`, { method: "DELETE" });
}

// ======================================================
// 🏷 КАТЕГОРИИ
// ======================================================
export async function getCategories(): Promise<Category[]> {
  return apiRequest<Category[]>("/categories/", { method: "GET" });
}

// ======================================================
// 🏭 БРЕНДЫ
// ======================================================
export async function getBrands(): Promise<Brand[]> {
  return apiRequest<Brand[]>("/brands/", { method: "GET" });
}
