import { supabase } from "@/lib/supabase";
import { ProductGrid } from "@/components/product-grid";
import { CategoryHeader } from "@/components/category-header";
import { ProductFilters } from "@/components/product-filters";
import { Suspense } from "react";
import { ProductsLoading } from "@/components/products-loading";

interface PageProps {
  searchParams: Promise<{
    sort?: string;
    color?: string;
    storage?: string;
    page?: string;
  }>;
}

async function getProducts(searchParams: Awaited<PageProps["searchParams"]>) {
  try {
    console.log("Fetching MacBook Pro products with params:", searchParams);

    let query = supabase
      .from("productos")
      .select("*", { count: "exact" })
      .in("modelo", [
        "MacBook Pro de 13 pulgadas (M1)",
        "MacBook Pro de 13 pulgadas (M2)",
        "MacBook Pro de 14 pulgadas (M2 Pro y M2 Max)",
        "MacBook Pro de 16 pulgadas (M2 Pro y M2 Max)",
        "MacBook Pro de 13 pulgadas (M3)",
        "MacBook Pro de 14 pulgadas (M3 Pro y M3 Max)",
        "MacBook Pro de 16 pulgadas (M3 Pro y M3 Max)",
      ]);

    if (searchParams.color) {
      query = query.eq("color", searchParams.color);
    }
    if (searchParams.storage) {
      query = query.eq("capacidad", searchParams.storage);
    }

    if (searchParams.sort) {
      switch (searchParams.sort) {
        case "price-asc":
          query = query.order("precio", { ascending: true });
          break;
        case "price-desc":
          query = query.order("precio", { ascending: false });
          break;
        case "newest":
          query = query.order("creado_en", { ascending: false });
          break;
        default:
          query = query.order("creado_en", { ascending: false });
      }
    } else {
      query = query.order("creado_en", { ascending: false });
    }

    const itemsPerPage = 12;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;

    const { data: products, error, count } = await query.range(start, end);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return {
      products: products || [],
      total: count || 0,
    };
  } catch (error) {
    console.error("Error in getProducts:", error);
    return {
      products: [],
      total: 0,
    };
  }
}

export default async function CategoryPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const { products, total } = await getProducts(resolvedSearchParams);

  return (
    <div className="min-h-screen pt-32">
      <div className="container mx-auto px-4">
        <CategoryHeader
          title="MacBook Pro"
          description="Experimenta el rendimiento profesional con los MacBook Pro, equipados con los potentes chips M3, M3 Pro y M3 Max."
          total={total}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64">
            <ProductFilters category="MacBook" />
          </aside>

          <main className="flex-1">
            <Suspense fallback={<ProductsLoading />}>
              <ProductGrid products={products} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
