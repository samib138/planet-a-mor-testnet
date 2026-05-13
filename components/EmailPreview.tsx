"use client";

import { CHAIN, IMAGES } from "@/lib/constants";
import Logo from "./Logo";

interface EmailPreviewProps {
  recipientEmail: string;
  treeCount: number;
  txHash: string;
  walletAddress?: string;
  onDashboardClick?: () => void;
}

/**
 * <EmailPreview /> — Gmail-style mockup of the confirmation email.
 *
 * DEV TEAM: This is intentionally standalone. In production, lift the
 * inner email body (everything inside .email-body) and feed it to your
 * email service (Resend / SendGrid / Postmark). The outer Gmail chrome
 * (subject, from, etc.) is only for this demo preview.
 *
 * The inner body is pure HTML-safe styling — no JS behavior required to
 * render as an email.
 */
export default function EmailPreview({
  recipientEmail,
  treeCount,
  txHash,
  walletAddress,
  onDashboardClick,
}: EmailPreviewProps) {
  const explorerLink = txHash ? `${CHAIN.explorer}/tx/${txHash}` : "#";
  const shortTx = txHash ? `${txHash.slice(0, 10)}…${txHash.slice(-8)}` : "—";
  const shortWallet = walletAddress ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}` : "";

  return (
    <div className="w-full max-w-[540px] mx-auto">
      {/* Sent confirmation banner */}
      <div className="mb-4 bg-brand-green/10 border border-brand-green/30 rounded-xl px-4 py-3 flex items-start gap-2.5">
        <span className="text-base leading-none mt-0.5">✓</span>
        <p className="text-[12px] text-brand-text-mid leading-relaxed">
          <strong className="text-brand-jungle">Sent.</strong> A copy of this email
          just landed at{" "}
          <code className="font-mono text-brand-text-dark bg-white/60 px-1.5 py-0.5 rounded">
            {recipientEmail || "you@example.com"}
          </code>
        </p>
      </div>

      {/* Gmail-style chrome */}
      <div className="rounded-2xl overflow-hidden shadow-[0_16px_60px_rgba(27,34,24,0.15)] bg-white">
        {/* Header: from/to/subject */}
        <div className="px-5 py-4 border-b border-brand-text-dark/6 bg-[#FBFBFB]">
          <div className="flex items-start gap-3">
            {/* Sender avatar */}
            <div
              className="w-10 h-10 rounded-full bg-brand-jungle flex items-center justify-center shrink-0 overflow-hidden"
            >
              <span className="text-white font-display text-base" style={{ fontWeight: 600 }}>
                P
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-medium text-brand-text-dark truncate">
                  Planet-A-mor
                </p>
                <p className="text-[11px] text-brand-text-light font-mono shrink-0">
                  now
                </p>
              </div>
              <p className="text-[11px] text-brand-text-light truncate">
                hello@planet-a-mor.org → {recipientEmail || "you@example.com"}
              </p>
              <p className="text-[14px] font-medium text-brand-text-dark mt-1.5">
                Your tree has been planted 🌱
              </p>
            </div>
          </div>
        </div>

        {/* ═══ EMAIL BODY (lift this for production) ═══ */}
        <div className="email-body">
          {/* Logo header */}
          <div className="px-8 pt-10 pb-6 text-center border-b border-brand-text-dark/5">
            <Logo size="md" />
          </div>

          {/* Hero image */}
          <div
            className="h-44 bg-cover bg-center"
            style={{ backgroundImage: `url('${IMAGES.hero}')` }}
          >
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(to bottom, rgba(17,18,16,0.2), rgba(27,34,24,0.5))",
              }}
            />
          </div>

          {/* Body content */}
          <div className="px-8 py-8">
            <h1
              className="font-display text-brand-text-dark text-[28px] leading-[1.15] mb-4"
              style={{ fontWeight: 500 }}
            >
              Your tree has been{" "}
              <span className="italic" style={{ fontVariationSettings: '"SOFT" 80' }}>
                planted.
              </span>{" "}
              🌱
            </h1>

            <p className="text-[14px] text-brand-text-mid leading-[1.75] mb-6">
              Thank you for planting {treeCount} tree{treeCount > 1 ? "s" : ""}{" "}
              in the Peruvian Amazon. Your donation is now on-chain and your
              raffle entry is active. A Planet-A-mor NFT has been minted to
              your wallet as proof of your contribution.
            </p>

            {/* Receipt card */}
            <div className="bg-brand-cream rounded-xl p-5 mb-6 border border-brand-text-dark/5">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="label-small text-brand-text-light mb-1">Trees</p>
                  <p className="font-display text-2xl text-brand-jungle" style={{ fontWeight: 500 }}>
                    {treeCount}
                  </p>
                </div>
                <div>
                  <p className="label-small text-brand-text-light mb-1">Donated</p>
                  <p className="font-display text-2xl text-brand-jungle" style={{ fontWeight: 500 }}>
                    ${treeCount * 5}
                  </p>
                </div>
                <div className="col-span-2 pt-3 border-t border-brand-text-dark/8">
                  <p className="label-small text-brand-text-light mb-1">Transaction</p>
                  <a
                    href={explorerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-mono text-brand-green hover:underline break-all"
                  >
                    {shortTx} ↗
                  </a>
                </div>
                {shortWallet && (
                  <div className="col-span-2">
                    <p className="label-small text-brand-text-light mb-1">Wallet</p>
                    <p className="text-[12px] font-mono text-brand-text-mid">
                      {shortWallet}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Raffle confirmation */}
            <div
              className="rounded-xl p-5 mb-6"
              style={{
                background: "linear-gradient(135deg, #FDF6E7 0%, #F7EDD3 100%)",
                borderLeft: "3px solid #C49B2A",
              }}
            >
              <p className="font-display text-[17px] text-brand-text-dark mb-1" style={{ fontWeight: 500 }}>
                🎟️ Your raffle entry is active
              </p>
              <p className="text-[13px] text-brand-text-mid leading-[1.65]">
                You&apos;re entered to win eco prizes + an 11-day Amazon
                expedition. Winners announced Q4 2026 via Chainlink VRF.
              </p>
            </div>

            {/* Impact block */}
            <div className="bg-brand-jungle rounded-xl p-6 mb-6 text-center text-white">
              <p className="label-small text-white/60 mb-2">Your Impact</p>
              <p
                className="font-display text-3xl mb-2"
                style={{ fontWeight: 500 }}
              >
                Your forest is growing.
              </p>
              <p className="text-[12px] text-white/70 leading-relaxed">
                {(treeCount * 22).toLocaleString()} kg CO₂ offset ·{" "}
                {(treeCount * 4).toLocaleString()} m² rainforest protected
              </p>
            </div>

            {/* CTA */}
            <div className="text-center mb-6">
              <button
                type="button"
                onClick={onDashboardClick}
                className="inline-block bg-brand-jungle text-white border-0 px-8 py-3 rounded-full font-medium text-[14px] cursor-pointer hover:bg-brand-black transition-colors"
              >
                View your dashboard →
              </button>
            </div>

            <p className="text-[12px] text-brand-text-light leading-[1.7] text-center">
              Questions? Reply to this email or visit{" "}
              <a href="https://www.planet-a-mor.org" className="text-brand-green underline">
                planet-a-mor.org
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-[#FBFBFB] border-t border-brand-text-dark/5 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Logo size="xs" />
              <span className="font-mono text-[10px] text-brand-text-light tracking-wider uppercase">
                B-Corp Certified
              </span>
            </div>
            <p className="text-[11px] text-brand-text-light leading-relaxed mb-2">
              Planet-A-mor · Tournavista, Peru
            </p>
            <p className="text-[10px] text-brand-text-light/70">
              You received this email because you planted a tree with us.{" "}
              <a href="#" className="text-brand-text-light underline">
                Unsubscribe
              </a>
            </p>
          </div>
        </div>
        {/* ═══ /EMAIL BODY ═══ */}
      </div>
    </div>
  );
}
