"use client";

import { Heart, Eye } from "lucide-react";
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
  onToggleWishlist,
  onQuickView,
}: ProductCardProps) {
  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/producto/${id}`);
  };

  return (
    <div className="group relative bg-white p-4 rounded-lg h-full flex flex-col justify-between">
      <div>
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
            -{discount}%
          </div>
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white hover:bg-gray-100 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white hover:bg-gray-100 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>
        <div onClick={handleProductClick} className="cursor-pointer">
          <div className="relative aspect-square mb-4">
            <Image src={image} alt={name} fill className="object-contain" />
          </div>
          <h3 className="font-medium mb-2 hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-500 font-bold">{price}</span>
            <span className="text-gray-500 line-through">{originalPrice}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
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
            <span className="text-gray-500">({reviews})</span>
          </div>
        </div>
      </div>
      <Button
        className="w-full bg-black text-white hover:bg-black/90"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart();
        }}
      >
        Agregar al Carrito
      </Button>
    </div>
  );
}
