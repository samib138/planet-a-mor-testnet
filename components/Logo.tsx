"use client";

import { LINKS } from "@/lib/constants";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark";
  className?: string;
  linked?: boolean;
}

const SIZES = {
  xs: "h-6",
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
  xl: "h-24",
} as const;

/**
 * Unified Planet-A-mor logo component.
 * - `variant="light"` applies brightness filter for use on dark backgrounds
 * - `linked={true}` wraps the logo in an anchor to planet-a-mor.org
 */
export default function Logo({
  size = "md",
  variant = "dark",
  className = "",
  linked = false,
}: LogoProps) {
  const img = (
    <img
      src={LINKS.logo}
      alt="Planet-A-mor"
      className={`${SIZES[size]} w-auto object-contain ${
        variant === "light" ? "brightness-[1.15]" : ""
      } ${className}`}
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement;
        el.style.display = "none";
      }}
    />
  );

  if (linked) {
    return (
      <a href={LINKS.website} target="_blank" rel="noopener noreferrer" className="inline-block">
        {img}
      </a>
    );
  }
  return img;
}
