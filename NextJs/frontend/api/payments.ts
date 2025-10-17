// src/lib/api/payments.ts

import { apiRequest } from "./index";
import type { CreatePaymentBody, Payment } from "@/types";

// ------------------------------------------------------
// 📬 Получить список платежей текущего пользователя
// ------------------------------------------------------
export async function getPayments(): Promise<Payment[]> {
  return apiRequest<Payment[]>("/payments/", {
    method: "GET",
  });
}

// ------------------------------------------------------
// 💳 Создать новый платёж
// ------------------------------------------------------

export async function createPayment(body: CreatePaymentBody): Promise<Payment> {
  return apiRequest<Payment>("/payments/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
