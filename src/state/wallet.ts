import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getWalletFromMnemonic, getWalletFromPrivateKey } from '../util/wallet';
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
  walletMetadata: { name: string, address: string }[];
  seedPhrase: string;
  selectedIndex: number;
  accessWallet: (seedPhrase: string) => void;
  savePathIndex: (index: number) => void;
  generatedPath: number[];
  generateNewPath: () => void;
  editingWallet?: Wallet;
  setEditingWallet: (wallet?: Wallet) => void;
  updateWallet: (name: string, address: string) => void;
  deleteWallet: (wallet: Wallet) => void;
  walletOrder: string[],
  setWalletOrder: (walletOrder: string[]) => void;
  privateKeys: string[],
  addPrivateKey: (pk: string) => void;
  removePrivateKey: (pk: string) => void;
  selectedIndexPK: number;
  selectMode: 'pk' | 'seed';
  savePKIndex: (pk: string) => void
}

export const WALLET_STORE_KEY = 'wallet-storage'

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
        try{ 
          const _wallet = getWalletFromMnemonic(seedPhrase, get().selectedIndex);
          set({
            seedPhrase,
            walletMetadata: [{name: '', address: _wallet.address}],
            wallet: _wallet,
            generatedPath: [get().selectedIndex],

          });
        } catch(e) {
          throw e
        }        
      },
      savePathIndex: (index) => {
        const _wallet = getWalletFromMnemonic(get().seedPhrase, index);
        set({ selectedIndex: index, wallet: _wallet, selectMode: 'seed' });
      },
      savePKIndex: (pk: string) => {
        const _wallet = getWalletFromPrivateKey(pk);
        const index = get().privateKeys.findIndex((i) => i === pk)
        set({ selectedIndexPK: index, wallet: {..._wallet, mnemonic: '', path: ''}, selectMode: 'pk' });
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
        currentMetadata.push({name: '', address: _wallet.address})

        const newOrder = [...get().walletOrder]
        newOrder.push(_wallet.address)

        set({
          selectedIndex: newPath,
          walletMetadata: currentMetadata,
          wallet: _wallet,
          generatedPath: [...currentPath, newPath],
          walletOrder: newOrder,
          selectMode: 'seed'
        });
      },
      setEditingWallet: (wallet) => {
        set({
          editingWallet: wallet,
        });
      },
      updateWallet: (name: string, address: string) => {
        const metadataIndex = get().walletMetadata.findIndex((i) => i.address === address)

        if (metadataIndex === -1) {
          const walletMetadata = get().walletMetadata;
          walletMetadata.push({address, name})
          set({
            walletMetadata: [...walletMetadata],
            editingWallet: undefined,
          });
          return;
        }

        const walletMetadata = get().walletMetadata;
        walletMetadata[metadataIndex] = { ...walletMetadata[metadataIndex], name };

        set({
          walletMetadata: [...walletMetadata],
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
        const newOrder = [...get().walletOrder].filter((i) => i != wallet.address)

        set({
          selectedIndex: newSelectedIndex,
          wallet: updatedWallet,
          generatedPath: currentPath,
          walletOrder: newOrder,
          walletMetadata: [...get().walletMetadata].filter((i) => i.address !== wallet.address),
        });
      },
      walletOrder: [],
      setWalletOrder: (walletOrder: string[]) => set({ walletOrder }),
      privateKeys: [],
      addPrivateKey: (pk: string) => {
        const current = [...get().privateKeys]
        if (current.includes(pk)) {
          return
        }
        current.push(pk)

        const _wallet = getWalletFromPrivateKey(pk)

        const newOrder = [...get().walletOrder]
        newOrder.push(_wallet.address)

        const currentMetadata = get().walletMetadata
        currentMetadata.push({name: '', address: _wallet.address})

        set({
          privateKeys: current,
          selectedIndexPK: current.length - 1,
          wallet: {..._wallet, mnemonic: '', path: ''},
          selectMode: 'pk',
          walletOrder: newOrder,
          walletMetadata: currentMetadata,
        })
      },
      removePrivateKey: (pk: string) => {
        const walletToRemove = getWalletFromPrivateKey(pk)
        const newOrder = [...get().walletOrder].filter((i) => i != walletToRemove.address)

        const index = [...get().privateKeys].findIndex((i) => i === pk)

        let updatedWallet = get().wallet
        let newIndex = index

        let newState: Partial<WalletState> = {}
        
        if (get().privateKeys.length > 1) {
          // Keep select mode pk
          if (newIndex === get().selectedIndexPK) {
            newIndex = 0
            updatedWallet = {
              ...getWalletFromPrivateKey(get().privateKeys[newIndex]),
              mnemonic: '',
              path: ''
            }
          }
          newState = {
            privateKeys: [...get().privateKeys].filter((i) => i !== pk),
            wallet: updatedWallet,
            selectedIndexPK: newIndex,
            selectMode: 'pk',
            walletOrder: newOrder
          }
        } else {
          // Switch to select mode seed
          const currentPath = get().generatedPath;
          newIndex = currentPath.at(0)!
          updatedWallet = getWalletFromMnemonic(get().seedPhrase, newIndex);
          newState = {
            privateKeys: [],
            wallet: updatedWallet,
            selectedIndex: newIndex,
            selectMode: 'seed',
            walletOrder: newOrder
          }
        }

        newState.walletMetadata = [...get().walletMetadata].filter((i) => i.address !== walletToRemove.address)

        set(newState)
      },
      selectedIndexPK: 0,
      selectMode: 'seed'
    }),
    {
      name: WALLET_STORE_KEY, // unique name
      storage: createJSONStorage(() => EncryptedStorage),
      // storage: createJSONStorage(() => AsyncStorage)
    },
  ),
);
