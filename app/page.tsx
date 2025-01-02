import { HeroCarousel } from "@/components/hero-carousel";
import { FlashSales } from "@/components/flash-sales";
import { FullScreenVideo } from "@/components/full-screen-video";
import { CategoriesShowcase } from "@/components/categories-showcase";
import { MovingTextBanner } from "@/components/moving-text-banner";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <FullScreenVideo src="/video/video_inicial_2.webm" />
      <div className="container mx-auto px-4 py-6">
        {/* Hero Section with Sidebar */}
        <div className="flex gap-8 mb-12">
          <main className="flex-1">
            <HeroCarousel />
          </main>
        </div>
      </div>

      {/* Moving Text Banner - Full Width */}
      <MovingTextBanner />

      <div className="container mx-auto px-4 py-6">
        {/* Flash Sales Section */}
        <FlashSales />

        {/* Categories Showcase */}
        <CategoriesShowcase />
      </div>
    </div>
  );
}
