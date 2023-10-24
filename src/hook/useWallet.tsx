import { useWalletStore } from "../state/wallet";

export function useWallet() {
  const { accessWallet, wallet, generatedPath, seedPhrase, generateNewPath, savePathIndex } = useWalletStore()
  return {
    wallet,
    accessWallet,
    generatedPath,
    seedPhrase,
    generateNewPath,
    savePathIndex
  }
}