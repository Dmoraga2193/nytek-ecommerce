import { HeroCarousel } from "@/components/hero-carousel";
import { FlashSales } from "@/components/flash-sales";
import { FullScreenVideo } from "@/components/full-screen-video";
import { CategoriesShowcase } from "@/components/categories-showcase";
import { MovingTextBanner } from "@/components/moving-text-banner";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <FullScreenVideo src="/video/video_inicial_2.webm" />

      <div className="w-full max-w-[100vw]">
        <div className="container mx-auto px-4 py-6">
          {/* Hero Section */}
          <div className="mb-12">
            <HeroCarousel />
          </div>
        </div>

        {/* Moving Text Banner - Full Width */}
        <div className="w-full">
          <MovingTextBanner />
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Flash Sales Section */}
          <section className="mb-12">
            <FlashSales />
          </section>

          {/* Categories Showcase */}
          <section className="mb-12">
            <CategoriesShowcase />
          </section>
        </div>
      </div>
    </div>
  );
}
