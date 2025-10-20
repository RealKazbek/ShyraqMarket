import ProductsSection from "@/components/section/products-section";
import PromoBanner from "@/components/ui/promo-banner";

export default function HomePage() {
  return (
    <>
      <PromoBanner />
      <ProductsSection title="Special for you" link="/personal" limit={5} />
      <ProductsSection title="🔥 Promotional offers" link="/promo" limit={5} />
      <ProductsSection
        title="You may also like"
        showLoadMore
        limit={10}
        batchSize={20}
      />
    </>
  );
}
