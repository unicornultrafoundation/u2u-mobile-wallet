import { IWalletKit, WalletKitTypes } from '@reown/walletkit';
import { create } from 'zustand'
interface GlobalState {
  routeName: string;
  setRouteName: (routeName: string) => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
  unlocked: boolean;
  setUnlocked: (unlocked: boolean) => void;
  drawerOpened: boolean;
  setDrawerOpened: (drawerOpened: boolean) => void;
  wcProposal: WalletKitTypes.SessionProposal | undefined;
  setWCProposal: (proposal: WalletKitTypes.SessionProposal | undefined) => void;
  isAppInBackground: boolean;
  setIsAppInBackground: (isAppInBackground: boolean) => void;
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
  drawerOpened: false,
  setDrawerOpened: (drawerOpened: boolean) => {
    set({ drawerOpened })
  },
  wcProposal: undefined,
  setWCProposal: (wcProposal) => {
    set({ wcProposal })
  },
  isAppInBackground: false,
  setIsAppInBackground: (isAppInBackground: boolean) => {
    set({ isAppInBackground })
  },
}))