"use server";

import { supabase } from "@/lib/supabase";

export async function agregarProducto({
  nombre,
  precio,
  urlsImagenes,
  descripcion,
  categoriaId,
  marcaId,
  cantidadStock,
}: {
  nombre: string;
  precio: number;
  urlsImagenes: string[];
  descripcion?: string;
  categoriaId?: string;
  marcaId?: string;
  cantidadStock: number;
}) {
  try {
    const { data, error } = await supabase
      .from("productos")
      .insert([
        {
          nombre,
          precio,
          imagenes: urlsImagenes,
          descripcion,
          categoria_id: categoriaId,
          marca_id: marcaId,
          cantidad_stock: cantidadStock,
          creado_en: new Date().toISOString(),
          actualizado_en: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Error de Supabase:", error);
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error en agregarProducto:", error);
    throw error instanceof Error
      ? error
      : new Error("Error desconocido al agregar el producto");
  }
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
  urlLogo,
}: {
  nombre: string;
  urlLogo: string | null | undefined;
}) {
  const { data, error } = await supabase
    .from("marcas")
    .insert([
      {
        nombre,
        url_logo: urlLogo,
        creado_en: new Date().toISOString(),
        actualizado_en: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error("Error en agregarMarca:", error);
    throw new Error(`Error al agregar la marca: ${error.message}`);
  }

  return data;
}
