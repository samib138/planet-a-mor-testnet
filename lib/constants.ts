// ═══════════════════════════════════════════════════════════
// Planet-A-mor Testnet — Constants
// Hardcoded to Base Sepolia (chainId 84532)
// Dev team: to migrate to mainnet, swap to Base (8453), update
// USDC address to 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913,
// swap explorer to basescan.org, and deploy contracts to mainnet.
// ═══════════════════════════════════════════════════════════

// ─── Chain Config (Base Sepolia Testnet) ───────────────────
export const CHAIN = {
  id: 84532,
  idHex: "0x14a34", // 84532 in hex
  name: "Base Sepolia",
  rpcUrl: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
  explorer: "https://sepolia.basescan.org",
  nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
  faucetUrl: "https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet",
} as const;

// ─── Brand Colors (matched to planet-a-mor.org) ────────────
export const COLORS = {
  black: "#111210",
  jungle: "#1B2218",
  jungleDeep: "#0C110A",
  green: "#4A7C2E",
  greenSoft: "#6B9B4A",
  greenPale: "#E8EFE0",
  cream: "#FAF8F3",
  warmWhite: "#F5F2EB",
  gold: "#C49B2A",
  amber: "#B88B20",
  amberBg: "#FDF6E7",
  white: "#FFFFFF",
  textDark: "#1E1E1C",
  textMid: "#555550",
  textLight: "#8A8A82",
} as const;

// ─── Tree Pricing ──────────────────────────────────────────
export const TREE_PRICE_USD = 5;
export const TREE_PRESETS = [1, 5, 10] as const;

// ─── Supported Stablecoins on Base Sepolia ─────────────────
// NOTE: On testnet, only USDC (Circle's test token) is available.
// USDT/eUSD are shown in UI for parity with mainnet but disabled.
export const STABLECOINS = [
  {
    symbol: "USDC",
    name: "USD Coin (Testnet)",
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS || "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    decimals: 6,
    available: true,
  },
  {
    symbol: "USDT",
    name: "Tether (Mainnet Only)",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 6,
    available: false,
  },
  {
    symbol: "eUSD",
    name: "Electronic USD (Mainnet Only)",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    available: false,
  },
] as const;

// ─── Contract Addresses ────────────────────────────────────
export const CONTRACTS = {
  donation: process.env.NEXT_PUBLIC_DONATION_CONTRACT || "",
  nft: process.env.NEXT_PUBLIC_NFT_CONTRACT || "",
} as const;

// ─── External Links ────────────────────────────────────────
export const LINKS = {
  website: "https://www.planet-a-mor.org",
  terms: "https://www.planet-a-mor.org/returning-policy",
  base: "https://base.org",
  logo: "https://images.squarespace-cdn.com/content/v1/63ad5bf9b0350a10796c2a17/79178a19-5934-4662-92f2-e2dda1edd9ed/planeta+amor+isologotipo12-12.png",
} as const;

// ─── Visual Assets ─────────────────────────────────────────
export const IMAGES = {
  hero: process.env.NEXT_PUBLIC_HERO_IMAGE || "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=2000&q=80",
  dashboard: process.env.NEXT_PUBLIC_DASHBOARD_IMAGE || "https://images.unsplash.com/photo-1657463420259-1c92c609f89e?w=2000&q=80",
  // Story photos woven into sections
  story1: "https://images.unsplash.com/photo-1615107369496-a23742bcace7?w=800&q=80", // jungle tree
  story2: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80", // hands planting
  story3: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",  // jungle river
  story4: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",  // jungle vista
  story5: "https://images.unsplash.com/photo-1584000838091-bafabb72860d?w=800&q=80",  // ashaninka placeholder
  story6: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&q=80",  // tropical foliage
} as const;
