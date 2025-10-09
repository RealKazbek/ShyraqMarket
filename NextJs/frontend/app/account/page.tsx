"use client";

import { removeFromStorage } from "@/lib/storage";

export default function AccountPage() {
  function handleLogout() {
    removeFromStorage("access");
    removeFromStorage("refresh");
    removeFromStorage("user");
    window.dispatchEvent(new Event("userLoggedOut"));
  }

  return (
    <div onClick={handleLogout} className="px-6 py-10 space-y-8">
      LOGOUT
    </div>
  );
}
