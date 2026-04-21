"use client";

import { useAccount } from "wagmi";
import { CHAIN, IMAGES, LINKS } from "@/lib/constants";
import { useAppStore, type DashboardTab } from "@/lib/store";
import Logo from "./Logo";
import TestnetBadge from "./TestnetBadge";
import StatCountUp from "./StatCountUp";

const TABS: { key: DashboardTab; label: string; icon: string }[] = [
  { key: "trees", label: "My Trees", icon: "🌳" },
  { key: "entries", label: "My Entries", icon: "🎟️" },
  { key: "impact", label: "Impact", icon: "🌍" },
];

/**
 * Post-purchase dashboard.
 *
 * Visual treatment:
 * - Full-page Amazon jungle backdrop image
 * - Content rendered on a frosted-glass panel over the image
 * - NFT mockups show the Planet-A-mor logo as a bottom-right watermark
 */
export default function Dashboard() {
  const { address } = useAccount();
  const {
    showDashboard,
    setShowDashboard,
    dashboardTab,
    setDashboardTab,
    treeCount,
    txHash,
    donations,
  } = useAppStore();

  if (!showDashboard) return null;

  const totalTrees = donations.reduce((s, d) => s + d.treeCount, 0) || treeCount;
  const short = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "—";

  return (
    <div className="fixed inset-0 z-[900] overflow-y-auto">
      {/* Full-page jungle backdrop */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('${IMAGES.dashboard}')` }}
      />
      {/* Dark overlay */}
      <div
        className="fixed inset-0 z-[1]"
        style={{
          background: "linear-gradient(180deg, rgba(17,18,16,0.75) 0%, rgba(27,34,24,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 glass-panel-dark px-6 py-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="light" />
            <span className="text-white/90 font-display text-base" style={{ fontWeight: 500 }}>
              Dashboard
            </span>
            <TestnetBadge variant="light" />
          </div>
          <button
            onClick={() => setShowDashboard(false)}
            className="btn-press bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-full text-xs font-medium border-0 cursor-pointer transition-colors"
          >
            ← Back to site
          </button>
        </div>

        {/* Tab bar */}
        <div className="sticky top-[68px] z-10 glass-panel-dark border-b border-white/5 flex">
          {TABS.map((t) => {
            const active = dashboardTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setDashboardTab(t.key)}
                className={`
                  flex-1 py-4 px-2 text-[13px] font-medium border-0 cursor-pointer
                  bg-transparent transition-all
                  ${active
                    ? "text-white border-b-2 border-brand-green-soft"
                    : "text-white/50 hover:text-white/80 border-b-2 border-transparent"
                  }
                `}
              >
                {t.icon} {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="px-6 py-8 max-w-[880px] mx-auto pb-24">
          {/* ─── My Trees ─── */}
          {dashboardTab === "trees" && (
            <div>
              <div className="mb-6">
                <p className="label-small text-white/60 mb-2">Your Collection</p>
                <h2
                  className="font-display text-white text-3xl sm:text-4xl"
                  style={{ fontWeight: 500 }}
                >
                  Your trees on-chain.
                </h2>
              </div>

              {(donations.length > 0 ? donations : [{ treeCount, txHash, timestamp: new Date().toISOString(), tokenSymbol: "USDC" }]).map((d, i) => (
                <div
                  key={i}
                  className="glass-panel rounded-2xl overflow-hidden mb-4"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* NFT card — with logo watermark */}
                    <div
                      className="relative w-full sm:w-48 h-48 shrink-0 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, #1B2218 0%, #4A7C2E 100%)`,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `url('${IMAGES.story1}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          mixBlendMode: "overlay",
                        }}
                      />
                      <div className="relative w-full h-full flex items-center justify-center">
                        <span className="text-6xl">🌳</span>
                      </div>
                      {/* Logo watermark bottom-right */}
                      <div className="absolute bottom-3 right-3 opacity-80">
                        <Logo size="xs" variant="light" />
                      </div>
                      {/* Token id label top-left */}
                      <div className="absolute top-3 left-3">
                        <span className="label-small text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                          #{String(1000 + i).padStart(4, "0")}
                        </span>
                      </div>
                    </div>
                    {/* Metadata */}
                    <div className="flex-1 p-5 sm:p-6">
                      <p className="label-small text-brand-text-light mb-2">
                        Planet-A-mor Tree NFT
                      </p>
                      <p
                        className="font-display text-brand-text-dark text-2xl mb-1"
                        style={{ fontWeight: 500 }}
                      >
                        {d.treeCount} Tree{d.treeCount > 1 ? "s" : ""} Planted
                      </p>
                      <p className="text-xs text-brand-text-mid mb-4">
                        {new Date(d.timestamp).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="space-y-1.5 pt-3 border-t border-brand-text-dark/8">
                        <div className="flex justify-between">
                          <span className="label-small text-brand-text-light">Wallet</span>
                          <span className="text-[11px] font-mono text-brand-text-dark">{short}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="label-small text-brand-text-light">Tx</span>
                          {d.txHash ? (
                            <a
                              href={`${CHAIN.explorer}/tx/${d.txHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-mono text-brand-green hover:underline"
                            >
                              {d.txHash.slice(0, 8)}…{d.txHash.slice(-6)} ↗
                            </a>
                          ) : (
                            <span className="text-[11px] font-mono text-brand-text-light">Pending</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── My Entries ─── */}
          {dashboardTab === "entries" && (
            <div>
              <div className="mb-6">
                <p className="label-small text-white/60 mb-2">Raffle Status</p>
                <h2
                  className="font-display text-white text-3xl sm:text-4xl"
                  style={{ fontWeight: 500 }}
                >
                  Your entries.
                </h2>
              </div>

              <div className="glass-panel rounded-2xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      className="font-display text-brand-text-dark text-xl mb-1"
                      style={{ fontWeight: 500 }}
                    >
                      {totalTrees} tree{totalTrees > 1 ? "s" : ""} donation
                    </p>
                    {txHash && (
                      <a
                        href={`${CHAIN.explorer}/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-brand-green hover:underline"
                      >
                        {txHash.slice(0, 10)}…{txHash.slice(-8)} ↗
                      </a>
                    )}
                  </div>
                  <span className="label-small bg-brand-amber-bg text-brand-amber px-3 py-1.5 rounded-full border border-brand-gold/20">
                    Active
                  </span>
                </div>
                <div className="mt-5 pt-5 border-t border-brand-text-dark/8">
                  <p className="text-sm text-brand-text-mid leading-[1.65]">
                    Winners selected on-chain Q1 2026 via Chainlink VRF. If
                    you&apos;re selected, we&apos;ll email the address on file.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── Impact ─── */}
          {dashboardTab === "impact" && (
            <div>
              <div className="mb-6">
                <p className="label-small text-white/60 mb-2">Your Footprint</p>
                <h2
                  className="font-display text-white text-3xl sm:text-4xl"
                  style={{ fontWeight: 500 }}
                >
                  Your forest is growing.
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { value: totalTrees, label: "Trees Planted", icon: "🌳" },
                  { value: totalTrees * 22, suffix: " kg", label: "CO₂ Offset", icon: "💨" },
                  { value: totalTrees * 4, suffix: " m²", label: "Amazon Protected", icon: "🌿" },
                  { value: 1, label: "Community Supported", icon: "👥", text: "Ashaninka" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="glass-panel rounded-2xl p-5 text-center"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <p
                      className="font-display text-brand-jungle text-2xl mb-1"
                      style={{ fontWeight: 500 }}
                    >
                      {stat.text ?? <StatCountUp end={stat.value} suffix={stat.suffix || ""} />}
                    </p>
                    <p className="label-small text-brand-text-light">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Story card */}
              <div className="glass-panel rounded-2xl overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${IMAGES.story5}')` }}
                />
                <div className="p-6">
                  <p
                    className="font-display text-brand-text-dark text-2xl mb-3"
                    style={{ fontWeight: 500 }}
                  >
                    Every tree you plant becomes part of a{" "}
                    <span className="italic" style={{ fontVariationSettings: '"SOFT" 80' }}>
                      living ecosystem.
                    </span>
                  </p>
                  <p className="text-sm text-brand-text-mid leading-[1.75]">
                    Your donation supports Ashaninka families who plant, monitor,
                    and protect the trees for generations. This is reforestation
                    done with the people who call the Amazon home.
                  </p>
                  <a
                    href={LINKS.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-brand-green hover:text-brand-jungle underline transition-colors"
                  >
                    Learn more about our work →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
