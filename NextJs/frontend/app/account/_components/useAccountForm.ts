"use client";

import { useEffect, useState } from "react";
import { getFullUser } from "@/api/auth";
import type { FullUser } from "@/types";

export default function useAccountForm() {
  const [form, setForm] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data: FullUser = await getFullUser();
        setForm({
          user: data.user,
          addresses: data.addresses ?? [],
          payments: data.payments ?? [],
        });
      } catch (error) {
        console.error("Ошибка при загрузке пользователя:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { form, loading };
}
