"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CategoriesShowcase() {
  const categories = [
    {
      id: "iphone",
      nombre: "iPhone",
      descripcion: "Descubre los últimos modelos de iPhone",
    },
    {
      id: "ipads",
      nombre: "iPads",
      descripcion: "Encuentra tu iPad perfecto para tu estilo de vida",
    },
    {
      id: "macbooks",
      nombre: "MacBooks",
      descripcion: "Potencia y portabilidad en nuestros MacBooks",
    },
    {
      id: "accesorios",
      nombre: "Accesorios",
      descripcion: "Complementa tus dispositivos con nuestros accesorios",
    },
  ];

  const categoryImages: Record<string, string> = {
    iPhone: "/publicidad/smartphone_banner.webp",
    iPads: "/publicidad/tablets_banner.webp",
    MacBooks: "/publicidad/portatiles_banner.webp",
    Accesorios: "/publicidad/accesorios_banner.webp",
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold tracking-tight mb-6 pb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Explora Nuestras Categorías
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-xl leading-relaxed">
            Descubre nuestra amplia gama de productos tecnológicos organizados
            en categorías para facilitar tu búsqueda
          </p>
        </div>

        <div className="grid gap-6">
          {/* Banner horizontal grande */}
          <Link
            href={`/categoria/${categories[0].id}`}
            className="group relative overflow-hidden rounded-[2rem] aspect-[21/9] shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 transition-transform duration-300 group-hover:rotate-2 group-hover:scale-110">
              <Image
                src={categoryImages[categories[0].nombre] || "/placeholder.svg"}
                alt={categories[0].nombre}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:filter group-hover:brightness-110 transform group-hover:rotate-2"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <h3 className="text-3xl font-bold text-white mb-3 tracking-wide">
                {categories[0].nombre}
              </h3>
              <p className="text-xl text-white/90 max-w-xl leading-relaxed">
                {categories[0].descripcion}
              </p>
              <div
                className={cn(
                  "mt-6 inline-flex items-center text-lg font-medium",
                  "text-white opacity-0 transform translate-y-4",
                  "transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                )}
              >
                Explorar categoría
                <span className="ml-2 text-2xl">→</span>
              </div>
            </div>
          </Link>

          {/* Grid de banners verticales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(1).map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.id}`}
                className="group relative overflow-hidden rounded-[2rem] aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 transition-transform duration-300 group-hover:rotate-2 group-hover:scale-110">
                  <Image
                    src={categoryImages[category.nombre] || "/placeholder.svg"}
                    alt={category.nombre}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:filter group-hover:brightness-110 transform group-hover:rotate-2"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                    {category.nombre}
                  </h3>
                  <p className="text-base text-white/90 line-clamp-2 leading-relaxed">
                    {category.descripcion}
                  </p>
                  <div
                    className={cn(
                      "mt-4 inline-flex items-center text-base font-medium",
                      "text-white opacity-0 transform translate-y-4",
                      "transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                    )}
                  >
                    Explorar categoría
                    <span className="ml-2 text-xl">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
