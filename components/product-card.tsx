"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice: string;
  discount: number;
  rating: number;
  reviews: number;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onQuickView: () => void;
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
  onAddToCart,
}: ProductCardProps) {
  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/producto/${id}`);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden">
      <div className="p-2 relative">
        {" "}
        {/* Reducido de p-3 a p-2 */}
        {/* Relative container for absolute positioning */}
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
            {" "}
            {/* Agregado max-w-full */}
            {name}
          </h3>
          <div className="flex items-center gap-1 mb-1">
            {" "}
            {/* Reducido gap-1.5 a gap-1 y mb-2 a mb-1 */}
            <span className="text-red-500 font-bold">{price}</span>
            {originalPrice !== price && (
              <span className="text-gray-500 line-through text-sm">
                {originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mb-3">
            {" "}
            {/* Reducido gap-2 a gap-1 y mb-4 a mb-3 */}
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
        {/* "Add to Cart" button as a tag */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            size="icon"
            className="bg-yellow-400 text-primary hover:bg-red-500 hover:text-white transition-all duration-300 rounded-full shadow-md opacity-0 group-hover:opacity-100 -translate-y-full group-hover:translate-y-0" // Changed animation
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Agregar al Carrito</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
