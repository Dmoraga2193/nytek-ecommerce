import { supabase } from "@/lib/supabase";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { RelatedProducts } from "@/components/related-products";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function getMainCategory(modelo: string): string {
  if (modelo.toLowerCase().includes("iphone")) return "iPhone";
  if (modelo.toLowerCase().includes("ipad")) return "iPad";
  if (modelo.toLowerCase().includes("macbook")) return "MacBook";
  return modelo;
}

async function getProduct(id: string) {
  const { data: product, error } = await supabase
    .from("productos")
    .select("*, categoria:categorias(nombre), marca:marcas(nombre)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return product;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="min-h-screen pt-24 pb-16 mt-8">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 px-4 sm:px-0">
          <Link href="/" className="hover:text-foreground">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/categoria/${
              product.categoria.nombre.toLowerCase() === "iphone"
                ? "iphone"
                : `${product.categoria.nombre.toLowerCase()}s`
            }`}
            className="hover:text-foreground"
          >
            {getMainCategory(product.modelo)}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate">{product.nombre}</span>
        </nav>

        {/* Product Layout */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          <ProductGallery images={product.imagenes} />
          <ProductInfo product={product} />
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts
            categoryId={product.categoria_id}
            currentProductId={product.id}
          />
        </div>
      </div>
    </div>
  );
}
