"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function BrandForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    logo: null as File | null,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let logo_url = null;

      if (formData.logo) {
        const fileExt = formData.logo.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `brand-logos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("brand-logos")
          .upload(filePath, formData.logo);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("brand-logos").getPublicUrl(filePath);

        logo_url = publicUrl;
      }

      const { error } = await supabase.from("marcas").insert([
        {
          nombre: formData.nombre,
          logo_url,
        },
      ]);

      if (error) throw error;

      toast.success("Marca agregada exitosamente");
      setFormData({
        nombre: "",
        logo: null,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al agregar la marca");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nueva Marca</CardTitle>
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
            <Label htmlFor="logo">Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData({ ...formData, logo: file });
                }
              }}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Agregando..." : "Agregar Marca"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
