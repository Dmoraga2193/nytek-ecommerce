"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./countdown-timer";
import { ProductCard } from "./product-card";

// Función auxiliar para formatear precios en CLP
const formatPrice = (price: number) => {
  return price.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
};

const products = [
  {
    id: "1",
    name: "Apple iPhone 16 124 GB",
    image: "/productos/celulares/apple/iphone16_1.webp",
    price: 1029990,
    originalPrice: 1059990,
    discount: 20,
    rating: 5,
    reviews: 88,
  },
  {
    id: "2",
    name: "Apple iPhone 16 Pro Max 256 GB",
    image: "/productos/celulares/apple/Apple iPhone 16 Pro Max 256 GB.webp",
    price: 1299990,
    originalPrice: 1499990,
    discount: 13,
    rating: 4,
    reviews: 75,
  },
  {
    id: "3",
    name: "Apple iPhone 15 Pro Max 256Gb",
    image:
      "/productos/celulares/apple/Apple iPhone 15 Pro Max 256Gb Blanco_1.webp",
    price: 1099990,
    originalPrice: 1299990,
    discount: 15,
    rating: 5,
    reviews: 99,
  },
  {
    id: "4",
    name: "Apple iPhone 16 Pro 128 GB",
    image: "/productos/celulares/apple/Apple iPhone 16 Pro 128 GB Gris_1.webp",
    price: 1229990,
    originalPrice: 1399990,
    discount: 14,
    rating: 4,
    reviews: 99,
  },
];

export function FlashSales() {
  // Set end date to 3 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="flex items-center gap-8 mb-8">
          <div className="flex items-center gap-8">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-5 h-10 bg-red-500 rounded-sm" />
                <h2 className="text-red-500">De hoy</h2>
              </div>
              <h3 className="text-4xl font-bold mt-2">Rebajas Flash!</h3>
            </div>
            <CountdownTimer targetDate={endDate} />
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 md:basis-1/2 lg:basis-1/4"
              >
                <ProductCard
                  {...product}
                  price={formatPrice(product.price)}
                  originalPrice={formatPrice(product.originalPrice)}
                  onAddToCart={() => console.log("Add to cart:", product.id)}
                  onToggleWishlist={() =>
                    console.log("Toggle wishlist:", product.id)
                  }
                  onQuickView={() => console.log("Quick view:", product.id)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="px-8 py-4 border-red-500 text-red-500 hover:bg-red-50"
          >
            Ver Todos los Productos
          </Button>
        </div>
      </div>
    </section>
  );
}
