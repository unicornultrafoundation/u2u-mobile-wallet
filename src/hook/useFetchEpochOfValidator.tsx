import { ValidatorEpochInfo, queryEpochOfValidator } from "../service/staking"
import { epochOfvalidator } from "../util/staking"
import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork";

interface EpochOfValidatorResult {
  epoches: ValidatorEpochInfo[];
  totalCount: number;
}

export const useFetchEpochOfValidator = (valId: number, skip: number = 0) => {
  const {networkConfig} = useNetwork()
  const fetchEpochOfValidator = async (): Promise<EpochOfValidatorResult> => {
    if (!valId || !networkConfig) {
      return {
        epoches: [] as ValidatorEpochInfo[],
        totalCount: 0
      }
    }
    const vaIdlHex = `0x${valId.toString(16)}`

    const data = await queryEpochOfValidator(valId, vaIdlHex, skip, networkConfig.u2uNetworkSubgraph)

    if (data && data.validators.length > 0) {
      return {
        epoches: data.validators.map((i: any) => epochOfvalidator(i)),
        totalCount: data.validatorCounters[0] ? Number(data.validatorCounters[0].total) : 0
      }
    }

    return {
      epoches: [],
      totalCount: 0
    }
  }

  const {data} = useQuery({
    queryKey: ['fetchEpochOfValidator', valId, skip],
    queryFn: fetchEpochOfValidator,
    refetchInterval: 60000,
    placeholderData: {
      epoches: [] as ValidatorEpochInfo[],
      totalCount: 0
    }
  })

  return {
    epoches: data ? data.epoches : [] as ValidatorEpochInfo[],
    totalCount: data ? data.totalCount : 0
  }
}