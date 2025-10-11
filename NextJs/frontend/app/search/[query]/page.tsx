"use client";

import ProductsSection from "@/components/section/products-section";
import { useParams } from "next/navigation";

function formatSearchQuery(slug: string) {
  return slug
    .replace(/^search\//, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function SearchPage() {
  const params = useParams<{ query: string }>();
  const querySlug = decodeURIComponent(params.query);
  const queryName = formatSearchQuery(querySlug);

  return (
    <ProductsSection
      title={`"${queryName}"`}
      showLoadMore
      limit={20}
      batchSize={40}
    />
  );
}
