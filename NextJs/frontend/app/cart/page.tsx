import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CartPage() {
  return (
    <div className="px-6 py-10 grid grid-cols-1 items-start md:grid-cols-3 gap-8">
      {/* Cart items */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 object-cover rounded">Fifa</div>
                  <div>
                    <p className="font-medium">Fifa 19</p>
                    <button className="text-sm text-red-500">Remove</button>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm">-</Button>
                  <span>2</span>
                  <Button size="sm">+</Button>
                </div>
              </TableCell>
              <TableCell>£44.00</TableCell>
              <TableCell>£88.00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 object-cover rounded">PS4</div>
                  <div>
                    <p className="font-medium">Glacier White 500GB</p>
                    <button className="text-sm text-red-500">Remove</button>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm">-</Button>
                  <span>1</span>
                  <Button size="sm">+</Button>
                </div>
              </TableCell>
              <TableCell>£249.99</TableCell>
              <TableCell>£249.99</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Order summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Items (3)</span>
            <span>£457.98</span>
          </div>
          <div>
            <span className="block mb-1">Shipping</span>
            <Select defaultValue="standard">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">
                  Standard Delivery – £5.00
                </SelectItem>
                <SelectItem value="express">
                  Express Delivery – £15.00
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <span className="block mb-1">Promo Code</span>
            <div className="flex gap-2">
              <Input placeholder="Enter your code" />
              <Button>Apply</Button>
            </div>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>£462.98</span>
          </div>
          <Button className="w-full">Checkout</Button>
        </CardContent>
      </Card>
    </div>
  );
}
