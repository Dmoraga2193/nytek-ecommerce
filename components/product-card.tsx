import { Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onQuickView: () => void;
}

export function ProductCard({
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
  return (
    <div className="group relative bg-white p-4 rounded-lg">
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
          -{discount}%
        </div>
      )}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white hover:bg-gray-100"
          onClick={onToggleWishlist}
        >
          <Heart className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white hover:bg-gray-100"
          onClick={onQuickView}
        >
          <Eye className="h-5 w-5" />
        </Button>
      </div>
      <div className="relative aspect-square mb-4">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>
      <h3 className="font-medium mb-2">{name}</h3>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-red-500 font-bold">${price}</span>
        <span className="text-gray-500 line-through">${originalPrice}</span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? "opacity-100" : "opacity-30"}>
              ★
            </span>
          ))}
        </div>
        <span className="text-gray-500">({reviews})</span>
      </div>
      <Button
        className="w-full bg-black text-white hover:bg-black/90"
        onClick={onAddToCart}
      >
        Add To Cart
      </Button>
    </div>
  );
}
