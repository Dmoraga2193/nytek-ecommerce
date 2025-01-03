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

function getModelPath(categoryName: string, modelo: string): string {
  const category = categoryName.toLowerCase();

  if (modelo.toLowerCase().includes("macbook")) {
    return `${category}s/${
      modelo.toLowerCase().includes("macbook air")
        ? "macbook-air"
        : "macbook-pro"
    }`;
  }

  if (modelo.toLowerCase().includes("iphone")) {
    return `${category}/iphone-${modelo.split(" ")[1].toLowerCase()}`;
  }

  return `${category}/${modelo.toLowerCase().replace(/ /g, "-")}`;
}

function getModelName(modelo: string): string {
  if (modelo.toLowerCase().includes("macbook air")) return "MacBook Air";
  if (modelo.toLowerCase().includes("macbook pro")) return "MacBook Pro";
  if (modelo.toLowerCase().includes("iphone")) {
    return `iPhone ${modelo.split(" ")[1]}`;
  }
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
    <div className="min-h-screen pt-32">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          {product.categoria?.nombre && (
            <>
              <Link
                href={`/categoria/${product.categoria.nombre.toLowerCase()}`}
                className="hover:text-foreground"
              >
                {product.categoria.nombre}
              </Link>
              <ChevronRight className="h-4 w-4" />
              {product.modelo && (
                <>
                  <Link
                    href={`/categoria/${getModelPath(
                      product.categoria.nombre,
                      product.modelo
                    )}`}
                    className="hover:text-foreground"
                  >
                    {getModelName(product.modelo)}
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </>
          )}
          <span className="text-foreground">{product.nombre}</span>
        </nav>

        {/* Product Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductGallery images={product.imagenes} />
          <ProductInfo product={product} />
        </div>

        {/* Related Products */}
        <RelatedProducts
          categoryId={product.categoria_id}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
