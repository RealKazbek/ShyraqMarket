// src/lib/api/payments.ts
import { apiRequest } from "./index";
import type { CreatePaymentBody, Payment } from "@/types";

// Get user payments
export async function getPayments(): Promise<Payment[]> {
  return apiRequest<Payment[]>("/payments/", { method: "GET" });
}

// Create new payment
export async function createPayment(body: CreatePaymentBody): Promise<Payment> {
  return apiRequest<Payment>("/payments/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
