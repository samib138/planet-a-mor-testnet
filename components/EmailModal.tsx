"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { LINKS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import EmailPreview from "./EmailPreview";
import Logo from "./Logo";

function looksLikeEmail(s: string): boolean {
  if (s.length < 5) return false;
  const at = s.indexOf("@");
  if (at < 1) return false;
  const dot = s.lastIndexOf(".");
  if (dot < at + 2) return false;
  if (dot >= s.length - 1) return false;
  return true;
}

export default function EmailModal() {
  const store = useAppStore();
  const { showEmailModal, setShowEmailModal, setEmailSubmitted, setUserEmail, userEmail, treeCount, txHash, setShowDashboard } = store;
  const { address } = useAccount();

  const [email, setEmail] = useState("");
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!showEmailModal) return null;

  const isValid = looksLikeEmail(email) && consentMarketing && consentTerms;

  async function handleSubmit() {
    if (!isValid) {
      setError("Please fill all required fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          consentMarketing: consentMarketing,
          consentTerms: consentTerms,
          walletAddress: address,
          txHash: txHash,
          treeCount: treeCount,
        }),
      });
      if (!res.ok) {
        let msg = "Something went wrong. Please try again.";
        try {
          const data = await res.json();
          if (data && data.error) msg = data.error;
        } catch (e) {}
        setError(msg);
        setSubmitting(false);
        return;
      }
      setUserEmail(email);
      setSubmitted(true);
      setEmailSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    setShowEmailModal(false);
    setSubmitted(false);
    setEmail("");
    setConsentMarketing(false);
    setConsentTerms(false);
    setError("");
  }
function handleViewDashboard() {
    setShowEmailModal(false);
    setSubmitted(false);
    setEmail("");
    setConsentMarketing(false);
    setConsentTerms(false);
    setError("");
    setShowDashboard(true);
  }
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[1000] overflow-y-auto">
        <div className="min-h-screen py-8 px-4 flex items-start justify-center">
          <div className="w-full max-w-[600px] bg-white rounded-3xl shadow-2xl relative my-4">
            <button onClick={handleClose} aria-label="Close" className="absolute top-5 right-5 bg-black/5 hover:bg-black/10 w-9 h-9 rounded-full flex items-center justify-center text-lg text-brand-text-mid border-0 cursor-pointer transition-colors z-10">
              X
            </button>
            <div className="text-center px-8 pt-10 pb-6 border-b border-brand-text-dark/5">
              <div className="text-4xl mb-3">Tree</div>
              <h3 className="font-display text-brand-jungle text-3xl mb-2" style={{ fontWeight: 500 }}>
                You are in! Good luck.
              </h3>
              <p className="text-sm text-brand-text-mid">
                Check your inbox at <strong className="text-brand-text-dark">{userEmail || email}</strong>.
              </p>
            </div>
            <div className="p-6 bg-brand-cream/50">
              <EmailPreview
                recipientEmail={userEmail || email}
                treeCount={treeCount}
                txHash={txHash}
                walletAddress={address}
                onDashboardClick={handleViewDashboard}
              />
            </div>
            <div className="px-8 py-5 border-t border-brand-text-dark/5 flex items-center justify-between gap-4 bg-white rounded-b-3xl">
              <a href={LINKS.website} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-green hover:text-brand-jungle underline transition-colors">
                Visit planet-a-mor.org
              </a>
              <button onClick={handleClose} className="btn-press bg-brand-jungle text-white px-6 py-2.5 rounded-full font-medium text-sm border-0 cursor-pointer hover:bg-brand-black transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[1000] flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl max-w-[440px] w-full relative shadow-2xl">
        <button onClick={handleClose} aria-label="Close" className="absolute top-5 right-5 bg-black/5 hover:bg-black/10 w-9 h-9 rounded-full flex items-center justify-center text-lg text-brand-text-mid border-0 cursor-pointer transition-colors">
          X
        </button>
        <div className="p-8">
          <div className="text-center mb-7">
            <div className="mb-4 flex justify-center opacity-70">
              <Logo size="sm" />
            </div>
            <h3 className="font-display text-brand-text-dark text-2xl mb-2" style={{ fontWeight: 500 }}>
              Activate your raffle entry
            </h3>
            <p className="text-[13px] text-brand-text-mid leading-relaxed">
              Enter your email to confirm your tree and enter the prize draw.
            </p>
          </div>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            disabled={submitting}
            onChange={function(e) { setEmail(e.target.value); setError(""); }}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-text-dark/10 text-sm outline-none transition-colors focus:border-brand-green disabled:opacity-60"
          />
          <label className="flex items-start gap-3 mt-4 cursor-pointer select-none">
            <input type="checkbox" checked={consentMarketing} disabled={submitting} onChange={function(e) { setConsentMarketing(e.target.checked); }} className="mt-0.5 accent-brand-green shrink-0" />
            <span className="text-[11.5px] leading-[1.55] text-brand-text-mid">
              I agree to receive updates, raffle notifications, and marketing from Planet-A-mor.
            </span>
          </label>
          <label className="flex items-start gap-3 mt-3 cursor-pointer select-none">
            <input type="checkbox" checked={consentTerms} disabled={submitting} onChange={function(e) { setConsentTerms(e.target.checked); }} className="mt-0.5 accent-brand-green shrink-0" />
            <span className="text-[11.5px] leading-[1.55] text-brand-text-mid">
              I agree to the <a href={LINKS.terms} target="_blank" rel="noopener noreferrer" className="text-brand-green underline">Terms and Conditions</a>.
            </span>
          </label>
          {error ? <p className="text-[11px] text-red-600 mt-3">{error}</p> : null}
          <button
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className={"btn-press w-full mt-6 py-3.5 rounded-xl text-white font-medium text-sm border-0 transition-colors " + (isValid && !submitting ? "bg-brand-jungle hover:bg-brand-black cursor-pointer" : "bg-brand-text-light/40 cursor-not-allowed")}
          >
            {submitting ? "Sending..." : "Confirm Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}
