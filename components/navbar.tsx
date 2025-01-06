"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Heart, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EnhancedSearchbar } from "./enhanced-searchbar";
import { cn } from "@/lib/utils";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "w-full bg-white text-black py-4 fixed top-[32px] left-0 z-40 border-b transition-all duration-300",
        isScrolled ? "rounded-b-[4rem]" : ""
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo y Título */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo_nytek.jpeg"
            alt="Nytek Logo"
            width={40}
            height={40}
          />
          <Image src="/logo.png" alt="Nytek Logo" width={120} height={120} />
        </Link>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Desktop Navigation */}
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
        <div className="hidden md:block flex-1 max-w-md">
          <EnhancedSearchbar />
        </div>

        {/* Iconos */}
        <div className="hidden md:flex items-center gap-4">
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={toggleMobileMenu}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="mt-12 space-y-6">
            {categorias.map((categoria) => (
              <div key={categoria.nombre} className="space-y-2">
                <h3 className="text-lg font-semibold">{categoria.nombre}</h3>
                <ul className="space-y-2">
                  {categoria.subcategorias.map((subcategoria) => (
                    <li key={subcategoria.etiqueta}>
                      <Link
                        href={subcategoria.href}
                        className="text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        {subcategoria.etiqueta}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <EnhancedSearchbar />
          </div>

          <div className="mt-8 flex justify-center gap-4">
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
      </div>
    </nav>
  );
}
