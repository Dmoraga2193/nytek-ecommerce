"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface ProductInfoProps {
  product: {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    precio_original: number;
    marca: { nombre: string };
    categoria: { nombre: string };
    modelo: string;
    imagenes: string[];
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.nombre,
      price: product.precio,
      quantity: quantity,
      image: product.imagenes?.[0] || "/placeholder.svg", // Use first image from array or fallback
    });
    toast.success("Producto añadido al carrito");
  };

  const discount = Math.round(
    ((product.precio_original - product.precio) / product.precio_original) * 100
  );

  return (
    <div className="flex flex-col space-y-4 w-full px-4 sm:px-0">
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight break-words">
          {product.nombre}
        </h1>
        <div className="flex flex-wrap gap-1 text-sm text-muted-foreground">
          <span>{product.marca.nombre}</span>
          <span>•</span>
          <span>{product.categoria.nombre}</span>
          <span>•</span>
          <span>{product.modelo}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-2xl sm:text-3xl font-bold">
          {formatPrice(product.precio)}
        </span>
        {product.precio_original > product.precio && (
          <>
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(product.precio_original)}
            </span>
            <span className="text-sm font-semibold text-white bg-red-500 px-2 py-0.5 rounded-full">
              {discount}% de descuento
            </span>
          </>
        )}
      </div>

      <div className="w-full">
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal">
          {product.descripcion}
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full pt-2">
        <div className="flex items-center justify-center sm:justify-start bg-muted/10 p-2 rounded-lg">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-8 w-8"
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-16 h-8 text-center mx-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="h-8 w-8"
          >
            +
          </Button>
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full py-6 text-base"
          size="lg"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
}
