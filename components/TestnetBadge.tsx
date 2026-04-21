"use client";

/**
 * Small amber "TESTNET" pill shown in the nav.
 * Makes it obvious to the dev team / stakeholders that this is
 * a demo build running on Base Sepolia, not mainnet.
 */
export default function TestnetBadge({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isLight = variant === "light";
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
        font-mono text-[10px] font-semibold tracking-[0.12em] uppercase
        ${isLight
          ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/30 backdrop-blur-sm"
          : "bg-brand-amber-bg text-brand-amber border border-brand-amber/20"
        }
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-brand-gold" : "bg-brand-amber"} animate-pulse`} />
      Testnet
    </span>
  );
}
