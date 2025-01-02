"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "./product-card";
import { toast } from "sonner";
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

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getRelatedProducts = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("categoria_id", categoryId)
        .neq("id", currentProductId)
        .limit(4);

      if (error) {
        console.error("Error fetching related products:", error);
        return;
      }

      setProducts(data || []);
    };

    getRelatedProducts();
  }, [categoryId, currentProductId]);

  const handleAddToCart = (productId: string) => {
    toast.success(`Producto ${productId} agregado al carrito`);
  };

  const handleToggleWishlist = (productId: string) => {
    toast.success(`Producto ${productId} agregado a la lista de deseos`);
  };

  const handleQuickView = (productId: string) => {
    console.log("Quick view:", productId);
  };

  if (products.length === 0) return null;

  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold tracking-tight mb-8">
        Productos Relacionados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            onAddToCart={() => handleAddToCart(product.id)}
            onToggleWishlist={() => handleToggleWishlist(product.id)}
            onQuickView={() => handleQuickView(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
