"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface EditCategoryFormProps {
  category: {
    id: string;
    nombre: string;
    descripcion: string;
  };
  onClose: () => void;
  onCategoryUpdated: () => void;
}

export function EditCategoryForm({
  category,
  onClose,
  onCategoryUpdated,
}: EditCategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: category.nombre,
    descripcion: category.descripcion,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("categorias")
        .update({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          actualizado_en: new Date().toISOString(),
        })
        .eq("id", category.id);

      if (error) throw error;

      toast.success("Categoría actualizada exitosamente");
      onCategoryUpdated();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar la categoría");
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

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar Categoría"}
        </Button>
      </div>
    </form>
  );
}
