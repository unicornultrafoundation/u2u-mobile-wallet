import { useWalletStore, Wallet } from '../state/wallet';
import { useCallback } from 'react';

export function useWallet() {
  const {
    wallet,
    accessWallet,
    generatedPath,
    seedPhrase,
    generateNewPath,
    savePathIndex,
    setEditingWallet,
    editingWallet,
    updateWallet,
    deleteWallet,
    walletMetadata,
  } = useWalletStore();

  const getWalletMetadata = useCallback((w?: Wallet) => {
    if (!w) {
      return { name: '' };
    }
    const walletIndex = Number(w.path[w.path.length - 1]) - 1;

    return walletMetadata[walletIndex] || { name: '' };
  }, [walletMetadata]);

  return {
    wallet,
    accessWallet,
    generatedPath,
    seedPhrase,
    generateNewPath,
    savePathIndex,
    setEditingWallet,
    editingWallet,
    updateWallet,
    deleteWallet,
    getWalletMetadata,
  };
}
