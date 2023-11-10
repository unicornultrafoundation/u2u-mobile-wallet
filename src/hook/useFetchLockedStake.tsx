import { useCallback } from "react"
import BigNumber from "bignumber.js"
import { queryLockedStake } from "../service/staking"
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

export const useFetchLockedStake = (delAddress: string, valId: number) => {
  const fetchLockedStake = useCallback(async () => {
    console.log('fetchLockedStake')
    if(!delAddress) return {} as LockedStake
    try {
      const vaIdlHex = `0x${valId.toString(16)}`
      const {data} = await queryLockedStake(delAddress.toLowerCase(), vaIdlHex)
      if (data && data?.lockedUps) {
        return lockedStakeDataProcessor(data?.lockedUps[0])
      }
      return {} as LockedStake
    } catch (error) {
      return {} as LockedStake
    }
  }, [delAddress, valId])

  const { data: lockedStake } = useQuery<LockedStake>({
    queryKey: ['fetchLockedStake', delAddress, valId],
    queryFn: fetchLockedStake,
    // refetchInterval: 10000,
    placeholderData: {} as LockedStake
  })

  return {
    lockedStake: lockedStake || {} as LockedStake
  }
}