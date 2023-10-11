import { useWalletStore } from "../state/wallet";

export function useWallet() {
  const { accessWallet, wallet } = useWalletStore()
  return {wallet, accessWallet}
}