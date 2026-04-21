"use client";

import { IMAGES } from "@/lib/constants";
import Section from "./Section";

const STEPS = [
  {
    n: "01",
    title: "Donate $5 in stablecoins",
    desc: "Pay with USDC on Base Sepolia. You review and sign each transaction in your wallet — nothing happens automatically.",
  },
  {
    n: "02",
    title: "Receive your NFT",
    desc: "An on-chain certificate is minted to your wallet, representing your donation to Planet-A-mor.",
  },
  {
    n: "03",
    title: "Activate your entry",
    desc: "Submit your email to confirm your tree and enter the raffle. Stay updated on your forest's growth.",
  },
  {
    n: "04",
    title: "Win life-changing prizes",
    desc: "Winners selected on-chain in Q1 2026 via Chainlink VRF — eco prizes and an expedition to the Amazon.",
  },
];

/**
 * How It Works — editorial 4-step layout with jungle accent image.
 */
export default function HowItWorks() {
  return (
    <Section id="how" className="bg-brand-warm-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left: sticky header + image */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <p className="label-small text-brand-green mb-4">Simple Process</p>
            <h2
              className="font-display text-brand-text-dark text-4xl sm:text-5xl mb-8"
              style={{ fontWeight: 500 }}
            >
              From your wallet to the{" "}
              <span className="italic" style={{ fontVariationSettings: '"SOFT" 80' }}>
                Amazon floor.
              </span>
            </h2>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${IMAGES.story5}')` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(27,34,24,0.5), transparent 50%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: steps */}
        <div className="md:col-span-7">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="py-8 border-b border-brand-text-dark/8 last:border-b-0"
            >
              <div className="flex items-start gap-6">
                <span
                  className="font-display text-brand-green shrink-0 text-2xl"
                  style={{ fontWeight: 500 }}
                >
                  {step.n}
                </span>
                <div>
                  <h3
                    className="font-display text-brand-text-dark text-2xl mb-2"
                    style={{ fontWeight: 500 }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-brand-text-mid leading-[1.7]">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
