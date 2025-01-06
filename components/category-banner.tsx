import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryBannerProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  isReversed?: boolean;
}

export function CategoryBanner({
  title,
  description,
  imageSrc,
  href,
  isReversed = false,
}: CategoryBannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[4rem] shadow-lg",
        "transition-transform duration-300 hover:scale-[1.02]",
        "group cursor-pointer"
      )}
    >
      <Link href={href} className="block">
        <div className="relative h-[400px] w-full">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r from-black/70 to-transparent",
              isReversed && "bg-gradient-to-l"
            )}
          />
        </div>
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-center p-8 text-white",
            isReversed ? "items-end text-right" : "items-start text-left"
          )}
        >
          <div className="flex items-center mb-4">
            <Image
              src="/marcas/apple_blanco.png"
              alt="Apple Logo"
              width={50}
              height={50}
              className="mr-2"
            />
            <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
          </div>
          <p className="text-lg max-w-md mb-6">{description}</p>
          <span
            className={cn(
              "inline-flex items-center text-sm font-semibold tracking-wider uppercase",
              "transition-transform duration-300 group-hover:translate-x-2",
              isReversed && "flex-row-reverse"
            )}
          >
            Explorar {title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "h-4 w-4 ml-2",
                isReversed && "mr-2 ml-0 rotate-180"
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
}
