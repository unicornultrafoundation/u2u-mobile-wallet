import { useInfiniteQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"
import { getSignRequestFromSession } from "../service/session"
import { SignRequest } from "./useSignRequest"

export const useSessionSignRequest = (sessionID: string) => {
  const {networkConfig} = useNetwork()

  const {data, fetchNextPage, isFetching} = useInfiniteQuery<SignRequest[]>({
    queryKey: ['session-request', sessionID, networkConfig?.api_endpoint],
    queryFn: async ({pageParam = 1}) => {
      if (!networkConfig?.api_endpoint || sessionID === '') return []
      const rs = await getSignRequestFromSession(networkConfig?.api_endpoint, sessionID, pageParam, 10)
      return rs.data
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  return {
    data, fetchNextPage, isFetching
  }
}