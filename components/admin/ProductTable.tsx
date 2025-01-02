import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categorias: { nombre: string } | null;
  marcas: { nombre: string } | null;
  cantidad_stock: number;
  url_imagen: string;
}

async function obtenerProductos(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from("productos")
    .select(
      `
      *,
      categorias (nombre),
      marcas (nombre)
    `
    )
    .order("creado_en", { ascending: false });

  if (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }

  return data as Producto[];
}

export async function ProductTable() {
  const productos = await obtenerProductos();

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Nombre", "Precio", "Categoría", "Marca", "Stock", "Imagen"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productos.map((producto: Producto) => (
            <tr
              key={producto.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {producto.nombre}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {formatPrice(producto.precio)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {producto.categorias?.nombre || "N/A"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {producto.marcas?.nombre || "N/A"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {producto.cantidad_stock}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Image
                  src={producto.url_imagen}
                  alt={producto.nombre}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
