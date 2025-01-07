"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 px-4 sm:px-0">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scrollbar-hide md:h-[500px] md:w-24">
        <div className="flex md:flex-col gap-2 mt-1 ml-1 mb-1 pb-2 md:pb-0">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200",
                selectedImage === index
                  ? "ring-2 ring-primary opacity-100"
                  : "opacity-50 hover:opacity-100"
              )}
            >
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div className="relative flex-grow">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={images[selectedImage]}
            alt="Product image"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs sm:text-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
