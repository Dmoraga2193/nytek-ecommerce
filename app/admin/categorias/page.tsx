import { CategoryTable } from "@/components/admin/CategoryTable";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function CategoriasPage() {
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
            <LayoutGrid className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Categorías</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Organiza tus productos en categorías y subcategorías
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[400px,1fr]">
          <div>
            <CategoryForm />
          </div>
          <div>
            <CategoryTable />
          </div>
        </div>
      </div>
    </div>
  );
}
