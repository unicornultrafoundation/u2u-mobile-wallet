import { fetchNativeTokenTransaction } from "../service/transaction"
import { useNetworkStore } from "../state/network"
import { useQuery } from '@tanstack/react-query'

export const useNativeTokenTxHistory = (address: string) => {
  const {blockExplorer} = useNetworkStore()

  const query = useQuery({
    queryKey: ['native-tx-history', address],
    queryFn: () => fetchNativeTokenTransaction(blockExplorer, address),
  })

  return {
    loading: query.isLoading,
    txList: query.data || []
  }
}