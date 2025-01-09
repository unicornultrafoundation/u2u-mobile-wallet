import BigNumber from "bignumber.js"
import { useCallback, useEffect, useState } from "react"
import { queryAllWithdrawalRequest } from "../service/staking"
import { withdrawalRequestDataProcessor } from "../util/staking"
import { useNetwork } from "./useNetwork"
import { useQuery } from "@tanstack/react-query"
import { useRemoteConfig } from "./useRemoteConfig"

export interface WithdrawalRequest {
  wrId: string
  delegatorAddress: string
  validatorId: string
  unbondTime: number
  unbondingAmount: BigNumber
  withdrawalAbleTime: number
  withdrawable: boolean
  withdrawalAmount: BigNumber
  undelegateHash: string
  withdrawalHash: string
  withdrawalTime: number
  withdrawal: boolean
}

export const useFetchWithdrawRequest = (delegatorAddr: string) => {
  const {networkConfig} = useNetwork()

  const {remoteConfig} = useRemoteConfig()

  const { data } = useQuery({
    queryKey: ['fetchAllWithdrawalRequest', delegatorAddr, networkConfig, remoteConfig],
    queryFn: async () => {
      if (!delegatorAddr || !networkConfig) return []
      const data = await queryAllWithdrawalRequest(delegatorAddr, networkConfig.sfcSubgraph)
      if (data && data.withdrawalRequests.length > 0) {
        return data.withdrawalRequests.map((i: any) => withdrawalRequestDataProcessor(i, remoteConfig.withdrawPeriodTime))
      }
      return []
    },
    refetchInterval: 60000,
    placeholderData: [] as WithdrawalRequest[]
  })

  return {
    wr: data as WithdrawalRequest[]
  }
}