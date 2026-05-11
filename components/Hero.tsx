"use client";

import { useEffect, useRef, useState } from "react";
import { IMAGES } from "@/lib/constants";
import Logo from "./Logo";
import BaseBadge from "./BaseBadge";
import TestnetBadge from "./TestnetBadge";
import LeafParticles from "./LeafParticles";

/**
 * Hero — full-bleed Amazon rainforest photo with:
 * - Dark gradient overlay (top 85% opacity → bottom 60%)
 * - Scroll-linked parallax on the image (0.3x scroll speed)
 * - Nav with logo, testnet badge, and "Built on Base" badge
 * - Headline in Fraunces, CTA button to scroll to donation
 * - Leaf particles for atmosphere
 */
export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToDonate = () => {
    document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
  };

  // Parallax: image moves down at 0.3x scroll speed
  const parallaxY = scrollY * 0.3;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-brand-black"
    >
      {/* Parallax background image */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url('${IMAGES.hero}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${parallaxY}px) scale(1.1)`,
          transition: "transform 0.05s linear",
        }}
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(17,18,16,0.85) 0%, rgba(17,18,16,0.55) 40%, rgba(27,34,24,0.75) 100%)`,
        }}
      />

      {/* Subtle atmospheric glow */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          top: "-20%", right: "-15%", width: "55%", height: "70%",
          background: "radial-gradient(circle, rgba(196,155,42,0.12) 0%, transparent 70%)",
        }}
      />

      <LeafParticles />

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 sm:px-8 py-6">
        <div className="flex items-center gap-3">
         <Logo size="xl" variant="light" />
          <TestnetBadge variant="light" />
        </div>
        <BaseBadge variant="light" />
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 pb-20">
        <p className="label-small text-white/60 mb-5 animate-fade-up" style={{ animationDelay: "0ms" }}>
          Peruvian Amazon · Reforestation
        </p>

        <p
          className="font-display italic text-brand-green-soft text-4xl sm:text-5xl md:text-6xl leading-[1.02] mb-3 opacity-0"
          style={{
            fontVariationSettings: '"SOFT" 80',
            fontWeight: 500,
            animation: "fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.075s forwards",
          }}
        >
          Planet-A-mor
        </p>

        <h1
          className="font-display text-white text-[44px] sm:text-6xl md:text-7xl leading-[1.02] mb-6 max-w-[840px] opacity-0"
          style={{
            animation: "fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s forwards",
            fontWeight: 500,
          }}
        >
          Plant a tree.
          <br />
          <span className="italic text-brand-green-soft" style={{ fontVariationSettings: '"SOFT" 80' }}>
            Grow the future.
          </span>
        </h1>

        <p
          className="text-white/70 max-w-[520px] text-base sm:text-lg leading-[1.7] mb-10 opacity-0"
          style={{ animation: "fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.35s forwards" }}
        >
          Every $5 plants a real tree in the Peruvian Amazon with the
          indigenous Ashaninka community — and earns you a chance to win
          life-changing prizes.
        </p>

        <button
          onClick={scrollToDonate}
          className="btn-press opacity-0 bg-brand-cream text-brand-jungle px-9 py-4 rounded-full font-medium text-[15px] border-0 cursor-pointer tracking-wide hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-300"
          style={{ animation: "fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s forwards" }}
        >
          Plant Your Tree — $5
        </button>

        <p
          className="label-small text-white/40 mt-6 opacity-0"
          style={{ animation: "fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.7s forwards" }}
        >
          Stablecoins · Signs in your wallet
        </p>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 pointer-events-none"
        style={{ animation: "fadeUp 1.2s ease-out 1.2s forwards" }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent mx-auto" />
      </div>
{/* Fixed onboarding button */}
      
        href="/onboarding.html"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-brand-jungle/95 backdrop-blur-sm text-brand-cream px-5 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 text-sm font-medium border border-white/10"
      >
        <span>📖</span>
        <span>New here? Start here</span>
        <span aria-hidden="true">→</span>
      </a>
      {/* Organic bottom transition (vignette to next section) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #FAF8F3)",
        }}
      />
    </section>
  );
}
