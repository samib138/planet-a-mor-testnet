"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { TREE_PRICE_USD, TREE_PRESETS, STABLECOINS, CHAIN } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { useDonation } from "@/lib/useDonation";
import SuccessScreen from "./SuccessScreen";

/**
 * Donation widget — the core conversion surface.
 *
 * Pre-connect state: shows "Connect Wallet" which triggers the injected
 * wallet's popup (MetaMask etc.) via `connect()` from wagmi.
 *
 * Post-connect state: shows tree selector, token picker, balance, gas est,
 * and "Plant Now" button. Clicking Plant Now triggers:
 *   1. Chain switch prompt (wallet popup) if not on Base Sepolia
 *   2. Approve tx (wallet popup)
 *   3. Donate tx (wallet popup)
 *
 * Includes faucet link for testers who need Sepolia ETH.
 */
export default function DonationWidget() {
  const [customInput, setCustomInput] = useState("");
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const {
    treeCount,
    setTreeCount,
    selectedToken,
    setSelectedToken,
    txState,
    txError,
  } = useAppStore();

  const { executeDonation, formattedBalance, totalUsd } = useDonation();

  // Success screen replaces the form after a successful donation
  if (txState === "success" || txState === "pending") {
    return (
      <section
        id="donate"
        className="py-24 px-6"
        style={{
          background: "linear-gradient(180deg, #FAF8F3 0%, #F5F2EB 100%)",
        }}
      >
        <div className="max-w-[520px] mx-auto">
          <SuccessScreen />
        </div>
      </section>
    );
  }

  const handlePresetSelect = (count: number) => {
    setTreeCount(count);
    setCustomInput("");
  };

  const handleCustomChange = (val: string) => {
    setCustomInput(val);
    const num = parseInt(val);
    if (num > 0 && num <= 10000) setTreeCount(num);
  };

  const handleConnectWallet = () => {
    const injected = connectors.find((c) => c.id === "injected");
    const coinbase = connectors.find((c) => c.id === "coinbaseWalletSDK");
    connect({ connector: injected ?? coinbase ?? connectors[0] });
  };

  const isSigning =
    txState === "switching-chain" ||
    txState === "waiting-approve" ||
    txState === "waiting-donate";

  return (
    <section
      id="donate"
      className="py-24 px-6 relative"
      style={{
        background: "linear-gradient(180deg, #FAF8F3 0%, #F5F2EB 100%)",
      }}
    >
      <div className="max-w-[520px] mx-auto">
        <div className="text-center mb-12">
          <p className="label-small text-brand-green mb-4">Make Your Impact</p>
          <h2
            className="font-display text-brand-text-dark text-4xl sm:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Choose your{" "}
            <span className="italic" style={{ fontVariationSettings: '"SOFT" 80' }}>
              impact.
            </span>
          </h2>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_40px_rgba(27,34,24,0.06)] border border-brand-text-dark/5">
          {/* Tree selector */}
          <label className="label-small text-brand-text-mid block mb-3">
            How many trees?
          </label>
          <div className="flex gap-2 mb-3 flex-wrap">
            {TREE_PRESETS.map((n) => {
              const active = treeCount === n && !customInput;
              return (
                <button
                  key={n}
                  onClick={() => handlePresetSelect(n)}
                  className={`
                    btn-press flex-1 min-w-[90px] py-3.5 px-3 rounded-xl text-sm font-medium
                    transition-all duration-200 border cursor-pointer
                    ${active
                      ? "bg-brand-jungle text-white border-brand-jungle shadow-md"
                      : "bg-brand-cream text-brand-text-dark border-transparent hover:border-brand-green/20"
                    }
                  `}
                >
                  <div className="font-display text-xl leading-none mb-1" style={{ fontWeight: 500 }}>
                    {n}
                  </div>
                  <div className="label-small opacity-80 text-[9px]">
                    {n > 1 ? "trees" : "tree"} · ${n * TREE_PRICE_USD}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex gap-3 items-center mb-7">
            <input
              type="number"
              min="1"
              max="10000"
              placeholder="Custom"
              value={customInput}
              onChange={(e) => handleCustomChange(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-brand-text-dark/10 text-sm outline-none transition-colors focus:border-brand-green bg-white"
            />
            <span className="text-sm text-brand-text-light tabular-nums whitespace-nowrap">
              ${treeCount * TREE_PRICE_USD}
            </span>
          </div>

          {/* Token selector */}
          <label className="label-small text-brand-text-mid block mb-3">
            Pay with
          </label>
          <div className="flex gap-2 mb-7">
            {STABLECOINS.map((token) => {
              const active = selectedToken.symbol === token.symbol;
              const disabled = !token.available;
              return (
                <button
                  key={token.symbol}
                  onClick={() => !disabled && setSelectedToken(token)}
                  disabled={disabled}
                  title={disabled ? "Only USDC available on testnet" : ""}
                  className={`
                    btn-press flex-1 py-3 rounded-xl text-sm font-medium font-mono tracking-wide
                    transition-all duration-200 border
                    ${active
                      ? "bg-brand-jungle text-white border-brand-jungle"
                      : disabled
                        ? "bg-brand-cream text-brand-text-light border-transparent cursor-not-allowed opacity-50"
                        : "bg-brand-cream text-brand-text-mid border-transparent hover:border-brand-text-dark/15"
                    }
                  `}
                >
                  {token.symbol}
                </button>
              );
            })}
          </div>

          {/* Wallet or action */}
          {!isConnected ? (
            <button
              onClick={handleConnectWallet}
              className="btn-press w-full py-4 rounded-xl bg-brand-jungle text-white font-medium text-[15px] border-0 cursor-pointer flex items-center justify-center gap-3 hover:bg-brand-black transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="6" width="18" height="13" rx="2" />
                <path d="M16 12h2" />
              </svg>
              Connect Wallet
            </button>
          ) : (
            <>
              <div className="bg-brand-cream rounded-xl px-4 py-3.5 mb-4 flex justify-between items-center">
                <div>
                  <p className="label-small text-brand-text-light">Connected</p>
                  <p className="text-sm font-mono text-brand-text-dark mt-0.5">
                    {address?.slice(0, 6)}…{address?.slice(-4)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="label-small text-brand-text-light">Network</p>
                  <p className="text-sm font-medium text-brand-green mt-0.5">
                    Base Sepolia
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-xs text-brand-text-light mb-4 font-mono">
                <span>Balance · {formattedBalance} {selectedToken.symbol}</span>
                <span>Gas · ~$0.001</span>
              </div>

              <button
                onClick={executeDonation}
                disabled={isSigning}
                className={`
                  btn-press w-full py-4 rounded-xl text-white font-medium text-[15px] border-0
                  flex items-center justify-center gap-3 transition-all
                  ${isSigning
                    ? "bg-brand-text-light cursor-wait"
                    : "bg-brand-green hover:bg-brand-jungle shadow-[0_4px_20px_rgba(74,124,46,0.3)] hover:shadow-[0_8px_30px_rgba(74,124,46,0.4)]"
                  }
                `}
              >
                {txState === "switching-chain" && <><Spinner /> Switching network…</>}
                {txState === "waiting-approve" && <><Spinner /> Approve in wallet…</>}
                {txState === "waiting-donate" && <><Spinner /> Sign donation…</>}
                {!isSigning && <>🌳 Plant {treeCount} Tree{treeCount > 1 ? "s" : ""} — ${totalUsd}</>}
              </button>

              {isSigning && (
                <p className="text-xs text-brand-gold mt-3 text-center">
                  ⏳ Check your wallet — a signing request should appear.
                </p>
              )}

              {txState === "error" && txError && (
                <p className="text-xs text-red-600 mt-3 text-center leading-relaxed">
                  {txError}
                </p>
              )}

              <button
                onClick={() => disconnect()}
                className="w-full mt-3 text-xs text-brand-text-light hover:text-brand-text-mid bg-transparent border-0 cursor-pointer transition-colors"
              >
                Disconnect
              </button>
            </>
          )}

          {/* Faucet link — only relevant on testnet */}
          <div className="mt-6 pt-5 border-t border-brand-text-dark/5 text-center">
            <p className="text-[11px] text-brand-text-light">
              Need testnet ETH?{" "}
              <a
                href={CHAIN.faucetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green hover:text-brand-jungle underline transition-colors font-medium"
              >
                Get from Coinbase faucet →
              </a>
            </p>
          </div>

          <p className="text-[10px] text-brand-text-light/60 text-center mt-3 font-mono">
            Base Sepolia · Chain ID 84532
          </p>
        </div>
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  );
}
