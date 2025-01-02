import Link from "next/link";
import { Zap, Package, LayoutGrid, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Panel de Administración
          </h1>
          <p className="mt-2 text-muted-foreground">
            Gestiona tus productos, categorías, marcas y ofertas flash
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/productos"
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full border-2 hover:border-primary">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span>Productos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Administra tu catálogo de productos, precios e inventario
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/admin/categorias"
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full border-2 hover:border-primary">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5 text-primary" />
                  <span>Categorías</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Organiza tus productos en categorías y subcategorías
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/admin/marcas"
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full border-2 hover:border-primary">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <span>Marcas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Gestiona las marcas disponibles en tu tienda
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/admin/flash-sales"
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full border-2 hover:border-primary">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Ofertas Flash</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configura ofertas especiales por tiempo limitado
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
