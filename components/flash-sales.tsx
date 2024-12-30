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

const products = [
  {
    id: "1",
    name: "HAVIT HV-G92 Gamepad",
    image: "/placeholder.svg?height=300&width=300",
    price: 120,
    originalPrice: 160,
    discount: 40,
    rating: 5,
    reviews: 88,
  },
  {
    id: "2",
    name: "AK-900 Wired Keyboard",
    image: "/placeholder.svg?height=300&width=300",
    price: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
  },
  {
    id: "3",
    name: "IPS LCD Gaming Monitor",
    image: "/placeholder.svg?height=300&width=300",
    price: 370,
    originalPrice: 400,
    discount: 30,
    rating: 5,
    reviews: 99,
  },
  {
    id: "4",
    name: "S-Series Comfort Chair",
    image: "/placeholder.svg?height=300&width=300",
    price: 375,
    originalPrice: 400,
    discount: 25,
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
              <h3 className="text-4xl font-bold mt-2">Flash Sales</h3>
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
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
