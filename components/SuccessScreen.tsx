"use client";

import { CHAIN } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import Logo from "./Logo";

/**
 * Post-donation success screen.
 * - Logo above animated checkmark
 * - Transaction hash linked to Sepolia Basescan
 * - NFT minting placeholder (spinner)
 * - Button to view dashboard
 */
export default function SuccessScreen() {
  const { treeCount, txHash, setShowDashboard } = useAppStore();

  return (
    <div className="text-center">
      {/* Logo above the checkmark */}
      <div className="mb-6 opacity-70">
        <Logo size="sm" />
      </div>

      {/* Animated checkmark */}
      <div className="w-20 h-20 mx-auto mb-6" style={{ animation: "checkPop 0.5s ease-out forwards" }}>
        <svg viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="#6B9B4A"
            strokeWidth="2.5"
            style={{
              strokeDasharray: 220,
              strokeDashoffset: 220,
              animation: "checkCircle 0.6s ease-out 0.2s forwards",
            }}
          />
          <path
            d="M24 42l10 10 22-24"
            fill="none"
            stroke="#4A7C2E"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 48,
              strokeDashoffset: 48,
              animation: "checkMark 0.4s ease-out 0.6s forwards",
            }}
          />
        </svg>
      </div>

      <h2
        className="font-display text-brand-jungle text-3xl sm:text-4xl mb-3"
        style={{ fontWeight: 500 }}
      >
        Your tree{treeCount > 1 ? "s have" : " has"} been{" "}
        <span className="italic" style={{ fontVariationSettings: '"SOFT" 80' }}>planted.</span>
      </h2>
      <p className="text-sm text-brand-text-mid mb-8">
        {treeCount} tree{treeCount > 1 ? "s" : ""} for the Peruvian Amazon 🌱
      </p>

      {/* Transaction hash */}
      <div className="bg-white rounded-2xl p-5 mb-3 text-left border border-brand-text-dark/8 shadow-sm">
        <p className="label-small text-brand-text-light mb-1.5">Transaction</p>
        <a
          href={txHash ? `${CHAIN.explorer}/tx/${txHash}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-brand-green font-mono break-all no-underline hover:underline"
        >
          {txHash ? `${txHash.slice(0, 22)}…${txHash.slice(-10)}` : "Pending…"} ↗
        </a>
      </div>

      {/* NFT minting status */}
      <div className="bg-white rounded-2xl p-5 mb-8 text-left border border-brand-text-dark/8 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-block w-4 h-4 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
          <p className="text-sm text-brand-text-dark">
            Your Planet-A-mor NFT is being minted…
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowDashboard(true)}
        className="btn-press bg-brand-jungle text-white px-9 py-3.5 rounded-full font-medium text-sm border-0 cursor-pointer hover:bg-brand-black transition-colors"
      >
        View your dashboard →
      </button>
    </div>
  );
}
