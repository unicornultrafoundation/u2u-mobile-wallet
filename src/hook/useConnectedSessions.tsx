import { useQuery } from "@tanstack/react-query"
import { useWallet } from "./useWallet"
import { useNetwork } from "./useNetwork"
import { getAllSession } from "../service/session"
import { Session } from "./useSessionDetail"

export const useConnectedSessions = () => {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {data, isFetching, refetch} = useQuery<Session[]>({
    queryKey: ['connected-session', wallet.address, networkConfig?.api_endpoint],
    queryFn: async () => {
      if (!networkConfig || !networkConfig.api_endpoint) return []

      return getAllSession(networkConfig.api_endpoint, wallet.address)
    }
  })

  return {
    data,
    isFetching,
    refetch
  }
}