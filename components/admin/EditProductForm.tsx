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
  modelo: string;
  color: string;
  capacidad: string;
}

interface EditProductFormProps {
  product: Product;
  onClose: () => void;
  onProductUpdated: () => void;
}

const iPhoneModels = [
  "iPhone 13",
  "iPhone 13 mini",
  "iPhone 13 Pro",
  "iPhone 13 Pro Max",
  "iPhone 14",
  "iPhone 14 Plus",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 15",
  "iPhone 15 Plus",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "iPhone 16",
  "iPhone 16 Plus",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
];

const macBookModels = [
  "MacBook Air de 13 pulgadas (M1)",
  "MacBook Pro de 13 pulgadas (M1)",
  "MacBook Air de 13 pulgadas (M2)",
  "MacBook Pro de 13 pulgadas (M2)",
  "MacBook Pro de 14 pulgadas (M2 Pro y M2 Max)",
  "MacBook Pro de 16 pulgadas (M2 Pro y M2 Max)",
  "MacBook Air de 13 pulgadas (M3)",
  "MacBook Air de 15 pulgadas (M3)",
  "MacBook Pro de 13 pulgadas (M3)",
  "MacBook Pro de 14 pulgadas (M3 Pro y M3 Max)",
  "MacBook Pro de 16 pulgadas (M3 Pro y M3 Max)",
];

const iPadModels = [
  // iPad Pro
  "iPad Pro de 13″ (M4)",
  "iPad Pro de 11″ (M4)",
  "iPad Pro de 12,9″ (6.ª generación, M2)",
  "iPad Pro de 11″ (4.ª generación, M2)",
  "iPad Pro de 12,9″ (5.ª generación, M1)",
  "iPad Pro de 11″ (3.ª generación, M1)",
  "iPad Pro de 12,9″ (4.ª generación, A12Z Bionic)",
  "iPad Pro de 11″ (2.ª generación, A12Z Bionic)",
  "iPad Pro de 12,9″ (3.ª generación, A12X Bionic)",
  "iPad Pro de 11″ (1.ª generación, A12X Bionic)",
  "iPad Pro de 12,9″ (2.ª generación, A10X Fusion)",
  "iPad Pro de 10,5″ (A10X Fusion)",
  "iPad Pro de 12,9″ (1.ª generación, A9X)",
  "iPad Pro de 9,7″ (A9X)",
  // iPad Air
  "iPad Air de 13″ (M2)",
  "iPad Air de 11″ (M2)",
  "iPad Air (5.ª generación, M1)",
  "iPad Air (4.ª generación, A14 Bionic)",
  "iPad Air (3.ª generación, A12 Bionic)",
  "iPad Air 2 (A8X)",
  "iPad Air (1.ª generación, A7)",
  // iPad
  "iPad (10.ª generación, A14 Bionic)",
  "iPad (9.ª generación, A13 Bionic)",
  "iPad (8.ª generación, A12 Bionic)",
  "iPad (7.ª generación, A10 Fusion)",
  "iPad (6.ª generación, A10 Fusion)",
  "iPad (5.ª generación, A9)",
  "iPad (4.ª generación, A6X)",
  "iPad (3.ª generación, A5X)",
  "iPad 2 (A5)",
  "iPad (1.ª generación, A4)",
  // iPad mini
  "iPad mini (6.ª generación, A15 Bionic)",
  "iPad mini (A17 Pro)",
  "iPad mini (5.ª generación, A12 Bionic)",
  "iPad mini 4 (A8)",
  "iPad mini 3 (A7)",
  "iPad mini 2 (A7)",
  "iPad mini (1.ª generación, A5)",
];

const iPhoneColors = [
  "Blanco",
  "Negro",
  "Azul ultramar",
  "Verde azulado",
  "Rosa",
  "Titanio negro",
  "Titanio blanco",
  "Titanio natural",
  "Titanio desierto",
];

const macBookColors = ["Gris espacial", "Plata"];

const iPadColors = [
  "Azul",
  "Púrpura",
  "Blanco estrella",
  "Rosa",
  "Plata",
  "Amarillo",
  "Gris espacial",
];

const capacities = ["64GB", "128GB", "256GB", "512GB", "1TB"];

export function EditProductForm({
  product,
  onClose,
  onProductUpdated,
}: EditProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [formData, setFormData] = useState<Product>(product);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);

  useEffect(() => {
    fetchCategorias();
    fetchMarcas();
  }, []);

  useEffect(() => {
    // Update available models and colors based on selected category
    const selectedCategory = categorias.find(
      (cat) => cat.id === formData.categoria_id
    );
    if (selectedCategory) {
      switch (selectedCategory.nombre) {
        case "iPhone":
          setAvailableModels(iPhoneModels);
          setAvailableColors(iPhoneColors);
          break;
        case "MacBook":
          setAvailableModels(macBookModels);
          setAvailableColors(macBookColors);
          break;
        case "iPad":
          setAvailableModels(iPadModels);
          setAvailableColors(iPadColors);
          break;
        default:
          setAvailableModels([]);
          setAvailableColors([]);
      }
    }
  }, [formData.categoria_id, categorias]);

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
          modelo: formData.modelo,
          color: formData.color,
          capacidad: formData.capacidad,
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

      <div className="grid gap-2">
        <Label htmlFor="modelo">Modelo</Label>
        <Select
          value={formData.modelo}
          onValueChange={(value) => setFormData({ ...formData, modelo: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar modelo" />
          </SelectTrigger>
          <SelectContent>
            {availableModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="color">Color</Label>
        <Select
          value={formData.color}
          onValueChange={(value) => setFormData({ ...formData, color: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar color" />
          </SelectTrigger>
          <SelectContent>
            {availableColors.map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="capacidad">Capacidad</Label>
        <Select
          value={formData.capacidad}
          onValueChange={(value) =>
            setFormData({ ...formData, capacidad: value })
          }
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar capacidad" />
          </SelectTrigger>
          <SelectContent>
            {capacities.map((capacity) => (
              <SelectItem key={capacity} value={capacity}>
                {capacity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
