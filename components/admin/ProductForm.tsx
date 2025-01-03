"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";

interface Categoria {
  id: string;
  nombre: string;
}

interface Marca {
  id: string;
  nombre: string;
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

export function ProductForm() {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    precio_original: "",
    cantidad_stock: "",
    categoria_id: "",
    marca_id: "",
    imagenes: [] as File[],
    modelo: "",
    color: "",
    capacidad: "",
  });

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
      if (!formData.categoria_id || !formData.marca_id) {
        throw new Error("Debes seleccionar una categoría y una marca");
      }

      const precio = parseFloat(formData.precio);
      const precioOriginal = parseFloat(formData.precio_original);
      if (isNaN(precio) || isNaN(precioOriginal)) {
        throw new Error("Los precios deben ser números válidos");
      }

      const cantidadStock = parseInt(formData.cantidad_stock);
      if (isNaN(cantidadStock)) {
        throw new Error("El stock debe ser un número válido");
      }

      const porcentajeDescuento =
        ((precioOriginal - precio) / precioOriginal) * 100;

      const imageUrls = [];
      for (const imagen of formData.imagenes) {
        const fileExt = imagen.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imagen);

        if (uploadError) {
          console.error("Error al subir imagen:", uploadError);
          throw new Error(`Error al subir la imagen ${imagen.name}`);
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(fileName);

        imageUrls.push(publicUrl);
      }

      const { error: insertError } = await supabase.from("productos").insert([
        {
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          precio: precio,
          precio_original: precioOriginal,
          porcentaje_descuento: porcentajeDescuento,
          cantidad_stock: cantidadStock,
          categoria_id: formData.categoria_id,
          marca_id: formData.marca_id,
          calificacion: 0,
          cantidad_resenas: 0,
          imagenes: imageUrls,
          en_oferta_flash: false,
          creado_en: new Date().toISOString(),
          actualizado_en: new Date().toISOString(),
          modelo: formData.modelo,
          color: formData.color,
          capacidad: formData.capacidad,
        },
      ]);

      if (insertError) {
        console.error("Error al insertar producto:", insertError);
        throw new Error("Error al guardar el producto en la base de datos");
      }

      toast.success("Producto agregado exitosamente");
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        precio_original: "",
        cantidad_stock: "",
        categoria_id: "",
        marca_id: "",
        imagenes: [],
        modelo: "",
        color: "",
        capacidad: "",
      });
    } catch (error) {
      console.error("Error detallado:", error);
      toast.error(
        error instanceof Error ? error.message : "Error al agregar el producto"
      );
    } finally {
      setLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      const isValid =
        file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024; // 5MB
      if (!isValid) {
        toast.error(`${file.name} no es válido. Use imágenes de hasta 5MB.`);
      }
      return isValid;
    });
    setFormData((prev) => ({
      ...prev,
      imagenes: [...prev.imagenes, ...validFiles],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nuevo Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
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
                  setFormData({ ...formData, precio: e.target.value })
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
                  setFormData({ ...formData, precio_original: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="cantidad_stock">Cantidad en Stock</Label>
              <Input
                id="cantidad_stock"
                type="number"
                value={formData.cantidad_stock}
                onChange={(e) =>
                  setFormData({ ...formData, cantidad_stock: e.target.value })
                }
                required
              />
            </div>
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
              onValueChange={(value) =>
                setFormData({ ...formData, modelo: value })
              }
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
              onValueChange={(value) =>
                setFormData({ ...formData, color: value })
              }
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

          <div className="grid gap-2">
            <Label htmlFor="imagenes">Imágenes</Label>
            <Input
              id="imagenes"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {formData.imagenes.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {formData.imagenes.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      width={96}
                      height={96}
                      className="h-24 w-full rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Máximo 5MB por imagen. Formatos: JPG, PNG, GIF, WEBP
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Agregando..." : "Agregar Producto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
