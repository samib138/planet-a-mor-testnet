"use client";

import { LINKS } from "@/lib/constants";

/**
 * "Built on Base" badge — required for Base Ecosystem Grant branding.
 */
export default function BaseBadge({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isLight = variant === "light";
  return (
    <a
      href={LINKS.base}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] font-semibold
        no-underline transition-all duration-200 hover:scale-[1.03] btn-press
        ${isLight
          ? "bg-white/8 border border-white/12 text-white/75 backdrop-blur-sm"
          : "bg-brand-cream border border-brand-green/10 text-brand-text-mid"
        }
      `}
    >
      <svg width="14" height="14" viewBox="0 0 111 111" fill="none">
        <circle cx="55.5" cy="55.5" r="55.5" fill="#0052FF" />
        <path
          d="M55.5 95C77.315 95 95 77.315 95 55.5S77.315 16 55.5 16C34.89 16 18 31.812 16.18 51.862h52.25v7.276H16.18C18 79.188 34.89 95 55.5 95z"
          fill="#fff"
        />
      </svg>
      Built on Base
    </a>
  );
}
