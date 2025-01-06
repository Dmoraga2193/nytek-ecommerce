import { Metadata } from "next";
import { CategoryBanner } from "@/components/category-banner";

export const metadata: Metadata = {
  title: "MacBooks | Nytek",
  description:
    "Descubre nuestra línea de MacBooks, incluyendo MacBook Air y MacBook Pro.",
};

export default function MacBooksPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">MacBooks</h1>
      <p className="text-xl text-gray-600 mb-12">
        Descubre el poder y la elegancia de nuestros MacBooks. Ya sea que
        necesites un dispositivo ultraligero o una potente estación de trabajo
        móvil, tenemos el MacBook perfecto para ti.
      </p>

      <div className="space-y-12">
        <CategoryBanner
          title="MacBook Air"
          description="Increíblemente delgado y ligero. Potenciado por el chip M2 para un rendimiento excepcional."
          imageSrc="/publicidad/categorias/macbook_air_banner.webp"
          href="/categoria/macbooks/macbook-air"
        />

        <CategoryBanner
          title="MacBook Pro"
          description="Rendimiento profesional para las tareas más exigentes. Disponible en 13, 14 y 16 pulgadas."
          imageSrc="/publicidad/categorias/macbook_pro_banner.webp"
          href="/categoria/macbooks/macbook-pro"
          isReversed
        />
      </div>
    </div>
  );
}
