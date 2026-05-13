import type { Metadata } from "next";
import Providers from "@/components/Providers";
import GrainOverlay from "@/components/GrainOverlay";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planet-A-mor · Plant a Tree",
  description:
    "Plant real trees in the Peruvian Amazon with the Ashaninka community. Every $5 plants a tree and earns a raffle entry for eco prizes. Base Sepolia testnet demo.",
  openGraph: {
    title: "Planet-A-mor · Plant a Tree. Grow the Future.",
    description:
      "Every $5 plants a real tree in the Peruvian Amazon — and earns you a chance to win life-changing prizes.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605940169839-aedc047b0b06?w=2000&q=80",
        width: 1200,
        height: 630,
        alt: "Amazon rainforest",
      },
    ],
  },
  other: {
    // Farcaster Frame meta for Mini App compatibility
    "fc:frame": "vNext",
    "fc:frame:image":
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80",
    "fc:frame:button:1": "🌳 Plant a Tree",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://your-testnet-domain.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GrainOverlay />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
