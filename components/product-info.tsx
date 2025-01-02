"use client";

import { useState } from "react";
import { Heart, Minus, Plus, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface ProductInfoProps {
  product: {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    precio_original: number;
    cantidad_stock: number;
    calificacion: number;
    cantidad_resenas: number;
    marca: {
      nombre: string;
    };
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast.success("Producto agregado al carrito");
  };

  const handleAddToWishlist = () => {
    toast.success("Producto agregado a la lista de deseos");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{product.nombre}</h1>
        <p className="text-lg text-muted-foreground">
          Por {product.marca.nombre}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            {formatPrice(product.precio)}
          </span>
          {product.precio_original > product.precio && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.precio_original)}
            </span>
          )}
        </div>
        {product.precio_original > product.precio && (
          <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            -
            {Math.round(
              ((product.precio_original - product.precio) /
                product.precio_original) *
                100
            )}
            %
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={
                i < product.calificacion ? "opacity-100" : "opacity-30"
              }
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-muted-foreground">
          ({product.cantidad_resenas} reseñas)
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Descripción</h3>
        <p className="text-muted-foreground">{product.descripcion}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setQuantity(Math.min(product.cantidad_stock, quantity + 1))
            }
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">
          {product.cantidad_stock} unidades disponibles
        </span>
      </div>

      <div className="flex gap-4">
        <Button className="flex-1" onClick={handleAddToCart}>
          Agregar al Carrito
        </Button>
        <Button variant="outline" size="icon" onClick={handleAddToWishlist}>
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-4">
          <Truck className="h-5 w-5" />
          <div>
            <h4 className="font-medium">Envío Gratis</h4>
            <p className="text-sm text-muted-foreground">2-5 días hábiles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
