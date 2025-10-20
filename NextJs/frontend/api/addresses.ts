import { apiRequest } from "./index";
import type { Address } from "@/types";

// ==============================
// User addresses
// ==============================

// Get all user addresses
export async function getAddresses(): Promise<Address[]> {
  return apiRequest<Address[]>("/addresses/", { method: "GET" });
}

// Create new address
export type CreateAddressBody = Omit<Address, "id">;

export async function createAddress(body: CreateAddressBody): Promise<Address> {
  return apiRequest<Address>("/addresses/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// Update address by ID
export async function updateAddress(
  id: number,
  body: Partial<CreateAddressBody>
): Promise<Address> {
  return apiRequest<Address>(`/addresses/${id}/`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// Delete address by ID
export async function deleteAddress(id: number): Promise<void> {
  await apiRequest<void>(`/addresses/${id}/`, { method: "DELETE" });
}
