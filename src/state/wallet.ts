import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWalletFromMnemonic } from '../util/wallet';
import { getPathIndex } from '../util/string';

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
          walletMetadata: [{name: ''}],
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
        if (newPath >= currentMetadata.length) {
          currentMetadata.push({name: ''})
        }
        set({
          selectedIndex: newPath,
          walletMetadata: currentMetadata,
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

        // const index = Number(wallet.path[wallet.path.length - 1]) - 1;
        var index = getPathIndex(wallet.path)
        if (index == null) return
        const walletMetadata = get().walletMetadata;
        walletMetadata[index] = { ...walletMetadata[index], name };

        set({
          walletMetadata,
          editingWallet: undefined,
        });
      },
      deleteWallet: (wallet) => {
        // const pathIndex = Number(wallet.path[wallet.path.length - 1]);
        const pathIndex = getPathIndex(wallet.path);
        if (pathIndex == null) return
        let currentPath = get().generatedPath;

        if (currentPath.length === 1) return;

        currentPath = currentPath.filter(path => path !== pathIndex);
        let updatedWallet = get().wallet
        let newSelectedIndex = get().selectedIndex

        if (pathIndex === get().selectedIndex) {
          newSelectedIndex = currentPath.at(0)!
          updatedWallet = getWalletFromMnemonic(get().seedPhrase, newSelectedIndex);
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
