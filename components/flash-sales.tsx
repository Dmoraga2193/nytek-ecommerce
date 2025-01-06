"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CountdownTimer } from "./countdown-timer";
import { ProductCard } from "./product-card";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  precio_original: number;
  imagenes: string[];
  calificacion: number;
  cantidad_resenas: number;
  oferta_flash_inicio: string;
  oferta_flash_fin: string;
}

export function FlashSales() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProductosEnOferta();
  }, []);

  async function fetchProductosEnOferta() {
    try {
      setLoading(true);
      console.log("Iniciando búsqueda de productos en oferta...");

      const { data: allFlashProducts, error: initialError } = await supabase
        .from("productos")
        .select("*")
        .eq("en_oferta_flash", true)
        .gt("oferta_flash_fin", new Date().toISOString())
        .order("oferta_flash_fin", { ascending: true });

      if (initialError) {
        console.error("Error inicial Supabase:", initialError);
        throw initialError;
      }

      if (!allFlashProducts || allFlashProducts.length === 0) {
        console.log("No se encontraron productos en oferta flash");
        setProductos([]);
        return;
      }

      const productosValidos = allFlashProducts.filter((producto) => {
        if (!producto) return false;

        const esValido =
          typeof producto.id === "string" &&
          typeof producto.nombre === "string" &&
          typeof producto.precio === "number" &&
          Array.isArray(producto.imagenes) &&
          producto.oferta_flash_fin;

        if (!esValido) {
          console.log("Producto inválido encontrado:", producto);
        }

        return esValido;
      });

      setProductos(productosValidos);
    } catch (error) {
      console.error("Error al obtener productos en oferta:", error);
      setError(
        "Error al cargar las ofertas flash. Por favor, intente de nuevo."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!productos || productos.length === 0) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <p className="text-gray-500 font-medium">
              No hay ofertas flash disponibles en este momento.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const endDate = productos[0]?.oferta_flash_fin
    ? new Date(productos[0].oferta_flash_fin)
    : null;

  return (
    <section>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-red-500 rounded-full" />
              <span className="text-red-500 font-medium uppercase tracking-wider text-sm">
                De hoy
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight">
              ¡Rebajas Flash!
            </h2>
          </div>

          {endDate && (
            <div className="mt-6 md:mt-0 p-6 bg-white rounded-xl shadow-sm border">
              <p className="text-sm text-gray-500 mb-2 text-center">
                Termina en:
              </p>
              <CountdownTimer targetDate={endDate} />
            </div>
          )}
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {productos.map((producto) => {
                const price = formatPrice(producto?.precio || 0);
                const originalPrice = formatPrice(
                  producto?.precio_original || producto?.precio || 0
                );
                const discount =
                  producto?.precio && producto?.precio_original
                    ? Math.round(
                        (1 - producto.precio / producto.precio_original) * 100
                      )
                    : 0;
                const image = producto?.imagenes?.[0] || "/placeholder.svg";
                const name = producto?.nombre || "Producto sin nombre";
                const rating = producto?.calificacion || 0;
                const reviews = producto?.cantidad_resenas || 0;

                return (
                  <CarouselItem
                    key={producto.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/4"
                  >
                    <div className="h-full">
                      <ProductCard
                        id={producto.id}
                        name={name}
                        image={image}
                        price={price}
                        originalPrice={originalPrice}
                        discount={discount}
                        rating={rating}
                        reviews={reviews}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12" />
            <CarouselNext className="hidden md:flex -right-12 h-12 w-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
