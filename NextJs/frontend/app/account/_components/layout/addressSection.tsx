"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Field from "./Field";
import type { Address } from "@/types";

type AddressSectionProps = {
  form: Address[];
};

export default function AddressSection({ form }: AddressSectionProps) {
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(form);

  const mainAddress = addresses.find((a) => a.default) ?? addresses[0];

  const handleChange = <K extends keyof Address>(key: K, value: Address[K]) => {
    setAddresses((prev) =>
      prev.map((addr, i) => (i === 0 ? { ...addr, [key]: value } : addr))
    );
  };

  const handleSave = () => {
    console.log("Saving address (mock):", addresses[0]);
    setEditing(false);
  };

  // ---- Добавление нового адреса ----
  const [newAddress, setNewAddress] = useState<Address>({
    country: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
    postal_code: "",
    phone: "",
    default: false,
    comment: "",
    created_at: new Date().toISOString(),
  });

  const handleNewAddressChange = <K extends keyof Address>(
    key: K,
    value: Address[K]
  ) => {
    setNewAddress((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddAddress = () => {
    setAddresses((prev) => [...prev, newAddress]);
    setAddOpen(false);
    console.log("New address added (mock):", newAddress);
  };

  return (
    <section className="space-y-6">
      {/* Заголовок и кнопки */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Address</h3>
        <div className="flex gap-2">
          {!editing ? (
            <>
              {/* Просмотр всех */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Show all
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>All Addresses</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    {addresses.length === 0 && (
                      <p className="text-sm text-gray-500">
                        No addresses found
                      </p>
                    )}
                    {addresses.map((addr, i) => (
                      <div
                        key={i}
                        className="border rounded-md p-4 bg-gray-50 space-y-1"
                      >
                        <p>
                          <strong>Country:</strong> {addr.country}
                        </p>
                        <p>
                          <strong>City:</strong> {addr.city}
                        </p>
                        <p>
                          <strong>Street:</strong> {addr.street} {addr.house}
                        </p>
                        {addr.apartment && (
                          <p>
                            <strong>Apartment:</strong> {addr.apartment}
                          </p>
                        )}
                        {addr.postal_code && (
                          <p>
                            <strong>Postal code:</strong> {addr.postal_code}
                          </p>
                        )}
                        <p>
                          <strong>Phone:</strong> {addr.phone}
                        </p>
                        {addr.comment && (
                          <p>
                            <strong>Comment:</strong> {addr.comment}
                          </p>
                        )}
                        <p>
                          <strong>Created at:</strong>{" "}
                          {new Date(addr.created_at).toLocaleDateString()}
                        </p>
                        {addr.default && (
                          <span className="text-sm text-emerald-600 font-medium">
                            Default address
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Кнопка Add */}
              <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg space-y-4">
                  <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4">
                    <Field label="Country">
                      <Input
                        value={newAddress.country}
                        onChange={(e) =>
                          handleNewAddressChange("country", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="City">
                      <Input
                        value={newAddress.city}
                        onChange={(e) =>
                          handleNewAddressChange("city", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Street">
                      <Input
                        value={newAddress.street}
                        onChange={(e) =>
                          handleNewAddressChange("street", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="House">
                      <Input
                        value={newAddress.house}
                        onChange={(e) =>
                          handleNewAddressChange("house", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Apartment">
                      <Input
                        value={newAddress.apartment ?? ""}
                        onChange={(e) =>
                          handleNewAddressChange("apartment", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Postal Code">
                      <Input
                        value={newAddress.postal_code ?? ""}
                        onChange={(e) =>
                          handleNewAddressChange("postal_code", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Phone">
                      <Input
                        value={newAddress.phone}
                        onChange={(e) =>
                          handleNewAddressChange("phone", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Comment">
                      <Textarea
                        rows={3}
                        value={newAddress.comment ?? ""}
                        onChange={(e) =>
                          handleNewAddressChange("comment", e.target.value)
                        }
                      />
                    </Field>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="default_addr"
                        checked={newAddress.default}
                        onCheckedChange={(v) =>
                          handleNewAddressChange("default", v)
                        }
                      />
                      <Label htmlFor="default_addr">Default address</Label>
                    </div>
                  </div>

                  <Button onClick={handleAddAddress} className="w-full">
                    Add Address
                  </Button>
                </DialogContent>
              </Dialog>

              <Button onClick={() => setEditing(true)} size="sm">
                Edit
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Основной адрес */}
      {mainAddress ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Country">
            <Input
              disabled={!editing}
              value={mainAddress.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </Field>
          <Field label="City">
            <Input
              disabled={!editing}
              value={mainAddress.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </Field>
          <Field label="Street">
            <Input
              disabled={!editing}
              value={mainAddress.street}
              onChange={(e) => handleChange("street", e.target.value)}
            />
          </Field>
          <Field label="House">
            <Input
              disabled={!editing}
              value={mainAddress.house}
              onChange={(e) => handleChange("house", e.target.value)}
            />
          </Field>
          <Field label="Apartment">
            <Input
              disabled={!editing}
              value={mainAddress.apartment ?? ""}
              onChange={(e) => handleChange("apartment", e.target.value)}
            />
          </Field>
          <Field label="Postal code">
            <Input
              disabled={!editing}
              value={mainAddress.postal_code ?? ""}
              onChange={(e) => handleChange("postal_code", e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <Input
              disabled={!editing}
              value={mainAddress.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Field>
          <Field label="Comment">
            <Textarea
              disabled={!editing}
              rows={3}
              value={mainAddress.comment ?? ""}
              onChange={(e) => handleChange("comment", e.target.value)}
            />
          </Field>
          <div className="flex items-center gap-3">
            <Switch id="default" checked={mainAddress.default} disabled />
            <Label htmlFor="default">Default address</Label>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No default address</p>
      )}
    </section>
  );
}
