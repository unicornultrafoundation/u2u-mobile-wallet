import { useWalletStore, Wallet } from '../state/wallet';
import { useCallback } from 'react';
import { signMessage } from '../util/wallet';

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
    savePKIndex,
    addPrivateKey,
    privateKeys,
    removePrivateKey
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

  const getAuthObj = useCallback(async () => {
    const timestamp = Math.round(Date.now() / 1000) 
    const signature = await signMessage(
      `signature-from-${wallet.address.toLowerCase()}-at-${timestamp}`,
      wallet.privateKey
    )

    return {
      wallet: wallet.address,
      signature,
      timestamp
    }
  }, [wallet])

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
    savePKIndex,
    addPrivateKey,
    privateKeys,
    removePrivateKey,
    getAuthObj
  };
}
