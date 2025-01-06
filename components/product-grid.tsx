"use client";

import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  nombre: string;
  precio: number;
  precio_original: number;
  imagenes: string[];
  calificacion: number;
  cantidad_resenas: number;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No se encontraron productos que coincidan con los filtros
          seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.nombre}
          image={product.imagenes[0]}
          price={formatPrice(product.precio)}
          originalPrice={formatPrice(product.precio_original)}
          discount={Math.round(
            ((product.precio_original - product.precio) /
              product.precio_original) *
              100
          )}
          rating={product.calificacion}
          reviews={product.cantidad_resenas}
        />
      ))}
    </div>
  );
}
