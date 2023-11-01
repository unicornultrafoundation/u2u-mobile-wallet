import { useCallback, useEffect, useState } from "react"
import BigNumber from "bignumber.js"
import { queryLockedStake } from "../service/staking"
import { lockedStakeDataProcessor } from "../util/staking"

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
  const [lockedStake, setLockedStake] = useState<LockedStake>({} as LockedStake)

  const fetchLockedStake = useCallback(async () => {
    if(!delAddress) return
    const vaIdlHex = `0x${valId.toString(16)}`
      const {data} = await queryLockedStake(delAddress.toLowerCase(), vaIdlHex)
    if (data && data?.lockedUps) {
      setLockedStake(lockedStakeDataProcessor(data?.lockedUps[0]));
    }
  }, [delAddress, valId])

  useEffect(() => {
    fetchLockedStake()
    const interval = setInterval(() => {
      fetchLockedStake()
    }, 5000)

    return () => clearInterval(interval)
  }, [delAddress, valId])
  return {
    lockedStake
  }
}