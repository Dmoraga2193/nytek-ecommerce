"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  agregarProducto,
  obtenerCategorias,
  obtenerMarcas,
} from "@/app/actions";
import { supabase } from "@/lib/supabase";

interface Categoria {
  id: string;
  nombre: string;
}

interface Marca {
  id: string;
  nombre: string;
}

export function ProductForm() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidadStock, setCantidadStock] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [marcaId, setMarcaId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const categoriasData = await obtenerCategorias();
      const marcasData = await obtenerMarcas();
      setCategorias(categoriasData);
      setMarcas(marcasData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName);

      await agregarProducto({
        nombre,
        precio: parseFloat(precio),
        urlImagen: publicUrl,
        descripcion,
        categoriaId,
        marcaId,
        cantidadStock: parseInt(cantidadStock),
      });
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setCantidadStock("");
      setCategoriaId("");
      setMarcaId("");
      setFile(null);
      router.refresh();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Nombre del Producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input
        type="number"
        placeholder="Precio (CLP)"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input
        type="number"
        placeholder="Cantidad en Stock"
        value={cantidadStock}
        onChange={(e) => setCantidadStock(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Select onValueChange={setCategoriaId}>
        <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Seleccionar Categoría" />
        </SelectTrigger>
        <SelectContent>
          {categorias.map((categoria) => (
            <SelectItem key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={setMarcaId}>
        <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Seleccionar Marca" />
        </SelectTrigger>
        <SelectContent>
          {marcas.map((marca) => (
            <SelectItem key={marca.id} value={marca.id}>
              {marca.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        accept="image/*"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button
        type="submit"
        disabled={uploading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        {uploading ? "Subiendo..." : "Agregar Producto"}
      </Button>
    </form>
  );
}
