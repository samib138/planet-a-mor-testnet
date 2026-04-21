"use client";

/**
 * Global film grain overlay — pure CSS/SVG, no images.
 * Sits on top of the page at z-100 with overlay blend mode,
 * ~3.5% opacity. Subtle animation shifts the noise for organic feel.
 */
export default function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
