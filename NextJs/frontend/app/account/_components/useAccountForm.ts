"use client";

import { useEffect, useState } from "react";
import { getFullUser } from "@/api/auth";
import type { FullUser, Address, Payment } from "@/types";

export default function useAccountForm() {
  const [form, setForm] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getFullUser(); // { user, addresses, payments }

        const user = {
          ...data.user,
          addresses: data.user.addresses?.length
            ? data.user.addresses
            : data.addresses ?? [],
          payments: data.user.payments?.length
            ? data.user.payments
            : data.payments ?? [],
        };

        setForm(user);
      } catch (error) {
        console.error("Ошибка при загрузке пользователя:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const update = <K extends keyof FullUser>(key: K, value: FullUser[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const onSave = async () => {
    // TODO: PATCH /auth/update/
    setEditing(false);
  };

  // безопасная форма по умолчанию, чтобы не было ошибок при null
  const safeForm: FullUser = form ?? {
    id: 0,
    username: "",
    phone: "",
    role: "USER",
    avatar: null,
    first_name: "",
    last_name: "",
    email: "",
    gender: "male",
    language: "ru",
    currency: "KZT",
    country: "",
    city: "",
    street: "",
    house: "",
    postal_code: "",
    order_count: 0,
    wishlist_count: 0,
    total_spent: 0,
    cashback: 0,
    notifications_enabled: true,
    email_subscribed: false,
    whatsapp_verified: false,
    addresses: [] as Address[],
    payments: [] as Payment[],
  };

  return {
    form: safeForm,
    loading,
    editing,
    setEditing,
    update,
    onSave,
  };
}
