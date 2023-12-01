import { useWalletStore, Wallet } from '../state/wallet';
import { useCallback } from 'react';
import { getPathIndex } from '../util/string';

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
    const walletIndex = getPathIndex(w.path);
    if (walletIndex == null) return { name: '' }
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
