import { apiRequest } from "./index"; // абсолютный импорт
import type { Address } from "@/types"; // типы берём из глобальных

// ------------------------------------------------------
// 📬 Запросы к API (адреса пользователя)
// ------------------------------------------------------

// Получить список адресов пользователя
export async function getAddresses(): Promise<Address[]> {
  return apiRequest<Address[]>("/addresses/", {
    method: "GET",
  });
}

// Добавить новый адрес
export type CreateAddressBody = Omit<Address, "id">;

export async function createAddress(body: CreateAddressBody): Promise<Address> {
  return apiRequest<Address>("/addresses/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// Обновить адрес по ID
export async function updateAddress(
  id: number,
  body: Partial<CreateAddressBody>
): Promise<Address> {
  return apiRequest<Address>(`/addresses/${id}/`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// Удалить адрес по ID
export async function deleteAddress(id: number): Promise<void> {
  await apiRequest<void>(`/addresses/${id}/`, {
    method: "DELETE",
  });
}
