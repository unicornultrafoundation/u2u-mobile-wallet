import { useCallback } from "react"
import BigNumber from "bignumber.js"
import { queryAllLockedStake, queryLockedStake } from "../service/staking"
import { lockedStakeDataProcessor } from "../util/staking"
import { useQuery } from "@tanstack/react-query"
import { LockedStake } from './useFetchLockedStake'
import { useNetwork } from "./useNetwork"
import { logErrorForMonitoring } from "./useCrashlytics"

export const useFetchAllLockedStake = (delAddress: string) => {
  const {networkConfig} = useNetwork()
  const fetchAllLockedStake = useCallback(async () => {
    if(!delAddress || !networkConfig) return [] as LockedStake[]
    try {
      const data = await queryAllLockedStake(delAddress.toLowerCase(), networkConfig.sfcSubgraph)
      if (data && data.lockedUps) {
        const mappedRs: LockedStake[] = await Promise.all(
          data.lockedUps.map((i: Record<string, any>) => {
            return lockedStakeDataProcessor(i)
          })
        )
        return mappedRs
      }
      return [] as LockedStake[]
    } catch (error) {
      logErrorForMonitoring(error as any, 'fetchAllLockedStake fail')
      return [] as LockedStake[]
    }
  }, [delAddress, networkConfig])

  const { data: lockedStake, isLoading, refetch } = useQuery<LockedStake[]>({
    queryKey: ['fetchAllLockedStake', delAddress, networkConfig],
    queryFn: fetchAllLockedStake,
    refetchInterval: 60000,
    placeholderData: [] as LockedStake[]
  })

  return {
    lockedStake: lockedStake || [] as LockedStake[],
    isLoading,
    fetchLockedStake: refetch
  }
}