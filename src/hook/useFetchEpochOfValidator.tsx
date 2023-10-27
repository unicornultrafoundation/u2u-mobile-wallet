import { useEffect, useState } from "react"
import { ValidatorEpochInfo, queryEpochOfValidator } from "../service/staking"
import { epochOfvalidator } from "../util/staking"

export const useFetchEpochOfValidator = (valId: number, skip: number = 0) => {
  const [epoches, setEpoches] = useState<ValidatorEpochInfo[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const fetchEpochOfValidator = async () => {
    if (!valId) return
    const vaIdlHex = `0x${valId.toString(16)}`

    const { data } = await queryEpochOfValidator(valId, vaIdlHex, skip)

    if (data && data.validators.length > 0) {
      setEpoches(data.validators.map((i: any) => epochOfvalidator(i)))
      setTotalCount(data.validatorCounters[0] ? Number(data.validatorCounters[0].total) : 0)
    }
  }

  useEffect(() => {
    fetchEpochOfValidator()

    const interval = setInterval(async () => {
      fetchEpochOfValidator()
    }, 60000)

    return () => clearInterval(interval)

  }, [valId, skip])
  return {
    epoches,
    totalCount
  }
}