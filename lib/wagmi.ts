import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

/**
 * Wagmi config — hardcoded to Base Sepolia for this demo build.
 *
 * When a user clicks "Connect Wallet", the `injected()` connector triggers
 * their browser extension (MetaMask, Rabby, etc.) to open its own popup for
 * account approval. When they later sign a transaction, the wallet popup
 * opens again — nothing is auto-signed.
 *
 * Dev team: to migrate to mainnet, swap `baseSepolia` → `base` from
 * `wagmi/chains` and update the RPC transport accordingly.
 */
export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    // MetaMask / Rabby / any injected wallet — primary flow
    injected(),
    // Coinbase Wallet for Mini App experience
    coinbaseWallet({
      appName: "Planet-A-mor (Testnet)",
      preference: "smartWalletOnly",
    }),
  ],
  transports: {
    [baseSepolia.id]: http(
      process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org"
    ),
  },
  ssr: true,
});
