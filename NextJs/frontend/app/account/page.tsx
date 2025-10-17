"use client";

import AccountLayout from "@/app/account/_components/layout/account";
import AccountForm from "@/app/account/_components/layout/accountForm";
import AccountHeader from "@/app/account/_components/layout/accountHeader";
import AddressSection from "@/app/account/_components/layout/addressSection";
import PreferencesSection from "@/app/account/_components/layout/preferencesSection";
import StatsSection from "@/app/account/_components/layout/statsSection";
import useAccountForm from "@/app/account/_components/useAccountForm";

export default function AccountPage() {
  const { form, update, editing, setEditing, onSave, loading } =
    useAccountForm();

  if (loading || !form) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center h-64 text-gray-500">
          Загрузка данных...
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <AccountHeader
        form={form}
        editing={editing}
        setEditing={setEditing}
        onSave={onSave}
      />
      <AccountForm
        form={{
          username: form.username,
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          gender: form.gender,
          language: form.language,
          currency: form.currency,
        }}
        update={update}
        editing={editing}
      />
      <AddressSection
        form={
          form.addresses && form.addresses.length > 0
            ? {
                country: form.addresses[0].country,
                city: form.addresses[0].city,
                street: form.addresses[0].street,
                house: form.addresses[0].house,
                postal_code: form.addresses[0].postal_code,
                phone: form.addresses[0].phone,
                comment: form.addresses[0].comment,
                default_address: form.addresses[0].default,
              }
            : {
                country: "",
                city: "",
                street: "",
                house: "",
                postal_code: "",
                phone: "",
                comment: "",
                default_address: false,
              }
        }
        update={update}
        editing={editing}
      />{" "}
      <PreferencesSection form={form} update={update} editing={editing} />
      <StatsSection form={form} />
    </AccountLayout>
  );
}
