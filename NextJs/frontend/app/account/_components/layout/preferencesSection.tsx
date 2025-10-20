"use client";

import { useState } from "react";
import ToggleField from "@/app/account/_components/ui/toggleField";
import type { PreferencesForm } from "@/types";
import { Button } from "@/components/ui/button";

type PreferencesSectionProps = {
  form: PreferencesForm;
};

export default function PreferencesSection({ form }: PreferencesSectionProps) {
  const [editing, setEditing] = useState(false);
  const [preferences, setPreferences] = useState(form);

  const handleChange = <K extends keyof PreferencesForm>(
    key: K,
    value: PreferencesForm[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Пустышка (mock)
    console.log("Saving preferences (mock):", preferences);
    setEditing(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Preferences</h3>

        {!editing ? (
          <Button
            onClick={() => setEditing(true)}
            className="px-3 py-1 text-sm rounded-md border"
          >
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-md"
            >
              Save
            </Button>
            <Button
              onClick={() => setEditing(false)}
              className="px-3 py-1 text-sm border rounded-md"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ToggleField
          id="notif"
          label="Notifications enabled"
          value={preferences.notifications_enabled}
          onChange={(v: boolean) => handleChange("notifications_enabled", v)}
          disabled={!editing}
        />
        <ToggleField
          id="email_sub"
          label="Email subscribed"
          value={preferences.email_subscribed}
          onChange={(v: boolean) => handleChange("email_subscribed", v)}
          disabled={!editing}
        />
        <ToggleField
          id="wa_ver"
          label="WhatsApp verified"
          value={preferences.whatsapp_verified}
          onChange={(v: boolean) => handleChange("whatsapp_verified", v)}
          disabled={!editing}
        />
      </div>
    </section>
  );
}
