"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { cn } from '@/lib/utils'; // Removed unused import
import { formatPrice } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  nombre: string;
  precio: number;
  precio_original: number; // Add original price
  imagenes: string[];
}

export function EnhancedSearchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = useCallback(async (term: string) => {
    if (term.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("productos")
        .select("id, nombre, precio, precio_original, imagenes") // Select original price
        .ilike("nombre", `%${term}%`)
        .limit(5);

      if (error) {
        console.error("Error searching products:", error);
        setSearchResults([]);
        return;
      }

      setSearchResults(data || []);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const handleInputFocus = () => {
    if (searchTerm && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const calculateDiscount = (precio: number, precio_original: number) => {
    if (!precio_original || precio_original <= precio) return 0;
    return Math.round(((precio_original - precio) / precio_original) * 100);
  };

  return (
    <div className="relative flex-1 w-full max-w-md group">
      <div className="relative">
        <Input
          type="search"
          placeholder="¿Qué estás buscando?"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-full pl-10 pr-10 py-2 bg-white border-2 border-gray-200 text-gray-800 rounded-full shadow-sm transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:outline-none text-sm sm:text-base"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-primary hover:bg-transparent transition-colors duration-300"
          onClick={() => handleSearch(searchTerm)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Buscar</span>
        </Button>
      </div>
      {showResults && searchTerm && (
        <ul className="fixed sm:absolute top-[60px] sm:top-full left-0 w-full sm:w-auto sm:min-w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[calc(100vh-120px)] sm:max-h-80 overflow-y-auto mt-2 transition-all duration-300 opacity-0 translate-y-2 group-focus-within:opacity-100 group-focus-within:translate-y-0">
          {searchResults.length > 0 ? (
            searchResults.map((product) => {
              const discount = calculateDiscount(
                product.precio,
                product.precio_original
              );
              return (
                <li
                  key={product.id}
                  className="border-b border-gray-100 last:border-b-0 transition-colors duration-200 hover:bg-gray-50"
                >
                  <Link
                    href={`/producto/${product.id}`}
                    className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-3"
                  >
                    <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={product.imagenes[0] || "/placeholder.svg"}
                        alt={product.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-gray-800 truncate text-sm sm:text-base">
                          {product.nombre}
                        </p>
                        {discount > 0 && (
                          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            -{discount}%
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {formatPrice(product.precio)}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-3 text-center text-gray-500">
              No se encontraron resultados para &quot;{searchTerm}&quot;
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
