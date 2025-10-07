import ProductCard from "../ui/ProductCard";

const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Lorem ipsum ${i + 1}`,
  description: "Описание товара Lorem ipsum dolor sit amet...",
  price: Math.floor(Math.random() * 20000) + 1000,
  oldPrice: Math.floor(Math.random() * 25000) + 1500,
}));

export default function Products() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
