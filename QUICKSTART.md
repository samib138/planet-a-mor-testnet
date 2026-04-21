# ⚡ Quickstart — Planet-A-mor Testnet Demo

Get the demo running locally in under 5 minutes.

---

## 1. Prerequisites (2 minutes)

You'll need:
- **Node.js 18+** — check with `node -v`
- **A browser wallet** — [MetaMask](https://metamask.io/download/), [Coinbase Wallet](https://www.coinbase.com/wallet), or [Rabby](https://rabby.io)
- **Some Base Sepolia ETH** for gas — free from [Coinbase faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
- **Some testnet USDC** on Base Sepolia — free from [Circle faucet](https://faucet.circle.com) (select Base Sepolia network)

---

## 2. Install & run (1 minute)

```bash
cd planet-a-mor-testnet
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**The app works immediately without any env values filled in** — you'll just see the UI. To test the actual on-chain flow, you need contract addresses (step 3).

---

## 3. Deploy or reuse contracts (2 minutes)

You have two options:

### Option A — Deploy your own
Use the ABIs in `contracts/abis.ts` as the interface spec. Deploy the `DonationContract` and `PlanetAmorNFT` to **Base Sepolia (chainId 84532)** via Hardhat, Foundry, or Remix.

Then add them to `.env.local`:
```env
NEXT_PUBLIC_DONATION_CONTRACT=0xYourDonationContract
NEXT_PUBLIC_NFT_CONTRACT=0xYourNFTContract
```

### Option B — Skip contracts for UI demo
If you only want to show the UI and flow (without real on-chain interaction), leave the env values empty. The wallet will still connect and you can walk through every screen. The only thing that won't work is the actual transaction — the button will show an error about the unconfigured contract.

---

## 4. Test the full flow

1. Scroll to the **"Choose your impact"** section
2. Pick a tree count (1, 5, 10, or custom)
3. Click **Connect Wallet** → your MetaMask (or other wallet) will pop open for account approval
4. Click **Plant [N] Trees** — three things happen:
   - Wallet pops up to **switch network** to Base Sepolia (if you're not on it already)
   - Wallet pops up to **approve** USDC spending
   - Wallet pops up to **sign** the donation transaction
5. Watch the success screen → email modal opens after 2 seconds
6. Fill in your email → see the **Gmail-style email preview** of what would be sent in production
7. Close the modal → click **"View your dashboard"** on the success screen
8. Explore the dashboard — My Trees, My Entries, Impact tabs

---

## 5. What to check for stakeholder demos

✅ **Visual polish** — Fraunces typography feels editorial, not generic<br/>
✅ **Jungle photography** — hero has scroll parallax, dashboard has full-bleed backdrop<br/>
✅ **TESTNET badge** — visible in nav, dashboard header, and footer<br/>
✅ **Real wallet signing** — every transaction requires manual approval in the user's wallet<br/>
✅ **Email preview** — stakeholders can see exactly what the production email will look like<br/>
✅ **Logo presence** — appears in nav, success screen, email preview, NFT cards, dashboard, footer<br/>
✅ **Mobile-responsive** — open DevTools and test at 375px width

---

## Troubleshooting

**"No wallet detected"** — Install [MetaMask](https://metamask.io/download/) or another injected wallet.

**"Transaction rejected in wallet"** — You clicked "Reject" in the wallet popup. Try again.

**"Please switch to Base Sepolia"** — Your wallet is on the wrong network. The button will automatically prompt you to switch; approve it.

**"Donation contract not configured"** — You haven't deployed contracts or set `NEXT_PUBLIC_DONATION_CONTRACT` in `.env.local`. See step 3.

**Insufficient balance** — Get testnet USDC from [Circle's faucet](https://faucet.circle.com) (select Base Sepolia).

**No gas** — Get testnet ETH from [Coinbase's faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet).

---

## For the dev team

When you're ready to productionize, see the **"Notes for the dev team (migrating to mainnet)"** section in `README.md`. Summary:

1. Swap `baseSepolia` → `base` in `lib/wagmi.ts`
2. Update `CHAIN` constant in `lib/constants.ts` to mainnet values
3. Update USDC address in `.env` to mainnet
4. Remove `<TestnetBadge />` imports
5. Remove faucet link in `DonationWidget.tsx`
6. Wire up `EmailPreview.tsx` to a real email service (Resend recommended)
7. Deploy production contracts to Base Mainnet

---

<p align="center">
  <em>Questions? Reply to the Claude chat this was built in, or ping the dev team.</em>
</p>
