"use client";

import CartList from "@/components/layout/cart/cart-list";
import CartSummary from "@/components/layout/cart/cart-summary";
import CheckoutSections from "@/components/layout/cart/checkout-sections";
import ProductsSection from "@/components/section/products-section";

export default function CartPage() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        <section className="flex-1 min-w-0 space-y-8">
          <CartList />
          <CheckoutSections />
        </section>

        <aside className="lg:w-[360px] w-full">
          <CartSummary />
        </aside>
      </div>
      <ProductsSection
        title="🔥 Рекламные предложения"
        link="/promo"
        limit={5}
      />
    </>
  );
}
