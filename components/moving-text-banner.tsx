"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextBandProps {
  children: React.ReactNode;
  backgroundColor: string;
  textColor: string;
  direction?: number;
  isBottom?: boolean;
}

function TextBand({
  children,
  backgroundColor,
  textColor,
  direction = 1,
  isBottom,
}: TextBandProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let xPercent = 0;
    let animationDirection = direction;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(sliderRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.5,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (animationDirection = e.direction * -1 * direction),
      },
    });

    function animate() {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      if (firstTextRef.current && secondTextRef.current) {
        gsap.set(firstTextRef.current, { xPercent: xPercent });
        gsap.set(secondTextRef.current, { xPercent: xPercent });
      }

      requestAnimationFrame(animate);
      xPercent += 0.005 * animationDirection; // Super slow animation speed
    }

    requestAnimationFrame(animate);

    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [direction]);

  return (
    <div
      className={`relative flex overflow-hidden w-full transform ${
        isBottom ? "-rotate-2 -translate-y-6" : "rotate-2"
      }`}
      style={{
        backgroundColor,
        zIndex: isBottom ? 0 : 1,
      }}
      ref={sliderRef}
    >
      <div
        className="flex whitespace-nowrap min-w-full"
        style={{ color: textColor }}
      >
        <div
          ref={firstTextRef}
          className="flex-none py-6 text-2xl font-bold tracking-tight px-4"
        >
          {children}
        </div>
        <div
          ref={secondTextRef}
          className="flex-none py-6 text-2xl font-bold tracking-tight px-4"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// Super slow moving text banner
export function MovingTextBanner() {
  const text =
    "🚨 DESCUBRE LAS OFERTAS MÁS INCREÍBLES 🚨 NO TE LO PIERDAS 🔥 COMPRA AHORA Y AHORRA MÁS 🔥 SOLO POR TIEMPO LIMITADO ".repeat(
      12
    );

  return (
    <div className="relative w-full overflow-hidden py-9">
      <TextBand backgroundColor="black" textColor="white" direction={1}>
        {text}
      </TextBand>
      <TextBand
        backgroundColor="#f3f4f6"
        textColor="black"
        direction={-1}
        isBottom
      >
        {text}
      </TextBand>
    </div>
  );
}
