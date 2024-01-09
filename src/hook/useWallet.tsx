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
    walletOrder,
    setWalletOrder,
    savePKIndex
  } = useWalletStore();

  const getWalletMetadata = useCallback((w?: Wallet) => {
    if (!w) {
      return { name: '', address: '' };
    }
    // const walletIndex = getPathIndex(w.path);
    const walletIndex = walletMetadata.findIndex((i) => i.address === w.address);
    if (walletIndex === -1) return { name: '', address: '' }
    return walletMetadata[walletIndex];
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
    walletOrder,
    setWalletOrder,
    savePKIndex
  };
}
