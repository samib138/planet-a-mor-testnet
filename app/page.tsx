"use client";

import Hero from "@/components/Hero";
import ImpactStory from "@/components/ImpactStory";
import HowItWorks from "@/components/HowItWorks";
import Prizes from "@/components/Prizes";
import DonationWidget from "@/components/DonationWidget";
import Footer from "@/components/Footer";
import EmailModal from "@/components/EmailModal";
import Dashboard from "@/components/Dashboard";

/**
 * Planet-A-mor Testnet Demo — single-page scrollable app.
 *
 * Flow:
 *   Hero → Impact → How It Works → Prizes → Donation → Footer
 *
 * Overlays (conditionally rendered):
 *   - EmailModal — post-purchase raffle activation
 *   - Dashboard — full-screen NFT gallery + impact view
 */
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <ImpactStory />
      <HowItWorks />
      <Prizes />
      <DonationWidget />
      <Footer />

      <EmailModal />
      <Dashboard />
    </main>
  );
}
