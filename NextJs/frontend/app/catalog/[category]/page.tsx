"use client";

import ProductsSection from "@/components/section/products-section";
import { useParams } from "next/navigation";

function formatCategoryName(slug: string) {
  return slug
    .replace(/^catalog\//, "") // ✅ убирает "catalog/" если случайно есть
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CatalogPage() {
  const params = useParams<{ category: string }>();
  const categorySlug = decodeURIComponent(params.category);
  const categoryName = formatCategoryName(categorySlug);

  return (
    <ProductsSection
      title={categoryName}
      showLoadMore
      limit={20}
      batchSize={40}
    />
  );
}
