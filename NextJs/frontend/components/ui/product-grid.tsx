import ProductCard from "./product-card";

interface Product {
  id: number;
  title: string;
  price: number;
  discount?: number;
  tags?: string[];
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div
      className="
        grid 
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-3 sm:gap-4 md:gap-6
        w-full
      "
    >
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
