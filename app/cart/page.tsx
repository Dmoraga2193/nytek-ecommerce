"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingBag, ArrowLeft, MinusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 mt-[120px] min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-3">
            Inicia sesión para ver tu carrito
          </h1>
          <p className="text-muted-foreground mb-8">
            Necesitas iniciar sesión para ver y gestionar tu carrito de compras.
          </p>
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto px-8">
              Iniciar sesión
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 mt-[120px] min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-8">
            ¡Agrega algunos productos para comenzar tu compra!
          </p>
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto px-8">
              Explorar productos
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-[120px]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Seguir comprando
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold">Tu Carrito</h1>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShoppingBag className="h-5 w-5" />
            <span>{totalItems} productos</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="divide-y divide-border">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-6 p-6"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-xl overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                      sizes="(max-width: 768px) 100px, 200px"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h2 className="font-medium text-lg mb-1 line-clamp-2">
                          {item.name}
                        </h2>
                        <p className="text-primary font-semibold">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-50"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex items-center bg-muted rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="h-8 w-8"
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-14 h-8 text-center border-0 bg-transparent"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8"
                        >
                          +
                        </Button>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Total: {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Card>

            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-muted-foreground hover:text-red-500"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Vaciar carrito
            </Button>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-32">
              <h2 className="text-xl font-semibold mb-6">Resumen del pedido</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Envío</span>
                  <span className="text-sm font-medium text-green-600">
                    Gratis
                  </span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold">
                        {formatPrice(totalPrice)}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        IVA incluido, envío gratis
                      </p>
                    </div>
                  </div>
                  <Link href="/checkout" className="block">
                    <Button className="w-full" size="lg">
                      Proceder al pago
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Pago seguro con cifrado SSL
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
