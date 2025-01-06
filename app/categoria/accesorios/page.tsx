import { Metadata } from "next";
import { CategoryBanner } from "@/components/category-banner";

export const metadata: Metadata = {
  title: "Accesorios Apple | Nytek",
  description:
    "Descubre nuestra colección de accesorios Apple originales, incluyendo AirPods, Apple Watch y cargadores certificados.",
};

export default function AccesoriosPage() {
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="space-y-12">
        <CategoryBanner
          title="AirPods"
          description="Experimenta un sonido excepcional y conectividad perfecta con la línea completa de AirPods."
          imageSrc="/publicidad/categorias/airpods_banner.webp"
          href="/categoria/accesorios/airpods"
        />

        <CategoryBanner
          title="Apple Watch"
          description="Mantente conectado, activo y saludable con el Apple Watch. Descubre todos los modelos disponibles."
          imageSrc="/publicidad/categorias/applewatch_banner.webp"
          href="/categoria/accesorios/apple-watch"
          isReversed
        />

        <CategoryBanner
          title="Cargadores"
          description="Mantén tus dispositivos siempre listos con nuestra selección de cargadores y adaptadores originales Apple."
          imageSrc="/publicidad/categorias/cargadores_banner.webp"
          href="/categoria/accesorios/cargadores"
        />
      </div>
    </div>
  );
}
