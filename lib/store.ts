import { create } from "zustand";
import { STABLECOINS } from "./constants";

// ─── Types ─────────────────────────────────────────────────
export type TxState =
  | "idle"
  | "switching-chain"
  | "waiting-approve"
  | "waiting-donate"
  | "pending"
  | "success"
  | "error";

export type DashboardTab = "trees" | "entries" | "impact";

interface Donation {
  treeCount: number;
  txHash: string;
  timestamp: string;
  tokenSymbol: string;
}

interface AppState {
  // Donation form
  treeCount: number;
  selectedToken: (typeof STABLECOINS)[number];
  txState: TxState;
  txHash: string;
  txError: string;

  // Email flow (UI only — no real email sent)
  userEmail: string;
  showEmailModal: boolean;
  emailSubmitted: boolean;

  // Dashboard
  showDashboard: boolean;
  dashboardTab: DashboardTab;

  // Session history
  donations: Donation[];

  // Actions
  setTreeCount: (count: number) => void;
  setSelectedToken: (token: (typeof STABLECOINS)[number]) => void;
  setTxState: (state: TxState) => void;
  setTxHash: (hash: string) => void;
  setTxError: (error: string) => void;
  setUserEmail: (email: string) => void;
  setShowEmailModal: (show: boolean) => void;
  setEmailSubmitted: (submitted: boolean) => void;
  setShowDashboard: (show: boolean) => void;
  setDashboardTab: (tab: DashboardTab) => void;
  addDonation: (donation: Donation) => void;
  resetDonation: () => void;
}

/**
 * Zustand store — in-memory session state for the donation flow,
 * modals, and dashboard navigation.
 */
export const useAppStore = create<AppState>((set) => ({
  treeCount: 1,
  selectedToken: STABLECOINS[0],
  txState: "idle",
  txHash: "",
  txError: "",
  userEmail: "",
  showEmailModal: false,
  emailSubmitted: false,
  showDashboard: false,
  dashboardTab: "trees",
  donations: [],

  setTreeCount: (count) => set({ treeCount: Math.max(1, count) }),
  setSelectedToken: (token) => set({ selectedToken: token }),
  setTxState: (state) => set({ txState: state }),
  setTxHash: (hash) => set({ txHash: hash }),
  setTxError: (error) => set({ txError: error }),
  setUserEmail: (email) => set({ userEmail: email }),
  setShowEmailModal: (show) => set({ showEmailModal: show }),
  setEmailSubmitted: (submitted) => set({ emailSubmitted: submitted }),
  setShowDashboard: (show) => set({ showDashboard: show }),
  setDashboardTab: (tab) => set({ dashboardTab: tab }),
  addDonation: (donation) =>
    set((state) => ({ donations: [...state.donations, donation] })),
  resetDonation: () =>
    set({
      treeCount: 1,
      txState: "idle",
      txHash: "",
      txError: "",
      showEmailModal: false,
    }),
}));
