"use server";

import { supabase } from "@/lib/supabase";

export async function agregarProducto({
  nombre,
  precio,
  urlImagen,
  descripcion,
  categoriaId,
  marcaId,
  cantidadStock,
}: {
  nombre: string;
  precio: number;
  urlImagen: string;
  descripcion?: string;
  categoriaId?: string;
  marcaId?: string;
  cantidadStock: number;
}) {
  const { data, error } = await supabase
    .from("productos")
    .insert([
      {
        nombre,
        precio,
        url_imagen: urlImagen,
        descripcion,
        categoria_id: categoriaId,
        marca_id: marcaId,
        cantidad_stock: cantidadStock,
      },
    ])
    .select();

  if (error) {
    throw new Error("Error al agregar el producto");
  }

  return data;
}

export async function obtenerCategorias() {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("nombre");

  if (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }

  return data;
}

export async function obtenerMarcas() {
  const { data, error } = await supabase
    .from("marcas")
    .select("*")
    .order("nombre");

  if (error) {
    console.error("Error al obtener marcas:", error);
    return [];
  }

  return data;
}

export async function agregarCategoria({
  nombre,
  descripcion,
}: {
  nombre: string;
  descripcion?: string;
}) {
  const { data, error } = await supabase
    .from("categorias")
    .insert([{ nombre, descripcion }])
    .select();

  if (error) {
    throw new Error("Error al agregar la categoría");
  }

  return data;
}

export async function agregarMarca({
  nombre,
  descripcion,
  urlLogo,
}: {
  nombre: string;
  descripcion?: string;
  urlLogo?: string;
}) {
  const { data, error } = await supabase
    .from("marcas")
    .insert([{ nombre, descripcion, url_logo: urlLogo }])
    .select();

  if (error) {
    throw new Error("Error al agregar la marca");
  }

  return data;
}
