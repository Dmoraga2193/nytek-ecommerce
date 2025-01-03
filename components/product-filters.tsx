"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const storageOptions = ["128GB", "256GB", "512GB", "1TB"];

const colorOptions = {
  iPhone: [
    "Blanco",
    "Negro",
    "Azul ultramar",
    "Verde azulado",
    "Rosa",
    "Titanio negro",
    "Titanio blanco",
    "Titanio natural",
    "Titanio desierto",
  ],
  MacBook: ["Gris espacial", "Plata"],
  iPad: ["Azul", "Púrpura", "Blanco estrella", "Rosa", "Plata", "Amarillo"],
};

interface ProductFiltersProps {
  category: keyof typeof colorOptions;
}

export function ProductFilters({ category }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "";
  const currentColor = searchParams.get("color") || "";
  const currentStorage = searchParams.get("storage") || "";

  // Check if any filter is active
  const hasActiveFilters = currentSort || currentColor || currentStorage;

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "relevance") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to first page when filtering
    params.delete("page");

    router.push(`?${params.toString()}`);
  }

  function clearFilters() {
    router.push(window.location.pathname);
  }

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Filtros activos</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-2 text-xs"
            >
              Limpiar todos
              <X className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentSort && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {currentSort === "price-asc" && "Precio: Menor a Mayor"}
                {currentSort === "price-desc" && "Precio: Mayor a Menor"}
                {currentSort === "newest" && "Más Recientes"}
                {currentSort === "relevance" && "Más Relevantes"}
                <button
                  onClick={() => updateFilter("sort", null)}
                  className="ml-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remover filtro</span>
                </button>
              </Badge>
            )}
            {currentColor && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {currentColor}
                <button
                  onClick={() => updateFilter("color", null)}
                  className="ml-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remover filtro</span>
                </button>
              </Badge>
            )}
            {currentStorage && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {currentStorage}
                <button
                  onClick={() => updateFilter("storage", null)}
                  className="ml-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remover filtro</span>
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Sort */}
      <div>
        <Label htmlFor="sort" className="text-sm font-medium">
          Ordenar por
        </Label>
        <Select
          value={currentSort}
          onValueChange={(value) => updateFilter("sort", value)}
        >
          <SelectTrigger id="sort">
            <SelectValue placeholder="Seleccionar orden" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Más Relevantes</SelectItem>
            <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="newest">Más Recientes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Storage */}
      <div>
        <Label className="text-sm font-medium">Almacenamiento</Label>
        <RadioGroup
          value={currentStorage}
          onValueChange={(value) => updateFilter("storage", value)}
          className="mt-2 space-y-2"
        >
          {storageOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`storage-${option}`} />
              <Label htmlFor={`storage-${option}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Color */}
      <div>
        <Label className="text-sm font-medium">Color</Label>
        <RadioGroup
          value={currentColor}
          onValueChange={(value) => updateFilter("color", value)}
          className="mt-2 space-y-2"
        >
          {colorOptions[category].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`color-${option}`} />
              <Label htmlFor={`color-${option}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
