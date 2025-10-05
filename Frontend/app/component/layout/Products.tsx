// components/Products.tsx
import React from "react";
import ProductCard from "../ui/ProductCard";

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  link: string;
};

type ProductsProps = {
  products: Product[];
};

export default function Products({ products }: ProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          title={p.title}
          price={p.price}
          image={p.image}
          link={p.link}
        />
      ))}
    </div>
  );
}
