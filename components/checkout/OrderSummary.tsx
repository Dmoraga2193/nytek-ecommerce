import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderSummaryProps {
  cart: CartItem[];
  totalPrice: number;
}

export function OrderSummary({ cart, totalPrice }: OrderSummaryProps) {
  return (
    <Card className="border-0 shadow-lg bg-white overflow-hidden">
      <CardHeader className="border-b px-6 py-4 bg-white">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Resumen del Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6 py-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 py-4 first:pt-0"
            >
              <div className="relative h-20 w-20 rounded-lg border border-gray-100 overflow-hidden bg-white flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 leading-5">
                  {item.name}
                </h4>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <span>Cantidad: {item.quantity}</span>
                </div>
                <div className="mt-1">
                  <span className="text-sm font-medium text-blue-600">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 space-y-4 bg-gray-50">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Envío</span>
              <span className="text-sm font-medium text-green-600">Gratis</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-gray-900">Total</span>
            <span className="text-xl font-semibold text-blue-600">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <div className="pt-2 text-xs text-gray-500 text-right">
            Impuestos incluidos
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
