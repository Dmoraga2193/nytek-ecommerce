"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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

  return (
    <div className="w-full bg-black text-white px-4 py-1.5 fixed top-0 z-50 overflow-hidden">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex-1" />

        <div className="text-center flex-[2] overflow-hidden">
          <div
            ref={scrollRef}
            className="whitespace-nowrap animate-scroll inline-flex"
          >
            <span className="inline-block px-4">
              Oferta de Verano en Todos los Smartphones -{" "}
              <span className="text-yellow-300 font-bold">
                ¡50% de Descuento!
              </span>
            </span>
            <Link
              href="/shop"
              className="font-semibold hover:underline inline-block px-4"
            >
              Comprar Ahora
            </Link>
            {/* Duplicamos el contenido para crear el efecto de repetición infinita */}
            <span className="inline-block px-4">
              Oferta de Verano en Todos los Smartphones -{" "}
              <span className="text-yellow-300 font-bold">
                ¡50% de Descuento!
              </span>
            </span>
            <Link
              href="/shop"
              className="font-semibold hover:underline inline-block px-4"
            >
              Comprar Ahora
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none">
              Español
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
