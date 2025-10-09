import { apiRequest } from "./index";

export type Product = {
  id: number;          // это pk в БД (int)
  product_id: string;  // это UUID
  title: string;
  price: string;
  link: string;
  image: string;
};

export async function getProducts(): Promise<Product[]> {
  return apiRequest<Product[]>("/api/products/", {
    method: "GET",
  });
}
