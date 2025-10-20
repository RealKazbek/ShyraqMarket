"use client";
import Stat from "@/app/account/_components/ui/stat";
import { StatsForm } from "@/types";

type StatsSectionProps = {
  form: StatsForm;
};

export default function StatsSection({ form }: StatsSectionProps) {
  const totalSpent = form?.total_spent ?? 0;
  const cashback = form?.cashback ?? 0;
  const currency = form?.currency ?? "KZT";

  return (
    <section className="space-y-6">
      <h3 className="text-base font-semibold">Account stats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Orders" value={form?.order_count ?? 0} />
        <Stat label="Wishlist" value={form?.wishlist_count ?? 0} />
        <Stat
          label="Total spent"
          value={`${totalSpent.toLocaleString()} ${currency}`}
        />
        <Stat
          label="Cashback"
          value={`${cashback.toLocaleString()} ${currency}`}
        />
      </div>
    </section>
  );
}
