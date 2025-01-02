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
    nombre: "Smartphones",
    subcategorias: [
      { href: "/categoria/smartphones/apple", etiqueta: "Apple" },
      { href: "/categoria/smartphones/samsung", etiqueta: "Samsung" },
      { href: "/categoria/smartphones/xiaomi", etiqueta: "Xiaomi" },
      { href: "/categoria/smartphones/huawei", etiqueta: "Huawei" },
    ],
  },
  {
    nombre: "Tablets",
    subcategorias: [
      { href: "/categoria/tablets/ipad", etiqueta: "iPad" },
      {
        href: "/categoria/tablets/samsung-galaxy-tab",
        etiqueta: "Samsung Galaxy Tab",
      },
      { href: "/categoria/tablets/lenovo", etiqueta: "Lenovo" },
      { href: "/categoria/tablets/huawei", etiqueta: "Huawei" },
    ],
  },
  {
    nombre: "Portátiles",
    subcategorias: [
      { href: "/categoria/portatiles/macbook", etiqueta: "MacBook" },
      { href: "/categoria/portatiles/dell", etiqueta: "Dell" },
      { href: "/categoria/portatiles/hp", etiqueta: "HP" },
      { href: "/categoria/portatiles/lenovo", etiqueta: "Lenovo" },
    ],
  },
  {
    nombre: "Accesorios",
    subcategorias: [
      { href: "/categoria/accesorios/auriculares", etiqueta: "Auriculares" },
      { href: "/categoria/accesorios/cargadores", etiqueta: "Cargadores" },
      { href: "/categoria/accesorios/fundas", etiqueta: "Fundas" },
      { href: "/categoria/accesorios/smartwatches", etiqueta: "Smartwatches" },
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
            className="rounded-full"
          />
          <span className="text-2xl font-bold">Nytek</span>
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
