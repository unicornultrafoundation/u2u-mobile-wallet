import { useCallback } from "react"
import BigNumber from "bignumber.js"
import { queryAllLockedStake, queryLockedStake } from "../service/staking"
import { lockedStakeDataProcessor } from "../util/staking"
import { useQuery } from "@tanstack/react-query"
import { LockedStake } from './useFetchLockedStake'

export const useFetchAllLockedStake = (delAddress: string) => {
  const fetchAllLockedStake = useCallback(async () => {
    console.log('fetchAllLockedStake')
    if(!delAddress) return [] as LockedStake[]
    try {
      const {data} = await queryAllLockedStake(delAddress.toLowerCase())
      if (data && data.lockedUps) {
        const mappedRs: LockedStake[] = data.lockedUps.map((i: Record<string, any>) => {
          return lockedStakeDataProcessor(i)
        })
        return mappedRs
      }
      return [] as LockedStake[]
    } catch (error) {
      return [] as LockedStake[]
    }
  }, [delAddress])

  const { data: lockedStake, isLoading } = useQuery<LockedStake[]>({
    queryKey: ['fetchAllLockedStake', delAddress],
    queryFn: fetchAllLockedStake,
    refetchInterval: 60000,
    placeholderData: [] as LockedStake[]
  })

  return {
    lockedStake: lockedStake || [] as LockedStake[],
    isLoading
  }
}