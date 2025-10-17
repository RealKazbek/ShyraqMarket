"use client";

import ToggleField from "@/app/account/_components/ui/toggleField";

type PreferencesForm = {
  notifications_enabled: boolean;
  email_subscribed: boolean;
  whatsapp_verified: boolean;
};

// Тип пропсов
type PreferencesSectionProps = {
  form: PreferencesForm;
  update: (
    key: keyof PreferencesForm,
    value: PreferencesForm[keyof PreferencesForm]
  ) => void;
  editing: boolean;
};

export default function PreferencesSection({ form, update, editing }: PreferencesSectionProps) {
  return (
    <section className="space-y-6">
      <h3 className="text-base font-semibold">Preferences</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ToggleField
          id="notif"
          label="Notifications enabled"
          value={form.notifications_enabled}
          onChange={(v: boolean) => update("notifications_enabled", v)}
          disabled={!editing}
        />
        <ToggleField
          id="email_sub"
          label="Email subscribed"
          value={form.email_subscribed}
          onChange={(v: boolean) => update("email_subscribed", v)}
          disabled={!editing}
        />
        <ToggleField
          id="wa_ver"
          label="WhatsApp verified"
          value={form.whatsapp_verified}
          onChange={(v: boolean) => update("whatsapp_verified", v)}
          disabled={!editing}
        />
      </div>
    </section>
  );
}
