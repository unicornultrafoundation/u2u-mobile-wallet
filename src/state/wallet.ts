import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWalletFromMnemonic } from '../util/wallet';

export interface Wallet {
  address: string;
  privateKey: string;
  mnemonic: string;
  path: string;
  name?: string;
}

interface WalletState {
  wallet: Wallet;
  walletMetadata: { name: string }[];
  seedPhrase: string;
  selectedIndex: number;
  accessWallet: (seedPhrase: string) => void;
  savePathIndex: (index: number) => void;
  generatedPath: number[];
  generateNewPath: () => void;
  editingWallet?: Wallet;
  setEditingWallet: (wallet?: Wallet) => void;
  updateWallet: (name: string) => void;
  deleteWallet: (wallet: Wallet) => void;
}

export const useWalletStore = create(
  persist<WalletState>(
    (set, get) => ({
      wallet: {
        address: '',
        privateKey: '',
        mnemonic: '',
        path: '',
        name: '',
      },
      walletMetadata: [],
      seedPhrase: '',
      selectedIndex: 0,
      accessWallet: (seedPhrase) => {
        const _wallet = getWalletFromMnemonic(seedPhrase, get().selectedIndex);
        set({
          seedPhrase,
          wallet: _wallet,
          generatedPath: [get().selectedIndex],
        });
      },
      savePathIndex: (index) => {
        const _wallet = getWalletFromMnemonic(get().seedPhrase, index);
        set({ selectedIndex: index, wallet: _wallet });
      },
      generatedPath: [],
      generateNewPath: () => {
        const currentMetadata = get().walletMetadata
        const currentPath = get().generatedPath;
        let newPath = 0;

        while (currentPath.includes(newPath)) {
          newPath += 1;
        }

        const _wallet = getWalletFromMnemonic(get().seedPhrase, newPath);
        set({
          selectedIndex: newPath,
          walletMetadata: [...currentMetadata, { name: '' }],
          wallet: _wallet,
          generatedPath: [...currentPath, newPath],
        });
      },
      setEditingWallet: (wallet) => {
        set({
          editingWallet: wallet,
        });
      },
      updateWallet: (name) => {
        const wallet = get().editingWallet;
        if (!wallet) {
          return;
        }

        const index = Number(wallet.path[wallet.path.length - 1]) - 1;
        const walletMetadata = get().walletMetadata;
        walletMetadata[index] = { ...walletMetadata[index], name };

        set({
          walletMetadata,
          editingWallet: undefined,
        });
      },
      deleteWallet: (wallet) => {
        const pathIndex = Number(wallet.path[wallet.path.length - 1]);
        let currentPath = get().generatedPath;

        if (currentPath.length === 1) return;

        currentPath = currentPath.filter(path => path !== pathIndex);
        let updatedWallet = get().wallet
        let newSelectedIndex = get().selectedIndex

        if (pathIndex === get().selectedIndex) {
          updatedWallet = getWalletFromMnemonic(get().seedPhrase, pathIndex - 1);
          newSelectedIndex = pathIndex - 1
        }

        // const updatedWallet = getWalletFromMnemonic(get().seedPhrase, 1);

        set({
          selectedIndex: newSelectedIndex,
          wallet: updatedWallet,
          generatedPath: currentPath,
        });
      },
    }),
    {
      name: 'wallet-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
