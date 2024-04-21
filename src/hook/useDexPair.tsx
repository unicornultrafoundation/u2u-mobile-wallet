import { useMemo } from "react"
import { PANCAKE_PAIR_V2_ABI } from "../util/abis/pancakeV2"
import { ContractOptions, contractCall } from "../util/contract"
import { useNetwork } from "./useNetwork"
import { getPairAddress } from "../util/dexPair"
import { useQuery } from "@tanstack/react-query"
import { useDexStore } from "../state/dex"
import { toChecksumAddress } from "ethereum-checksum-address"

// const contractOptions: ContractOptions = {
//   contractAddress: 'string',
//   abi: PANCAKE_V2_ABI
// }

export const useDexPair = () => {
  const {networkConfig} = useNetwork()
  const {tokenFrom, tokenTo} = useDexStore()

  const contractOptions = useMemo(() => {
    return {
      abi: PANCAKE_PAIR_V2_ABI,
      contractAddress: getPairAddress(toChecksumAddress(tokenFrom), toChecksumAddress(tokenTo), Number(networkConfig?.chainID))
    } as ContractOptions
  }, [networkConfig, tokenFrom, tokenTo])

  const {data: reserves} = useQuery({
    queryKey: [tokenFrom, tokenTo, contractOptions, networkConfig?.chainID],
    queryFn: async () => {
      if (!networkConfig?.rpc) return '0'
      console.log('address pair', contractOptions.contractAddress)
      const rs = await contractCall(contractOptions, networkConfig.rpc, 'getReserves', [])
      console.log(rs)
      return '1'
    }
  })

  return {
    reserves
  }
}