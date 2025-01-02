"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AnnouncementBar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const scrollWidth = scrollElement.scrollWidth;
      const animationDuration = scrollWidth / 50; // Ajusta este valor para cambiar la velocidad

      scrollElement.style.setProperty("--scroll-width", `${scrollWidth}px`);
      scrollElement.style.setProperty(
        "--animation-duration",
        `${animationDuration}s`
      );
    }
  }, []);

  const announcementContent = (
    <>
      <span className="inline-block px-4">
        Oferta de Verano en Todos los Smartphones -{" "}
        <span className="text-yellow-300 font-bold">¡50% de Descuento!</span>
      </span>
      <Link
        href="/shop"
        className="font-semibold hover:underline inline-block px-4"
      >
        Comprar Ahora
      </Link>
    </>
  );

  return (
    <div className="w-full bg-black text-white px-4 py-1.5 fixed top-0 z-50 overflow-hidden">
      <div className="container mx-auto flex items-center justify-center text-sm">
        <div className="text-center overflow-hidden relative w-full">
          <div
            ref={scrollRef}
            className="whitespace-nowrap inline-flex animate-scroll"
          >
            {announcementContent}
            {announcementContent}
            {announcementContent}
            {announcementContent}
          </div>
        </div>
      </div>
    </div>
  );
}
