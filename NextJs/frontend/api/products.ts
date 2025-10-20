import { Brand, Category, Product } from "@/types";
import { apiRequest } from "./index";

// ==============================
// Products
// ==============================

export type ProductQuery = {
  category?: number;
  brand?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  ordering?: string;
};

// Get product list with filters
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

// Get product by ID
export async function getProduct(id: number): Promise<Product> {
  return apiRequest<Product>(`/products/${id}/`, { method: "GET" });
}

// Create product (admin only)
export async function createProduct(data: Partial<Product>): Promise<Product> {
  return apiRequest<Product>("/products/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Update product
export async function updateProduct(
  id: number,
  data: Partial<Product>
): Promise<Product> {
  return apiRequest<Product>(`/products/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// Delete product
export async function deleteProduct(id: number): Promise<void> {
  await apiRequest<void>(`/products/${id}/`, { method: "DELETE" });
}

// ==============================
// Categories
// ==============================
export async function getCategories(): Promise<Category[]> {
  return apiRequest<Category[]>("/categories/", { method: "GET" });
}

// ==============================
// Brands
// ==============================
export async function getBrands(): Promise<Brand[]> {
  return apiRequest<Brand[]>("/brands/", { method: "GET" });
}
