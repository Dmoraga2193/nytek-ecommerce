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
    <div className="relative w-full h-screen overflow-hidden rounded-[4rem]">
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
    </div>
  );
}
