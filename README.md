# 🌳 Planet-A-mor — Testnet Demo Build

> **This is a demo/showcase build running on Base Sepolia testnet.**
> Its purpose is to demonstrate the full UX and flow for stakeholders and
> the dev team. The real production build will run on Base Mainnet with
> a live backend, email service, and payment processing.

---

## What this project is

A single-page Next.js Mini App that lets users:

1. Browse Planet-A-mor's reforestation mission (editorial-style marketing page)
2. Connect their wallet (MetaMask / Coinbase Wallet / any injected browser wallet)
3. Donate in testnet USDC on Base Sepolia — **they sign each transaction in their own wallet; nothing happens automatically**
4. Enter a raffle by submitting their email
5. View their trees, entries, and impact in a post-purchase dashboard

---

## What's different from the mainnet build

| Area | Mainnet build | Testnet build (this) |
|------|---------------|----------------------|
| **Chain** | Base (8453) | Base Sepolia (84532) |
| **USDC** | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |
| **Explorer** | basescan.org | sepolia.basescan.org |
| **Email** | Supabase + real email service | UI-only preview (no real email sent) |
| **Tokens** | USDC + USDT + eUSD | USDC only (others shown disabled) |
| **Badge** | "Built on Base" | "Built on Base" + amber "TESTNET" pill |
| **Visual polish** | Good | Fully overhauled — Amazon photography, Fraunces + Geist typography, film grain, frosted glass dashboard |

---

## Project structure

```
planet-a-mor-testnet/
├── app/
│   ├── api/frame/route.ts       # Farcaster Frame action handler
│   ├── globals.css              # Tailwind + font imports + grain overlay
│   ├── layout.tsx               # Root layout with grain mounted globally
│   └── page.tsx                 # Main single-page app
├── components/
│   ├── BaseBadge.tsx            # "Built on Base" pill
│   ├── Dashboard.tsx            # Full-page jungle-backdrop dashboard (3 tabs)
│   ├── DonationWidget.tsx       # Tree selector + wallet + faucet link
│   ├── EmailModal.tsx           # 2-stage modal: form → success + email preview
│   ├── EmailPreview.tsx         # Standalone Gmail-style email mockup *
│   ├── Footer.tsx
│   ├── GrainOverlay.tsx         # Global film grain (CSS/SVG, ~3.5% opacity)
│   ├── Hero.tsx                 # Full-bleed jungle photo with scroll parallax
│   ├── HowItWorks.tsx           # Editorial 4-step timeline
│   ├── ImpactStory.tsx          # Stats + woven Amazon photos
│   ├── LeafParticles.tsx        # Atmospheric falling leaves
│   ├── Logo.tsx                 # Reusable logo (size + variant props) *
│   ├── Prizes.tsx               # Photo-forward prize cards with hover zoom
│   ├── Providers.tsx            # wagmi + OnchainKit + React Query
│   ├── Section.tsx              # Scroll-reveal wrapper
│   ├── StatCountUp.tsx          # Animated counter on scroll into view *
│   ├── SuccessScreen.tsx        # Post-donation confirmation
│   └── TestnetBadge.tsx         # Amber "TESTNET" pill *
├── contracts/
│   └── abis.ts                  # Donation, NFT, ERC-20 ABIs
├── lib/
│   ├── constants.ts             # Chain, colors, images, tokens
│   ├── ensureChain.ts           # wallet_switchEthereumChain helper *
│   ├── store.ts                 # Zustand global state
│   ├── useDonation.ts           # Approve + donate flow with chain switch
│   └── wagmi.ts                 # Base Sepolia wagmi config
├── public/
│   └── .well-known/
│       └── farcaster.json       # Farcaster Mini App manifest
├── .env.example
├── QUICKSTART.md
└── README.md

* = new to this build vs mainnet
```

---

## Getting started

### Prerequisites
- Node.js 18+
- A Web3 browser wallet (MetaMask, Coinbase Wallet, Rabby, etc.)
- Some Base Sepolia ETH (free, from faucet — see below)
- Some testnet USDC on Base Sepolia

### Install & run

