import { useCallback } from "react"
import BigNumber from "bignumber.js"
import { queryAllLockedStake, queryLockedStake } from "../service/staking"
import { lockedStakeDataProcessor } from "../util/staking"
import { useQuery } from "@tanstack/react-query"

export interface LockedStake {
  delegator: string
  validatorId: string
  duration: number
  endTime: number
  lockedAmount: BigNumber
  penalty: BigNumber
  isLockedUp: boolean
}

export const useFetchAllLockedStake = (delAddress: string) => {
  const fetchAllLockedStake = useCallback(async () => {
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

  const { data: lockedStake } = useQuery<LockedStake[]>({
    queryKey: ['fetchAllLockedStake', delAddress],
    queryFn: fetchAllLockedStake,
    refetchInterval: 10000,
    placeholderData: [] as LockedStake[]
  })

  return {
    lockedStake: lockedStake || [] as LockedStake[]
  }
}