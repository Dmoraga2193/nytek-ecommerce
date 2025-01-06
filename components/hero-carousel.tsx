"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: "/carusel hero/carusel_hero_1.webp",
    logo: "/marcas/apple_blanco.png",
    title: "iPhone 16 Series",
    discount: "Hasta un 10%",
    type: "de Descuento",
    link: "/categoria/iphone/iphone-16",
  },
  {
    id: 2,
    image: "/carusel hero/carusel_hero_2.webp",
    logo: "/marcas/apple_blanco.png",
    title: "iPhone 16 Series",
    discount: "Descubre lo nuevo",
    type: "del Iphone 16",
    link: "/categoria/iphone/iphone-16",
  },
  // Add more slides as needed
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[3rem] bg-black mt-8 ">
      <div className="relative h-[400px] ">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transform transition-transform duration-700 ease-in-out",
              index === currentSlide
                ? "translate-x-0 opacity-100"
                : index < currentSlide
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            )}
          >
            <div className="relative h-full flex items-center">
              {/* Left Content */}
              <div className="w-1/2 pl-12 pr-6 z-10">
                <Image
                  src={slide.logo}
                  alt="Brand Logo"
                  width={80}
                  height={80}
                  className="mb-6"
                />
                <h2 className="text-2xl text-white font-medium mb-4">
                  {slide.title}
                </h2>
                <div className="text-5xl text-white font-bold mb-8 leading-tight">
                  {slide.discount}
                  <br />
                  {slide.type}
                </div>
                <Link
                  href={slide.link}
                  className="inline-flex items-center text-white text-lg font-medium hover:opacity-80"
                >
                  Comprar Ahora
                  <span className="ml-2 text-2xl">→</span>
                </Link>
              </div>

              {/* Right Image */}
              <div className="absolute right-0 top-0 w-1/2 h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            )}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
