import { CHAIN } from "./constants";

/**
 * Ensures the connected wallet is on Base Sepolia before a transaction.
 * - Tries `wallet_switchEthereumChain` first.
 * - If chain is unknown to the wallet (error 4902), adds it via
 *   `wallet_addEthereumChain` then retries the switch.
 *
 * The wallet will prompt the user with its own UI for each of these
 * actions — keeping the signing popup flow fully intact.
 */
export async function ensureChain(): Promise<void> {
  if (typeof window === "undefined" || !(window as any).ethereum) {
    throw new Error("No injected wallet found.");
  }

  const provider = (window as any).ethereum;

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CHAIN.idHex }],
    });
  } catch (err: any) {
    // Chain not added to wallet — add it, then switching happens automatically
    if (err.code === 4902 || err.code === -32603) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: CHAIN.idHex,
            chainName: CHAIN.name,
            rpcUrls: [CHAIN.rpcUrl],
            nativeCurrency: CHAIN.nativeCurrency,
            blockExplorerUrls: [CHAIN.explorer],
          },
        ],
      });
    } else if (err.code === 4001) {
      // User rejected the switch
      throw new Error("Please switch to Base Sepolia to continue.");
    } else {
      throw err;
    }
  }
}
