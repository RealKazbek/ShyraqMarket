"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Field from "./Field";

// Тип данных адреса (совпадает с backend UserAddressSerializer)
type AddressForm = {
  country: string;
  city: string;
  street: string;
  house: string;
  postal_code?: string;
  phone: string;
  comment?: string;
  default_address: boolean;
};

// Тип пропсов
type AddressSectionProps = {
  form: AddressForm;
  update: (
    key: keyof AddressForm,
    value: AddressForm[keyof AddressForm]
  ) => void;
  editing: boolean;
};

export default function AddressSection({
  form,
  update,
  editing,
}: AddressSectionProps) {
  return (
    <section className="space-y-6">
      <h3 className="text-base font-semibold">Address</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Country (locked)">
          <Input disabled value={form.country} />
        </Field>
        <Field label="City">
          <Input
            disabled={!editing}
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
          />
        </Field>
        <Field label="Street">
          <Input
            disabled={!editing}
            value={form.street}
            onChange={(e) => update("street", e.target.value)}
          />
        </Field>
        <Field label="House">
          <Input
            disabled={!editing}
            value={form.house}
            onChange={(e) => update("house", e.target.value)}
          />
        </Field>
        <Field label="Postal code">
          <Input
            disabled={!editing}
            value={form.postal_code}
            onChange={(e) => update("postal_code", e.target.value)}
          />
        </Field>
        <Field label="Phone">
          <Input
            disabled={!editing}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
        <Field label="Comment">
          <Textarea
            disabled={!editing}
            rows={3}
            value={form.comment || ""}
            onChange={(e) => update("comment", e.target.value)}
          />
        </Field>
        <div className="flex items-center gap-3">
          <Switch
            id="default_address"
            checked={form.default_address}
            disabled={!editing}
            onCheckedChange={(v) => update("default_address", v)}
          />
          <Label htmlFor="default_address">Default address</Label>
        </div>
      </div>
    </section>
  );
}
