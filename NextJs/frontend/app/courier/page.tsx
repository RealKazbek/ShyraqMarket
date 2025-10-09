"use client";

import { getMe } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          router.push("/");
          return;
        }

        const me = await getMe(token);

        if (me.role !== "ADMIN" && me.role !== "COURIER") {
          router.push("/");
        }
      } catch (error) {
        console.error("Ошибка при проверке роли:", error);
        router.push("/");
      }
    }
    checkAdmin();
  }, [router]);

  return <>Курьер!</>;
}
