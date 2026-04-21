"use client";

import { LINKS } from "@/lib/constants";
import Logo from "./Logo";
import BaseBadge from "./BaseBadge";
import TestnetBadge from "./TestnetBadge";

/**
 * Site footer.
 */
export default function Footer() {
  return (
    <footer className="bg-brand-jungle-deep py-16 px-6 text-center relative overflow-hidden">
      {/* Subtle gradient top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }}
      />

      <div className="max-w-[640px] mx-auto relative z-10">
        <div className="mb-6 flex justify-center">
          <Logo size="md" variant="light" linked />
        </div>

        <p className="text-sm text-white/55 leading-[1.75] mb-6 max-w-[500px] mx-auto">
          A B-Corp certified reforestation company planting trees in the
          Peruvian Amazon with the indigenous Ashaninka community.
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <a
            href={LINKS.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 hover:text-white no-underline transition-colors"
          >
            Website
          </a>
          <a
            href={LINKS.terms}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 hover:text-white no-underline transition-colors"
          >
            Terms
          </a>
        </div>

        <div className="flex justify-center items-center gap-3 mb-6 flex-wrap">
          <BaseBadge variant="light" />
          <TestnetBadge variant="light" />
        </div>

        <p className="label-small text-white/25">
          © {new Date().getFullYear()} Planet-A-mor · All rights reserved
        </p>
      </div>
    </footer>
  );
}
