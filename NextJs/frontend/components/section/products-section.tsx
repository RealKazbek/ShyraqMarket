"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import ProductGrid from "@/components/ui/product-grid";
import ProductSectionHeader from "@/components/ui/product-section-header";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  title: string;
  price: number;
  discount?: number;
  colors?: { from: string; to: string };
}

interface ProductsSectionProps {
  title?: string;
  link?: string;
  limit?: number;
  batchSize?: number;
  showLoadMore?: boolean;
}

export default function ProductsSection({
  title,
  link,
  limit = 10,
  batchSize = 50,
  showLoadMore = false,
}: ProductsSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Generate demo products
  const generateDemoProducts = (count: number, startId: number) =>
    Array.from({ length: count }).map((_, i) => ({
      id: startId + i,
      title: `Glucometer ${startId + i} — model ${2025 - i}`,
      price: 12500 + (startId + i) * 150,
      discount: (startId + i) % 2 === 0 ? 15 : undefined,
      colors: {
        from: ["from-emerald-200", "from-sky-200", "from-rose-200"][i % 3],
        to: ["to-lime-200", "to-indigo-200", "to-orange-200"][i % 3],
      },
    }));

  // Load products
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);

    setTimeout(() => {
      const startId = products.length + 1;
      const remaining = showLoadMore
        ? batchSize - loadedCount
        : limit - products.length;
      const count = Math.min(limit, remaining);

      if (count <= 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const newProducts = generateDemoProducts(count, startId);
      setProducts((prev) => [...prev, ...newProducts]);
      setLoadedCount((prev) => prev + count);
      setLoading(false);

      if (!showLoadMore || loadedCount + count >= batchSize) {
        setHasMore(false);
      }
    }, 400);
  }, [
    loading,
    hasMore,
    batchSize,
    loadedCount,
    limit,
    showLoadMore,
    products.length,
  ]);

  // Initial load
  useEffect(() => {
    loadMore();
  }, [loadMore]);

  // Infinite scroll
  useEffect(() => {
    if (!showLoadMore || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) loadMore();
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [showLoadMore, hasMore, loading, loadMore]);

  // Manual reload button
  const handleLoadMoreClick = () => {
    setHasMore(true);
    setLoadedCount(0);
  };

  return (
    <section className="my-12">
      {title && <ProductSectionHeader title={title} link={link} />}
      <ProductGrid products={products} />
      {showLoadMore && hasMore && <div ref={observerRef} className="h-8" />}
      {!hasMore && showLoadMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMoreClick}>Show more products</Button>
        </div>
      )}
      {loading && <p className="text-center text-gray-500 mt-6">Loading...</p>}
    </section>
  );
}
