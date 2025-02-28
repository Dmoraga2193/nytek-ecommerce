"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice: string;
  discount: number;
  rating: number;
  reviews: number;
}

export function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
}: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleProductClick = () => {
    router.push(`/producto/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Remove currency symbol, dots, commas and spaces before parsing
    const cleanPrice = price.replace(/[$.]/g, "").replace(/,/g, "");
    addToCart({
      id,
      name,
      price: parseInt(cleanPrice), // Using parseInt for CLP (no decimals)
      image,
    });
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden">
      <div className="p-2 relative">
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
            -{discount}%
          </div>
        )}
        <div onClick={handleProductClick} className="cursor-pointer">
          <div className="relative aspect-square mb-4 transition-transform duration-300 group-hover:scale-105">
            <Image src={image} alt={name} fill className="object-contain" />
          </div>
          <h3 className="font-medium mb-1 text-gray-800 group-hover:text-primary transition-colors line-clamp-2 max-w-full">
            {name}
          </h3>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-red-500 font-bold">{price}</span>
            {originalPrice !== price && (
              <span className="text-gray-500 line-through text-sm">
                {originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < rating ? "opacity-100" : "opacity-30"}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-500 text-sm">({reviews})</span>
          </div>
        </div>
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Button
            size="icon"
            className="bg-yellow-400 text-primary hover:bg-red-500 hover:text-white transition-all duration-300 rounded-full shadow-md opacity-0 group-hover:opacity-100 -translate-y-full group-hover:translate-y-0"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Agregar al Carrito</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
