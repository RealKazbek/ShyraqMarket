import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Product = {
  id: number
  title: string
  description: string
  price: number
  oldPrice: number
}

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)

  return (
    <Card className="hover:shadow-lg transition">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
        IMG
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">{product.price} ₸</span>
          <span className="line-through text-gray-400 text-sm">{product.oldPrice} ₸</span>
          <span className="text-red-500 text-sm">-{discount}%</span>
        </div>
      </CardContent>
    </Card>
  )
}
