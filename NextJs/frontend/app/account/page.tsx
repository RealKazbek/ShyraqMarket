"use client";

import { removeFromStorage } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (!access) {
      router.push("/");
    }
  }, [router]);

  function handleLogout() {
    removeFromStorage("access");
    removeFromStorage("refresh");
    removeFromStorage("user");
    window.dispatchEvent(new Event("userLoggedOut"));
    router.push("/");
  }

  return (
    <div onClick={handleLogout} className="px-6 py-10 space-y-8">
      LOGOUT
    </div>
  );
}
