import { Web3WalletTypes } from '@walletconnect/web3wallet';
import { create } from 'zustand'
interface GlobalState {
  routeName: string;
  setRouteName: (routeName: string) => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
  unlocked: boolean;
  setUnlocked: (unlocked: boolean) => void;
  showWCScanner: boolean;
  setShowWCScanner: (showWCScanner: boolean) => void;
  pairedProposal?: Web3WalletTypes.SessionProposal;
  setPairedProposal: (pairedProposal: Web3WalletTypes.SessionProposal) => void;
  wcRequest?: {method: string; params: any};
  setWCRequest: (wcRequest: {method: string; params: any}) => void
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  routeName: '',
  setRouteName: (routeName: string) => {
    set({ routeName })
  },
  searchKeyword: '',
  setSearchKeyword: (searchKeyword: string) => {
    set({ searchKeyword })
  },
  unlocked: false,
  setUnlocked: (val: boolean) => {
    set({ unlocked: val })
  },
  showWCScanner: false,
  setShowWCScanner: (val: boolean) => {
    set({ showWCScanner: val })
  },
  pairedProposal: undefined,
  setPairedProposal: (pairedProposal: Web3WalletTypes.SessionProposal) => {
    set({ pairedProposal })
  },
  wcRequest: undefined,
  setWCRequest: (wcRequest: {method: string; params: any}) => {
    set({ wcRequest })
  }
}))