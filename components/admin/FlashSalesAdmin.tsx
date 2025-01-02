"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  en_oferta_flash: boolean;
  oferta_flash_inicio: string | null;
  oferta_flash_fin: string | null;
}

export function FlashSalesAdmin() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProductos();
  }, []);

  async function fetchProductos() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("productos")
        .select(
          "id, nombre, precio, en_oferta_flash, oferta_flash_inicio, oferta_flash_fin"
        )
        .order("nombre");

      if (error) throw error;

      setProductos(data || []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("Error al cargar los productos. Por favor, intente de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleOfertaFlash(id: string, currentState: boolean) {
    try {
      const { error } = await supabase
        .from("productos")
        .update({
          en_oferta_flash: !currentState,
          oferta_flash_inicio: !currentState ? new Date().toISOString() : null,
          oferta_flash_fin: !currentState
            ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            : null,
        })
        .eq("id", id);

      if (error) throw error;

      setProductos(
        productos.map((p) =>
          p.id === id
            ? {
                ...p,
                en_oferta_flash: !currentState,
                oferta_flash_inicio: !currentState
                  ? new Date().toISOString()
                  : null,
                oferta_flash_fin: !currentState
                  ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                  : null,
              }
            : p
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado de oferta flash:", error);
      setError("Error al actualizar el producto. Por favor, intente de nuevo.");
    }
  }

  async function updateOfertaFlashDates(
    id: string,
    inicio: string,
    fin: string
  ) {
    try {
      const { error } = await supabase
        .from("productos")
        .update({
          oferta_flash_inicio: inicio,
          oferta_flash_fin: fin,
        })
        .eq("id", id);

      if (error) throw error;

      setProductos(
        productos.map((p) =>
          p.id === id
            ? { ...p, oferta_flash_inicio: inicio, oferta_flash_fin: fin }
            : p
        )
      );
    } catch (error) {
      console.error(
        "Error al actualizar las fechas de la oferta flash:",
        error
      );
      setError("Error al actualizar las fechas. Por favor, intente de nuevo.");
    }
  }

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <Button onClick={() => router.push("/admin")}>
        Volver al Panel de Administración
      </Button>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {productos.map((producto) => (
            <li key={producto.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id={`flash-sale-${producto.id}`}
                    checked={producto.en_oferta_flash}
                    onCheckedChange={() =>
                      toggleOfertaFlash(producto.id, producto.en_oferta_flash)
                    }
                  />
                  <label
                    htmlFor={`flash-sale-${producto.id}`}
                    className="ml-2 block text-sm font-medium text-gray-700"
                  >
                    {producto.nombre} - {formatPrice(producto.precio)}
                  </label>
                </div>
                {producto.en_oferta_flash && (
                  <div className="flex items-center space-x-4">
                    <div>
                      <Label
                        htmlFor={`inicio-${producto.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Inicio
                      </Label>
                      <Input
                        id={`inicio-${producto.id}`}
                        type="datetime-local"
                        value={
                          producto.oferta_flash_inicio
                            ? new Date(producto.oferta_flash_inicio)
                                .toISOString()
                                .slice(0, 16)
                            : ""
                        }
                        onChange={(e) =>
                          updateOfertaFlashDates(
                            producto.id,
                            e.target.value,
                            producto.oferta_flash_fin || ""
                          )
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`fin-${producto.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Fin
                      </Label>
                      <Input
                        id={`fin-${producto.id}`}
                        type="datetime-local"
                        value={
                          producto.oferta_flash_fin
                            ? new Date(producto.oferta_flash_fin)
                                .toISOString()
                                .slice(0, 16)
                            : ""
                        }
                        onChange={(e) =>
                          updateOfertaFlashDates(
                            producto.id,
                            producto.oferta_flash_inicio || "",
                            e.target.value
                          )
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