```bash
npm install
cp .env.example .env.local
# Fill in the contract addresses if you've deployed them.
# Everything else has safe defaults for demo.
npm run dev
```

Open `http://localhost:3000`.

### Getting testnet funds

1. **Testnet ETH** (for gas) — the app shows a faucet link below the Plant Now button:
   [https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)

2. **Testnet USDC** (for donations) — Circle's testnet USDC on Base Sepolia at `0x036CbD53842c5426634e7929541eC2318f3dCF7e`. Get it from:
   [https://faucet.circle.com](https://faucet.circle.com) (select Base Sepolia)

### Deploying contracts to Base Sepolia

Use the ABIs in `contracts/abis.ts` as the interface spec. Deploy the `DonationContract` and `PlanetAmorNFT` to Base Sepolia (chainId 84532) using Hardhat/Foundry/Remix, then add the addresses to `.env.local`:

```env
NEXT_PUBLIC_DONATION_CONTRACT=0x...
NEXT_PUBLIC_NFT_CONTRACT=0x...
```

---

## Notes for the dev team (migrating to mainnet)

When you're ready to launch the real version:

1. **Chain swap** — in `lib/wagmi.ts` change `baseSepolia` to `base`. In `lib/constants.ts` update `CHAIN`:
   ```ts
   export const CHAIN = {
     id: 8453,
     idHex: "0x2105",
     name: "Base",
     rpcUrl: "https://mainnet.base.org",
     explorer: "https://basescan.org",
     // ...
   }
   ```

2. **USDC address** — in `.env` change to the mainnet USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`. Re-enable USDT and eUSD in `lib/constants.ts` (set `available: true`).

3. **Remove TESTNET badge** — delete the `<TestnetBadge />` imports/usages in `Hero.tsx`, `Dashboard.tsx`, and `Footer.tsx`.

4. **Remove faucet link** — the donation widget shows a "Get from Coinbase faucet →" link. Remove the entire "Need testnet ETH?" block in `DonationWidget.tsx`.

5. **Wire up real email** — the `EmailPreview.tsx` component is designed to be your email template. Lift the inner `.email-body` div into your email service (Resend / SendGrid / Postmark) template. In `EmailModal.tsx`, inside `handleSubmit()`, add:
   ```ts
   await fetch("/api/send-confirmation", {
     method: "POST",
     body: JSON.stringify({ email, treeCount, txHash, walletAddress: address }),
   });
   ```
   and create `/api/send-confirmation/route.ts` that:
   - Inserts the entry into your database (e.g. Supabase)
   - Renders `<EmailPreview />` to HTML string (via `@react-email/render` or equivalent)
   - Sends the email via your provider

6. **Deploy contracts** — deploy `DonationContract` and `PlanetAmorNFT` to Base Mainnet with production parameters.

---

## Visual / UX notes

- **Typography** — Fraunces (display) + Geist (body) + Geist Mono (labels). Headlines use the `SOFT` variable font axis set to 50–80 for an organic feel, with tight tracking (-0.02em).
- **Color palette** — warm cream neutrals, muted earthy greens (not neon), deep jungle blacks, gold accent. Matched to planet-a-mor.org's aesthetic.
- **Photography** — full-bleed Amazon rainforest hero, woven Ashaninka/jungle images in Impact and How It Works, full-page jungle backdrop on the dashboard.
- **Motion** — scroll-linked parallax on hero, count-up numbers on scroll-into-view, soft hover zooms on prize cards, press scale on buttons, animated checkmark on success.
- **Grain** — global film grain overlay (CSS/SVG, ~3.5% opacity) for editorial feel.
- **Glass** — dashboard cards use `backdrop-filter: blur(20px)` frosted glass over the jungle image.

---

## Tech stack

- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- wagmi 2 + viem 2 (wallet + chain interaction)
- @coinbase/onchainkit (Mini App SDK)
- Zustand (state)
- Fraunces + Geist (Google / Vercel fonts)

---

<p align="center">
  <strong>Built on Base · Base Sepolia testnet 🔵</strong><br />
  <a href="https://www.planet-a-mor.org">planet-a-mor.org</a>
</p>
