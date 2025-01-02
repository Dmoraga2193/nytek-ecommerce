"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditProductForm } from "./EditProductForm";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precio_original: number;
  cantidad_stock: number;
  categoria_id: string;
  marca_id: string;
  imagenes: string[];
}

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("nombre");

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleEditClick(product: Product) {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  }

  function handleEditDialogClose() {
    setIsEditDialogOpen(false);
    setEditingProduct(null);
  }

  function handleProductUpdated() {
    fetchProducts();
  }

  function calculateDiscount(price: number, originalPrice: number) {
    if (originalPrice > price) {
      const discount = ((originalPrice - price) / originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Productos Registrados</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-center">Oferta</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Cargando productos...
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No se encontraron productos
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => {
                  const discount = calculateDiscount(
                    product.precio,
                    product.precio_original
                  );
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.nombre}
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {product.descripcion}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span>{formatPrice(product.precio)}</span>
                          {discount > 0 && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.precio_original)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {product.cantidad_stock}
                      </TableCell>
                      <TableCell className="text-center">
                        {discount > 0 ? (
                          <Badge variant="destructive">-{discount}%</Badge>
                        ) : (
                          <Badge variant="secondary">Sin oferta</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditClick(product)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => console.log("Delete:", product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <EditProductForm
              product={editingProduct}
              onClose={handleEditDialogClose}
              onProductUpdated={handleProductUpdated}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
