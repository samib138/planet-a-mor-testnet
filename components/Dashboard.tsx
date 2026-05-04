"use client";

import { useAccount } from "wagmi";
import { CHAIN, IMAGES, LINKS } from "@/lib/constants";
import { useAppStore, type DashboardTab } from "@/lib/store";
import Logo from "./Logo";
import TestnetBadge from "./TestnetBadge";
import StatCountUp from "./StatCountUp";

// ───────────────────────────────────────────────────────────
// Custom SVG icons — 1.5px stroke, currentColor, 24x24 viewBox.
// Replaces emojis throughout. Inline so no new dependency.
// ───────────────────────────────────────────────────────────

type IconProps = { className?: string };

function IconTree({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L7 9h3l-3 5h3l-3 5h10l-3-5h3l-3-5h3z" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function IconTicket({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 100-4V8z" />
      <line x1="13" y1="6" x2="13" y2="18" strokeDasharray="2 2" />
    </svg>
  );
}

function IconGlobe({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a13 13 0 010 18M12 3a13 13 0 000 18" />
    </svg>
  );
}

function IconCloud({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 18a4 4 0 000-8 6 6 0 00-11.5 1.5A4 4 0 006 18h11z" />
    </svg>
  );
}

function IconLeaf({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 014 13V5a9 9 0 019 9 7 7 0 01-2 5z" />
      <path d="M2 22l9-9" />
    </svg>
  );
}

