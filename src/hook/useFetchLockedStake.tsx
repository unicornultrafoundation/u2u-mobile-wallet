import BigNumber from "bignumber.js"
import { queryLockedStake } from "../service/staking"
import { lockedStakeDataProcessor } from "../util/staking"
import { useQuery } from "@tanstack/react-query"
import { logErrorForMonitoring } from "./useCrashlytics"
import { useNetwork } from "./useNetwork"

export interface LockedStake {
  delegator: string
  validatorId: string
  validatorName: string
  duration: number
  endTime: number
  lockedAmount: BigNumber
  penalty: BigNumber
  isLockedUp: boolean
}

const fetchLockedStake = async (delAddress: string, valId: number, endpoint: string) => {
  if(!delAddress) return {} as LockedStake
  try {
    const vaIdlHex = `0x${valId.toString(16)}`
    const data = await queryLockedStake(delAddress.toLowerCase(), vaIdlHex, endpoint)
    if (data && data?.lockedUps) {
      return lockedStakeDataProcessor(data?.lockedUps[0])
    }
    return {} as LockedStake
  } catch (error) {
    logErrorForMonitoring(error as any, "fetchLockedStake fail")
    return {} as LockedStake
  }
}

export const useFetchLockedStake = (delAddress: string, valId: number) => {
  const {networkConfig} = useNetwork()
  const { data: lockedStake, refetch } = useQuery<LockedStake>({
    queryKey: ['fetchLockedStake', delAddress, valId, networkConfig],
    queryFn: () => {
      if (!networkConfig) return {} as LockedStake
      return fetchLockedStake(delAddress, valId, networkConfig.sfcSubgraph)
    },
    refetchInterval: 60000,
    initialData: {} as LockedStake,
    // enabled: false
  })

  return {
    lockedStake: lockedStake || {} as LockedStake,
    fetchLockedStake: refetch
  }
}