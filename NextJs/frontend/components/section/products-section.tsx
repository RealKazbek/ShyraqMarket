import ProductGrid from "@/components/ui/product-grid";
import ProductSectionHeader from "@/components/ui/product-section-header";

const demoProducts = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Глюкометр ${i + 1} — модель ${2025 - i}`,
  price: 12500 + i * 700,
  discount: i % 2 === 0 ? 15 : undefined,
  colors: { from: "from-emerald-200", to: "to-lime-200" },
}));

export default function ProductsSection() {
  return (
    <section className="my-12">
      <ProductSectionHeader title="Глюкометры и аксессуары" link="/products" />
      <ProductGrid products={demoProducts} />
    </section>
  );
}
