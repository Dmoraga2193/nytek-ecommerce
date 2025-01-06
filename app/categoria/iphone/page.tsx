import { Metadata } from "next";
import { CategoryBanner } from "@/components/category-banner";

export const metadata: Metadata = {
  title: "iPhone | Nytek",
  description:
    "Explora nuestra gama de iPhones, desde el último modelo hasta los clásicos favoritos.",
};

export default function iPhonePage() {
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="space-y-12">
        <CategoryBanner
          title="iPhone 16"
          description="Lo último en tecnología móvil. Descubre el futuro en tus manos."
          imageSrc="/publicidad/categorias/iphone_16_banner.webp"
          href="/categoria/iphone/iphone-16"
        />

        <CategoryBanner
          title="iPhone 15"
          description="Potencia y estilo en un diseño elegante. Cámara avanzada y rendimiento excepcional."
          imageSrc="/publicidad/categorias/iphone_15_banner.webp"
          href="/categoria/iphone/iphone-15"
          isReversed
        />

        <CategoryBanner
          title="iPhone 14"
          description="Rendimiento confiable y características innovadoras a un precio accesible."
          imageSrc="/publicidad/categorias/iphone_14_banner.webp"
          href="/categoria/iphone/iphone-14"
        />

        <CategoryBanner
          title="iPhone 13"
          description="Un clásico moderno con un gran equilibrio entre rendimiento y valor."
          imageSrc="/publicidad/categorias/iphone_13_banner.webp"
          href="/categoria/iphone/iphone-13"
          isReversed
        />
      </div>
    </div>
  );
}
