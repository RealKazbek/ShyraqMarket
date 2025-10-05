import { apiRequest } from "./index";

export type Product = {
  id: number;
  product_id: string;
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
