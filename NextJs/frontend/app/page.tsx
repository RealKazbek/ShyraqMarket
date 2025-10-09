import Products from "@/components/layout/products"

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">🔥 Топ товары (плейсхолдеры)</h2>
      <Products />
    </main>
  )
}