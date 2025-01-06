import { Metadata } from "next";
import { CategoryBanner } from "@/components/category-banner";

export const metadata: Metadata = {
  title: "iPad | Nytek",
  description:
    "Explora nuestra línea completa de iPads, desde el compacto iPad mini hasta el potente iPad Pro.",
};

export default function iPadPage() {
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="space-y-12">
        <CategoryBanner
          title="iPad Pro"
          description="El iPad más potente, con chip M4 y pantalla Liquid Retina XDR. Perfecto para profesionales creativos."
          imageSrc="/publicidad/categorias/ipad_pro_banner.webp"
          href="/categoria/ipads/ipad-pro"
        />

        <CategoryBanner
          title="iPad Air"
          description="Delgado, ligero y potente. El equilibrio perfecto entre rendimiento y portabilidad."
          imageSrc="/publicidad/categorias/ipad_air_banner.webp"
          href="/categoria/ipads/ipad-air"
          isReversed
        />

        <CategoryBanner
          title="iPad"
          description="Versátil y asequible. El iPad para todos, perfecto para el día a día."
          imageSrc="/publicidad/categorias/ipad_banner.webp"
          href="/categoria/ipads/ipad"
        />

        <CategoryBanner
          title="iPad mini"
          description="Compacto pero poderoso. Todo el poder del iPad en un tamaño que cabe en tu mano."
          imageSrc="/publicidad/categorias/ipad_mini_banner.webp"
          href="/categoria/ipads/ipad-mini"
          isReversed
        />
      </div>
    </div>
  );
}
