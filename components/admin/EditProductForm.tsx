"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Categoria {
  id: string;
  nombre: string;
}

interface Marca {
  id: string;
  nombre: string;
}

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

interface EditProductFormProps {
  product: Product;
  onClose: () => void;
  onProductUpdated: () => void;
}

export function EditProductForm({
  product,
  onClose,
  onProductUpdated,
}: EditProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [formData, setFormData] = useState<Product>(product);

  useEffect(() => {
    fetchCategorias();
    fetchMarcas();
  }, []);

  async function fetchCategorias() {
    try {
      const { data, error } = await supabase
        .from("categorias")
        .select("id, nombre")
        .order("nombre");

      if (error) throw error;
      setCategorias(data || []);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      toast.error("Error al cargar las categorías");
    }
  }

  async function fetchMarcas() {
    try {
      const { data, error } = await supabase
        .from("marcas")
        .select("id, nombre")
        .order("nombre");

      if (error) throw error;
      setMarcas(data || []);
    } catch (error) {
      console.error("Error al obtener marcas:", error);
      toast.error("Error al cargar las marcas");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("productos")
        .update({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          precio: formData.precio,
          precio_original: formData.precio_original,
          cantidad_stock: formData.cantidad_stock,
          categoria_id: formData.categoria_id,
          marca_id: formData.marca_id,
          actualizado_en: new Date().toISOString(),
        })
        .eq("id", product.id);

      if (error) throw error;

      toast.success("Producto actualizado exitosamente");
      onProductUpdated();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar el producto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="precio">Precio</Label>
          <Input
            id="precio"
            type="number"
            value={formData.precio}
            onChange={(e) =>
              setFormData({ ...formData, precio: parseFloat(e.target.value) })
            }
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="precio_original">Precio Original</Label>
          <Input
            id="precio_original"
            type="number"
            value={formData.precio_original}
            onChange={(e) =>
              setFormData({
                ...formData,
                precio_original: parseFloat(e.target.value),
              })
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="cantidad_stock">Cantidad en Stock</Label>
        <Input
          id="cantidad_stock"
          type="number"
          value={formData.cantidad_stock}
          onChange={(e) =>
            setFormData({
              ...formData,
              cantidad_stock: parseInt(e.target.value),
            })
          }
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="categoria">Categoría</Label>
          <Select
            value={formData.categoria_id}
            onValueChange={(value) =>
              setFormData({ ...formData, categoria_id: value })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map((categoria) => (
                <SelectItem key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="marca">Marca</Label>
          <Select
            value={formData.marca_id}
            onValueChange={(value) =>
              setFormData({ ...formData, marca_id: value })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar marca" />
            </SelectTrigger>
            <SelectContent>
              {marcas.map((marca) => (
                <SelectItem key={marca.id} value={marca.id}>
                  {marca.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar Producto"}
        </Button>
      </div>
    </form>
  );
}
