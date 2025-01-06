"use client";

import { useRef, useEffect } from "react";

interface FullScreenVideoProps {
  src: string;
}

export function FullScreenVideo({ src }: FullScreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-[4rem]"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={src} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Text Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center rounded-[4rem]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Descubre el Futuro de la Tecnología
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Encuentra el nuevo iPhone 16 y toda la línea de productos Apple.
            Innovación, diseño y rendimiento excepcional, todo en un solo lugar.
          </p>
        </div>
      </div>
    </div>
  );
}
