"use client";

import { useEffect, useState } from "react";
import { Search, ShoppingCart, Heart, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categorias = [
  {
    nombre: "iPhone",
    subcategorias: [
      { href: "/categoria/iphone/iphone-16", etiqueta: "iPhone 16" },
      { href: "/categoria/iphone/iphone-15", etiqueta: "iPhone 15" },
      { href: "/categoria/iphone/iphone-14", etiqueta: "iPhone 14" },
      { href: "/categoria/iphone/iphone-13", etiqueta: "iPhone 13" },
    ],
  },
  {
    nombre: "MacBooks",
    subcategorias: [
      { href: "/categoria/macbooks/macbook-air", etiqueta: "MacBook Air" },
      {
        href: "/categoria/macbooks/macbook-pro-13",
        etiqueta: "MacBook Pro 13",
      },
      {
        href: "/categoria/macbooks/macbook-pro-14",
        etiqueta: "MacBook Pro 14",
      },
      {
        href: "/categoria/macbooks/macbook-pro-16",
        etiqueta: "MacBook Pro 16",
      },
    ],
  },
  {
    nombre: "iPads",
    subcategorias: [
      { href: "/categoria/ipads/ipad-pro", etiqueta: "iPad Pro" },
      { href: "/categoria/ipads/ipad-air", etiqueta: "iPad Air" },
      { href: "/categoria/ipads/ipad", etiqueta: "iPad" },
      { href: "/categoria/ipads/ipad-mini", etiqueta: "iPad mini" },
    ],
  },
  {
    nombre: "Accesorios",
    subcategorias: [
      { href: "/categoria/accesorios/airpods", etiqueta: "AirPods" },
      { href: "/categoria/accesorios/apple-watch", etiqueta: "Apple Watch" },
      { href: "/categoria/accesorios/cargadores", etiqueta: "Cargadores" },
    ],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-[100vw] bg-white text-black py-4 fixed top-[32px] left-0 z-40 border-b transition-all duration-300 ${
        isScrolled ? "rounded-b-[4rem]" : ""
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-8">
        {/* Logo y Título */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo_nytek.jpeg"
            alt="Nytek Logo"
            width={40}
            height={40}
          />
          <Image src="/logo.svg" alt="Nytek Logo" width={120} height={120} />
        </Link>

        {/* Enlaces de Navegación */}
        <div className="hidden md:flex items-center gap-8">
          {categorias.map((categoria) => (
            <DropdownMenu key={categoria.nombre}>
              <DropdownMenuTrigger className="flex items-center text-sm hover:text-gray-600 transition-colors">
                {categoria.nombre} <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categoria.subcategorias.map((subcategoria) => (
                  <DropdownMenuItem key={subcategoria.etiqueta}>
                    <Link href={subcategoria.href} className="w-full">
                      {subcategoria.etiqueta}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        {/* Barra de Búsqueda */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Input
              type="search"
              placeholder="¿Qué estás buscando?"
              className="w-full pl-4 pr-10 py-2 bg-gray-100 border-none text-black rounded-md"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-black"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          </div>
        </div>

        {/* Iconos */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-6 w-6" />
            <span className="sr-only">Lista de deseos</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Carrito de compras</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
