import { fetchURC20TokenTransaction } from "../service/transaction"
import { useNetworkStore } from "../state/network"
import { useQuery } from '@tanstack/react-query'

export const useURC20TokenTxHistory = (address: string, tokenAddress: string) => {
  const {blockExplorer} = useNetworkStore()

  const query = useQuery({
    queryKey: ['urc20-tx-history', address, tokenAddress],
    queryFn: () => fetchURC20TokenTransaction(blockExplorer, address, tokenAddress),
  })

  return {
    loading: query.isLoading,
    txList: query.data || []
  }
}