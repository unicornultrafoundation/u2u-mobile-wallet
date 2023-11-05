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
    if(!delAddress) return {} as LockedStake
    const vaIdlHex = `0x${valId.toString(16)}`
      const {data} = await queryLockedStake(delAddress.toLowerCase(), vaIdlHex)
    if (data && data?.lockedUps) {
      return lockedStakeDataProcessor(data?.lockedUps[0])
    }
    return {} as LockedStake
  }, [delAddress, valId])

  const { data: lockedStake } = useQuery<LockedStake>({
    queryKey: ['fetchLockedStake'],
    queryFn: fetchLockedStake,
    refetchInterval: 5000,
    placeholderData: {} as LockedStake
  })

  return {
    lockedStake: lockedStake || {} as LockedStake
  }
}