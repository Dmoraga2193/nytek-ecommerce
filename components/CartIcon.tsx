"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function CartIcon() {
  const { totalItems } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <Button variant="ghost" size="icon" className="relative" asChild>
        <Link href="/login">
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">Iniciar sesión para ver el carrito</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {totalItems}
          </span>
        )}
        <span className="sr-only">Carrito de compras</span>
      </Link>
    </Button>
  );
}
