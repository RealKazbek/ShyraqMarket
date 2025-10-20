"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Field from "./Field";
import { AccountFormData } from "@/types";

type AccountFormProps = {
  form: AccountFormData;
};

export default function AccountForm({ form }: AccountFormProps) {
  const [editing, setEditing] = useState(false);
  const [localForm, setLocalForm] = useState(form);

  const handleChange = <K extends keyof AccountFormData>(
    key: K,
    value: AccountFormData[K]
  ) => {
    setLocalForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Пустышка — можно позже подключить API-запрос
    console.log("Saving data (mock):", localForm);
    setEditing(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Profile</h3>

        {!editing ? (
          <Button onClick={() => setEditing(true)} size="sm">
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="First name">
          <Input
            disabled={!editing}
            value={localForm.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
        </Field>
        <Field label="Last name">
          <Input
            disabled={!editing}
            value={localForm.last_name ?? "Не указан"}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
        </Field>
        <Field label="Phone">
          <Input
            disabled={!editing}
            value={localForm.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Field>
        <Field label="Email">
          <Input
            disabled={!editing}
            value={localForm.email ?? "Не указан"}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Field>
        <Field label="Birth Date">
          <Input
            disabled={!editing}
            value={localForm.birth_date ?? "Не указан"}
            onChange={(e) => handleChange("birth_date", e.target.value)}
          />
        </Field>
        <Field label="Gender">
          <Select
            disabled={!editing}
            value={localForm.gender ?? "Не указан"}
            onValueChange={(v) => handleChange("gender", v as "male" | "female" | null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Language">
          <Select
            disabled={!editing}
            value={localForm.language}
            onValueChange={(v) => handleChange("language", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ru">Russian</SelectItem>
              <SelectItem value="kk">Kazakh</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Currency">
          <Select
            disabled={!editing}
            value={localForm.currency}
            onValueChange={(v) => handleChange("currency", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KZT">KZT</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </section>
  );
}