function IconPeople({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconExternal({ className = "w-3 h-3" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconArrowLeft({ className = "w-3 h-3" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function IconShare({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function IconInfo({ className = "w-3 h-3" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

// ───────────────────────────────────────────────────────────
// Raffle entry seal — used on My Entries tab
// ───────────────────────────────────────────────────────────
function EntryBadge({ className = "w-16 h-16 sm:w-20 sm:h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 text-brand-green-soft ${className}`}
    >
      {/* Outer thin ring */}
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      {/* Dashed mid ring */}
      <circle cx="50" cy="50" r="43" stroke="currentColor" strokeWidth="0.5" opacity="0.5" strokeDasharray="1.5 2.5" />
      {/* Inner filled circle */}
      <circle cx="50" cy="50" r="36" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.6" />

      {/* Three-tier pine tree silhouette */}
      <path
        d="M50 22 L42 38 L46 38 L36 50 L42 50 L30 64 L70 64 L58 50 L64 50 L54 38 L58 38 Z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Trunk */}
      <rect
        x="47" y="64" width="6" height="10"
        fill="currentColor"
        fillOpacity="0.35"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      {/* Ground line */}
      <line
        x1="28" y1="74" x2="72" y2="74"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
      />

      {/* Cardinal dots */}
      <circle cx="50" cy="4" r="1.2" fill="currentColor" opacity="0.7" />
      <circle cx="96" cy="50" r="1.2" fill="currentColor" opacity="0.7" />
      <circle cx="50" cy="96" r="1.2" fill="currentColor" opacity="0.7" />
      <circle cx="4" cy="50" r="1.2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
// ───────────────────────────────────────────────────────────
// Tab definitions
// ───────────────────────────────────────────────────────────
const TABS: {
  key: DashboardTab;
  label: string;
  Icon: React.ComponentType<IconProps>;
}[] = [
  { key: "trees", label: "My Trees", Icon: IconTree },
  { key: "entries", label: "My Entries", Icon: IconTicket },
  { key: "impact", label: "Impact", Icon: IconGlobe },
];

/**
 * Post-purchase dashboard.
 *
 * Klima-native visual treatment:
 * - Full-page jungle backdrop, heavily darkened — recedes behind data layer
 * - Cards: dark glass on dark, hairline borders, no decorative chrome
 * - Numbers and on-chain proof are the heroes
 * - Ashaninka framed as protagonists on Impact tab, not background context
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

  // X share intent — works on testnet (composes a tweet). Tagged (testnet)
  // in copy so screenshots can't be passed off as mainnet impact.
  const shareUrl = (() => {
    const txLink = txHash ? `${CHAIN.explorer}/tx/${txHash}` : LINKS.website;
    const text = `I just helped reforest the Amazon with @planetamor. ${totalTrees} tree${totalTrees > 1 ? "s" : ""} planted on-chain. (testnet)`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(txLink)}`;
  })();

  const treeItems =
    donations.length > 0
      ? donations
      : [{ treeCount, txHash, timestamp: new Date().toISOString(), tokenSymbol: "USDC" }];

  return (
    <div className="fixed inset-0 z-[900] overflow-y-auto">
      {/* Full-page jungle backdrop */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('${IMAGES.dashboard}')` }}
      />
      {/* Heavier dark overlay — pushes background behind data layer (Klima feel) */}
      <div
        className="fixed inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,17,10,0.88) 0%, rgba(12,17,10,0.94) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 glass-panel-dark px-6 py-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="light" />
            <span
              className="text-white/90 font-display text-base"
              style={{ fontWeight: 500 }}
            >
              Dashboard
            </span>
            <TestnetBadge variant="light" />
          </div>
          <button
            onClick={() => setShowDashboard(false)}
            className="btn-press bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 rounded-full text-xs font-medium border-0 cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <IconArrowLeft />
            Back to site
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
                  flex items-center justify-center gap-2
                  ${
                    active
                      ? "text-white border-b-2 border-brand-green-soft"
                      : "text-white/50 hover:text-white/80 border-b-2 border-transparent"
                  }
                `}
              >
                <t.Icon />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="px-6 py-10 max-w-[880px] mx-auto pb-24">
          {/* ─── My Trees ─── */}
          {dashboardTab === "trees" && (
            <div>
              <div className="mb-8">
                <p className="label-small text-white/60 mb-2">Your Collection</p>
                <h2
                  className="font-display text-white text-3xl sm:text-4xl"
                  style={{ fontWeight: 500 }}
                >
                  Your trees on-chain.
                </h2>
              </div>

              <div
                className={
                  treeItems.length > 1
                    ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
                    : "max-w-xl"
                }
              >
                {treeItems.map((d, i) => (
                  <div
                    key={i}
                    className="glass-panel-dark rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
                  >
                    {/* NFT image — real tree photo, full bleed */}
                    <div
                      className="relative w-full h-56 overflow-hidden bg-cover bg-center"
                      style={{ backgroundImage: `url('${IMAGES.story1}')` }}
                    >
                      {/* Subtle dark overlay for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                      {/* Token id — top-left, monospace, treated as serial */}
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[10px] text-white/90 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md tracking-wider uppercase">
                          #{String(1000 + i).padStart(4, "0")}
                        </span>
                      </div>
                      {/* Logo watermark — bottom-right */}
                      <div className="absolute bottom-3 right-3 opacity-90">
                        <Logo size="xs" variant="light" />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="p-5 sm:p-6">
                      <p className="label-small text-white/50 mb-2">
                        Planet-A-mor Tree NFT
                      </p>
                      <p
                        className="font-display text-white text-2xl mb-1"
                        style={{ fontWeight: 500 }}
                      >
                        {d.treeCount} Tree{d.treeCount > 1 ? "s" : ""} Planted
                      </p>
                      <p className="text-xs text-white/50 mb-4">
                        {new Date(d.timestamp).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="space-y-2 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center">
                          <span className="label-small text-white/50">Wallet</span>
                          <span className="text-[11px] font-mono text-white/85">
                            {short}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="label-small text-white/50">Transaction</span>
                          {d.txHash ? (
                            <a
                              href={`${CHAIN.explorer}/tx/${d.txHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-mono text-brand-green-soft hover:text-white inline-flex items-center gap-1 transition-colors"
                            >
                              {d.txHash.slice(0, 8)}…{d.txHash.slice(-6)}
                              <IconExternal />
                            </a>
                          ) : (
                            <span className="text-[11px] font-mono text-white/40">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── My Entries ─── */}
          {dashboardTab === "entries" && (
            <div>
              <div className="mb-8">
                <p className="label-small text-white/60 mb-2">Raffle Status</p>
                <h2
                  className="font-display text-white text-3xl sm:text-4xl"
                  style={{ fontWeight: 500 }}
                >
                  Your entries.
                </h2>
              </div>
<div className="glass-panel-dark border border-white/10 rounded-2xl p-6 sm:p-7">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-5 min-w-0">
                    <EntryBadge />
                    <div className="min-w-0">
                      <p
                        className="font-display text-white text-xl sm:text-2xl mb-2"
                        style={{ fontWeight: 500 }}
                      >
                        {totalTrees} tree{totalTrees > 1 ? "s" : ""} donation
                      </p>
                      {txHash && (
                        <a
                          href={`${CHAIN.explorer}/tx/${txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-brand-green-soft hover:text-white inline-flex items-center gap-1 transition-colors"
                        >
                          {txHash.slice(0, 10)}…{txHash.slice(-8)}
                          <IconExternal />
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="label-small text-brand-green-soft px-3 py-1.5 rounded-full border border-brand-green-soft/30 inline-flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green-soft animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="mt-5 pt-5 border-t border-white/10">
                  <p className="text-sm text-white/65 leading-[1.65]">
                    Winners selected on-chain Q1 2026 via Chainlink VRF —
                    verifiable, tamper-proof randomness. If you&apos;re selected,
                    we&apos;ll email the address on file.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── Impact ─── */}
          {dashboardTab === "impact" && (
            <div>
              <div className="mb-8">
                <p className="label-small text-white/60 mb-2">Your Footprint</p>
                <h2
                  className="font-display text-white text-3xl sm:text-4xl"
                  style={{ fontWeight: 500 }}
                >
                  Your forest is growing.
                </h2>
              </div>

              {/* Stats grid — left-aligned, data-forward */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <StatCard
                  Icon={IconTree}
                  value={<StatCountUp end={totalTrees} />}
                  label="Trees Planted"
                />
                <StatCard
                  Icon={IconCloud}
                  value={<StatCountUp end={totalTrees * 22} suffix=" kg" />}
                  label="CO₂ / yr est."
                  tooltip="Estimate based on average annual sequestration of a young tropical hardwood. Verified per-tree on mainnet."
                />
                <StatCard
                  Icon={IconLeaf}
                  value={<StatCountUp end={totalTrees * 4} suffix=" m²" />}
                  label="Amazon Protected"
                />
                <StatCard
                  Icon={IconPeople}
                  value="Ashaninka"
                  label="Community Supported"
                  isText
                />
              </div>

              {/* Ashaninka story card — they are the protagonists */}
              <div className="glass-panel-dark border border-white/10 rounded-2xl overflow-hidden">
                <div
                  className="h-56 sm:h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url('${IMAGES.story5}')` }}
                />
                <div className="p-6 sm:p-8">
                  <p className="label-small text-brand-green-soft mb-3">
                    Stewards of this forest
                  </p>
                  <p
                    className="font-display text-white text-2xl sm:text-3xl mb-4"
                    style={{ fontWeight: 500, lineHeight: 1.2 }}
                  >
                    The Ashaninka have protected this land for{" "}
                    <span
                      className="italic"
                      style={{ fontVariationSettings: '"SOFT" 80' }}
                    >
                      generations.
                    </span>
                  </p>
                  <p className="text-sm text-white/70 leading-[1.75] mb-5">
                    The Ashaninka are an Indigenous people of the Peruvian and
                    Brazilian Amazon. They plant, monitor, and protect the trees on
                    their ancestral territory — reforestation led by the people who
                    call this land home. Your contribution supports their ongoing
                    work.
                  </p>
                  <a
                    href={LINKS.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-green-soft hover:text-white underline transition-colors"
                  >
                    Learn more about the Ashaninka →
                  </a>
                </div>
              </div>

              {/* Share button — opens X intent. Testnet-tagged in copy. */}
              {totalTrees > 0 && (
                <div className="mt-6 flex justify-center">
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-5 py-3 rounded-full text-sm font-medium border border-white/10 hover:border-white/20 transition-all"
                  >
                    <IconShare />
                    Share my impact
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Stat card subcomponent — used on Impact tab
// ───────────────────────────────────────────────────────────
function StatCard({
  Icon,
  value,
  label,
  tooltip,
  isText = false,
}: {
  Icon: React.ComponentType<IconProps>;
  value: React.ReactNode;
  label: string;
  tooltip?: string;
  isText?: boolean;
}) {
  return (
    <div className="glass-panel-dark border border-white/10 rounded-2xl p-4 sm:p-5 relative group">
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-5 h-5 text-brand-green-soft" />
        {tooltip && (
          <div className="relative">
            <IconInfo className="w-3 h-3 text-white/40 group-hover:text-white/70 transition-colors cursor-help" />
            <div className="absolute right-0 top-5 w-56 bg-brand-jungle-deep border border-white/10 rounded-lg p-3 text-[11px] text-white/80 leading-[1.5] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 shadow-xl">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <p
        className={`font-display text-white mb-1 ${
          isText ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
        }`}
        style={{ fontWeight: 500 }}
      >
        {value}
      </p>
      <p className="label-small text-white/50">{label}</p>
    </div>
  );
}
