import { useCallback } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { parseUnits, type Address } from "viem";
import { DONATION_ABI, ERC20_ABI } from "@/contracts/abis";
import { CONTRACTS, TREE_PRICE_USD, STABLECOINS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { ensureChain } from "@/lib/ensureChain";

/**
 * Donation flow hook.
 *
 * Flow — each step opens the user's wallet popup for manual signing:
 *   1. Ensure wallet is on Base Sepolia (auto-switch prompt if needed)
 *   2. If allowance insufficient → approve (wallet popup)
 *   3. Send donate tx (wallet popup)
 *
 * Nothing auto-signs. User reviews and confirms every tx in their wallet.
 */
export function useDonation() {
  const { address } = useAccount();
  const {
    treeCount,
    selectedToken,
    setTxState,
    setTxHash,
    setTxError,
    setShowEmailModal,
    addDonation,
  } = useAppStore();

  const { writeContractAsync } = useWriteContract();

  const totalUsd = treeCount * TREE_PRICE_USD;
  const tokenConfig = STABLECOINS.find((t) => t.symbol === selectedToken.symbol)!;
  const amountInUnits = parseUnits(totalUsd.toString(), tokenConfig.decimals);

  // Current allowance (for skipping approve if already granted)
  const { data: allowance } = useReadContract({
    address: tokenConfig.address as Address,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address ? [address, CONTRACTS.donation as Address] : undefined,
    query: { enabled: !!address && !!CONTRACTS.donation },
  });

  // User's testnet USDC balance
  const { data: balance } = useReadContract({
    address: tokenConfig.address as Address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const formattedBalance = balance
    ? (Number(balance) / 10 ** tokenConfig.decimals).toFixed(2)
    : "0.00";

  const executeDonation = useCallback(async () => {
    if (!address) {
      setTxError("Wallet not connected.");
      setTxState("error");
      return;
    }
    if (!CONTRACTS.donation) {
      setTxError("Donation contract not configured. Deploy to Base Sepolia and set NEXT_PUBLIC_DONATION_CONTRACT.");
      setTxState("error");
      return;
    }

    try {
      // STEP 1: Ensure correct chain — opens wallet popup if switch is needed
      setTxState("switching-chain");
      await ensureChain();

      // STEP 2: Approve (if needed) — wallet popup
      const currentAllowance = allowance ?? BigInt(0);
      if (currentAllowance < amountInUnits) {
        setTxState("waiting-approve");
        await writeContractAsync({
          address: tokenConfig.address as Address,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [CONTRACTS.donation as Address, amountInUnits],
        });
      }

      // STEP 3: Donate — wallet popup
      setTxState("waiting-donate");
      const donateTx = await writeContractAsync({
        address: CONTRACTS.donation as Address,
        abi: DONATION_ABI,
        functionName: "donate",
        args: [BigInt(treeCount), tokenConfig.address as Address],
      });

      setTxHash(donateTx);
      setTxState("pending");

      // Record in session + advance flow
      addDonation({
        treeCount,
        txHash: donateTx,
        timestamp: new Date().toISOString(),
        tokenSymbol: tokenConfig.symbol,
      });

      // Brief delay for "confirming" UX before success
      setTimeout(() => {
        setTxState("success");
        setTimeout(() => setShowEmailModal(true), 2000);
      }, 1500);
    } catch (err: any) {
      console.error("Donation error:", err);
      const msg = err?.shortMessage || err?.message || "Transaction failed";
      // User rejected
      if (err?.code === 4001 || msg.toLowerCase().includes("reject")) {
        setTxError("Transaction rejected in wallet.");
      } else {
        setTxError(msg.slice(0, 120));
      }
      setTxState("error");
    }
  }, [
    address,
    allowance,
    amountInUnits,
    treeCount,
    tokenConfig,
    writeContractAsync,
    setTxState,
    setTxHash,
    setTxError,
    setShowEmailModal,
    addDonation,
  ]);

  return {
    executeDonation,
    formattedBalance,
    totalUsd,
    needsApproval: (allowance ?? BigInt(0)) < amountInUnits,
  };
}
