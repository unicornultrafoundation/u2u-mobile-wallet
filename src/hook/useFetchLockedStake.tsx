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

const fetchLockedStake = async (delAddress: string, valId: number) => {
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
}

export const useFetchLockedStake = (delAddress: string, valId: number) => {

  const { data: lockedStake, refetch } = useQuery<LockedStake>({
    queryKey: ['fetchLockedStake', delAddress, valId],
    queryFn: () => fetchLockedStake(delAddress, valId),
    refetchInterval: 60000,
    initialData: {} as LockedStake,
    // enabled: false
  })

  return {
    lockedStake: lockedStake || {} as LockedStake,
    fetchLockedStake: refetch
  }
}