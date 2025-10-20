"use client";

import AccountLayout from "@/app/account/_components/layout/account";
import AccountForm from "@/app/account/_components/layout/accountForm";
import AccountHeader from "@/app/account/_components/layout/accountHeader";
import AddressSection from "@/app/account/_components/layout/addressSection";
import PreferencesSection from "@/app/account/_components/layout/preferencesSection";
import StatsSection from "@/app/account/_components/layout/statsSection";
import useAccountForm from "@/app/account/_components/useAccountForm";
import { Card, CardContent } from "@/components/ui/card";

export default function AccountPage() {
  const { form, loading } = useAccountForm();

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
      <Card>
        <CardContent>
          <AccountHeader
            form={{
              first_name: form.user.first_name,
              last_name: form.user.last_name,
              avatar: form.user.avatar,
              role: form.user.role,
              is_active: form.user.is_active,
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <AccountForm
            form={{
              first_name: form.user.first_name,
              last_name: form.user.last_name,
              phone: form.user.phone,
              email: form.user.email,
              birth_date: form.user.birth_date,
              gender: form.user.gender,
              language: form.user.language,
              currency: form.user.currency,
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <AddressSection form={form.addresses} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <PreferencesSection
            form={{
              notifications_enabled: form.user.notifications_enabled,
              email_subscribed: form.user.email_subscribed,
              whatsapp_verified: form.user.whatsapp_verified,
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <StatsSection
            form={{
              order_count: form.user.order_count,
              wishlist_count: form.user.wishlist_count,
              total_spent: form.user.total_spent,
              cashback: form.user.cashback,
              currency: form.user.currency,
            }}
          />
        </CardContent>
      </Card>
    </AccountLayout>
  );
}
