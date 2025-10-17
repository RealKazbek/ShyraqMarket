"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Field from "./Field";

type AccountFormData = {
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: "male" | "female";
  language: "ru" | "kk" | "en";
  currency: "KZT" | "USD";
};

type AccountFormProps = {
  form: AccountFormData;
  update: (key: keyof AccountFormData, value: AccountFormData[keyof AccountFormData]) => void;
  editing: boolean;
};

export default function AccountForm({ form, update, editing }: AccountFormProps) {
  return (
    <section className="space-y-6">
      <h3 className="text-base font-semibold">Profile</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Username">
          <Input
            disabled={!editing}
            value={form.username}
            onChange={(e) => update("username", e.target.value)}
          />
        </Field>
        <Field label="First name">
          <Input
            disabled={!editing}
            value={form.first_name}
            onChange={(e) => update("first_name", e.target.value)}
          />
        </Field>
        <Field label="Last name">
          <Input
            disabled={!editing}
            value={form.last_name}
            onChange={(e) => update("last_name", e.target.value)}
          />
        </Field>
        <Field label="Phone">
          <Input
            disabled={!editing}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
        <Field label="Gender">
          <Select
            disabled={!editing}
            value={form.gender}
            onValueChange={(v) => update("gender", v)}
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
            value={form.language}
            onValueChange={(v) => update("language", v)}
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
            value={form.currency}
            onValueChange={(v) => update("currency", v)}
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
