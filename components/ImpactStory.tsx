"use client";

import { IMAGES } from "@/lib/constants";
import Section from "./Section";
import StatCountUp from "./StatCountUp";

/**
 * Impact Story — mission framing with:
 * - Two-column editorial layout (photo + copy)
 * - Three animated stat counters with photos
 * - Callout box with gold accent
 */
export default function ImpactStory() {
  return (
    <Section id="impact" className="bg-brand-cream">
      {/* Section intro */}
      <div className="max-w-[720px] mx-auto text-center mb-20">
        <p className="label-small text-brand-green mb-4">Our Mission</p>
        <h2
          className="font-display text-brand-text-dark text-4xl sm:text-5xl mb-6"
          style={{ fontWeight: 500 }}
        >
          Your $5. <span className="italic" style={{ fontVariationSettings: '"SOFT" 80' }}>Real roots.</span>
          <br />
          Real people.
        </h2>
        <p className="text-brand-text-mid text-lg max-w-[600px] mx-auto">
          We partner with the Ashaninka community in Tournavista, Peru to
          restore degraded rainforest. Each tree is planted, monitored, and
          maintained by local families.
        </p>
      </div>

      {/* Photo-grid stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {[
          { photo: IMAGES.story1, end: 10000, suffix: "+", label: "Trees Planted" },
          { photo: IMAGES.story2, end: 48, suffix: " families", label: "Ashaninka Community" },
          { photo: IMAGES.story3, end: 220, suffix: " tonnes CO₂", label: "Annually Captured" },
        ].map((stat, i) => (
          <div key={i} className="group">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-5">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                style={{ backgroundImage: `url('${stat.photo}')` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(17,18,16,0.1) 0%, rgba(17,18,16,0.55) 100%)",
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-display text-4xl sm:text-5xl mb-1" style={{ fontWeight: 500 }}>
                  <StatCountUp end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="label-small text-white/80">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editorial two-column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${IMAGES.story4}')` }}
          />
        </div>
        <div>
          <p className="label-small text-brand-green mb-4">The Land</p>
          <h3 className="font-display text-brand-text-dark text-3xl sm:text-4xl mb-5" style={{ fontWeight: 500 }}>
            An agroforestry permaculture project.
          </h3>
          <p className="text-brand-text-mid leading-[1.8] mb-4">
            Our trees are planted on protected land in the Peruvian Amazon —
            a biodiversity hotspot supporting symbiotic ecosystems between
            species. We work in seven natural layers, from canopy to ground
            cover.
          </p>
          <p className="text-brand-text-mid leading-[1.8]">
            Local Ashaninka families are trained, employed, and empowered to
            be the stewards of this land — creating sustainable livelihoods
            while restoring what was lost.
          </p>
        </div>
      </div>

      {/* Callout */}
      <div className="max-w-[680px] mx-auto mt-16">
        <div
          className="rounded-2xl px-8 py-7"
          style={{
            background: "linear-gradient(135deg, #FDF6E7 0%, #F7EDD3 100%)",
            borderLeft: "3px solid #C49B2A",
          }}
        >
          <p className="text-brand-text-dark leading-relaxed">
            <span className="font-display text-xl mr-2" style={{ fontWeight: 600 }}>🎁</span>
            Your $5 plants a tree <strong>AND</strong> enters you into our
            on-chain raffle for eco prizes and an 11-day Amazon expedition.
          </p>
        </div>
      </div>
    </Section>
  );
}
