import ProductsSection from "@/components/section/products-section";
import PromoBanner from "@/components/ui/promo-banner";

export default function HomePage() {
  return (
    <>
      <PromoBanner />
      <ProductsSection title="Специально для вас" link="/personal" limit={5} />
      <ProductsSection
        title="🔥 Рекламные предложения"
        link="/promo"
        limit={5}
      />
      <ProductsSection
        title="Вас могут заинтересовать"
        showLoadMore
        limit={10} // по 10 товаров за загрузку
        batchSize={20} // максимум 50 за цикл
      />
    </>
  );
}
