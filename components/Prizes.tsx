"use client";

import { IMAGES } from "@/lib/constants";
import Section from "./Section";

// ─── Inline icons (Lucide-style, 1.5px stroke) ─────────────
function GiftIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C9 3 12 8 12 8H7.5z" />
      <path d="M16.5 8a2.5 2.5 0 0 0 0-5C15 3 12 8 12 8h4.5z" />
    </svg>
  );
}

function TreeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2 L17 10 L14 10 L19 18 L5 18 L10 10 L7 10 Z" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  );
}

function PlaneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 3 3 10l7 4 4 7 7-18z" />
      <path d="M10 14l4-4" />
    </svg>
  );
}

const PRIZES = [
  {
    image: "/images/bannana.jpg",
    Icon: GiftIcon,
    title: "Eco Discounts",
    desc: "Exclusive discounts on future tree packages and Planet-A-mor merchandise.",
    accent: "#4A7C2E",
  },
  {
    image: "/images/tree-3ladies.jpg",
    Icon: TreeIcon,
    title: "Free Trees + ROI",
    desc: "Free tree packages with return on retail value. Your forest grows for free.",
    accent: "#6B9B4A",
  },
  {
    image: "/images/grand-prize.jpg",
    Icon: PlaneIcon,
    title: "Trip to Peru 2026",
    desc: "Grand prize: 11-day Amazon expedition. Sail the river, walk among your trees, meet the Ashaninka.",
    accent: "#C49B2A",
    featured: true,
  },
];

/**
 * Prizes — photo-forward cards with hover lift + image zoom.
 */
export default function Prizes() {
  return (
    <Section id="prizes" className="bg-brand-cream">
      <div className="max-w-[720px] mx-auto text-center mb-16">
        <p className="label-small text-brand-gold mb-4">Raffle & Prizes</p>
        <h2
          className="font-display text-brand-text-dark text-4xl sm:text-5xl mb-5"
          style={{ fontWeight: 500 }}
        >
          What you could{" "}
          <span className="italic" style={{ fontVariationSettings: '"SOFT" 80' }}>win.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {PRIZES.map((prize, i) => (
          <article
            key={i}
            className={`
              group relative overflow-hidden rounded-2xl bg-white
              border border-brand-text-dark/5
              transition-all duration-500 ease-out
              hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]
              ${prize.featured ? "md:col-span-1 ring-1 ring-brand-gold/30" : ""}
            `}
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                style={{ backgroundImage: `url('${prize.image}')` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 40%, rgba(17,18,16,0.6) 100%)",
                }}
              />
              
              {prize.featured && (
                <span className="absolute top-4 right-4 label-small bg-brand-gold text-white px-3 py-1 rounded-full">
                  Grand Prize
                </span>
              )}
            </div>
            <div className="p-6">
              <h3
                className="font-display text-2xl mb-2"
                style={{ fontWeight: 500, color: prize.accent }}
              >
                {prize.title}
              </h3>
              <p className="text-brand-text-mid text-sm leading-[1.7]">
                {prize.desc}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Chainlink VRF badge */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-3 text-sm text-brand-text-mid border border-brand-text-dark/5 font-mono tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          Winner selection verified on-chain via Chainlink VRF
        </span>
      </div>
    </Section>
  );
}
