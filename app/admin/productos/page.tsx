import { ProductTable } from "@/components/admin/ProductTable";
import { ProductForm } from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-8 pt-24">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="ghost" className="mb-4">
              ← Volver al Panel
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Productos</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Administra tu catálogo de productos, precios e inventario
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[400px,1fr]">
          <div>
            <ProductForm />
          </div>
          <div>
            <ProductTable />
          </div>
        </div>
      </div>
    </div>
  );
}
