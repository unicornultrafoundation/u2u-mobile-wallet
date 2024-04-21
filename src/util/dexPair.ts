import { FACTORY_ADDRESS_MAP, INIT_CODE_HASH_MAP } from "../config/dex"
import { keccak256, getAddress, getBytes, dataSlice, solidityPacked, isBytesLike, zeroPadBytes, concat } from 'ethers'

// ByteArray = Uint8Array
// toBytes = toUtf8Bytes
// slice = dataSlice
// isBytes = isBytesLike

let PAIR_ADDRESS_CACHE: { [key: string]: string } = {}

const composeKey = (token0: string, token1: string, chainId: number) => `${chainId}-${token0}-${token1}`

function getCreate2Address(
  from_: string,
  salt_: Uint8Array | string,
  initCodeHash: `0x${string}`
) {
  const from = getBytes(getAddress(from_))
  // const salt = pad(isBytes(salt_) ? salt_ : toBytes(salt_ as Hex), {
  //   size: 32,
  // }) as ByteArray
  const salt = zeroPadBytes(
    isBytesLike(salt_) ? salt_ : getBytes(salt_),
  32) as `0x${string}`
  

  return getAddress(dataSlice(keccak256(getBytes(concat([getBytes('0xff'), from, getBytes(salt), getBytes(initCodeHash)]))), 12))
}

export const computePairAddress = ({
  factoryAddress,
  tokenA,
  tokenB,
  chainId
}: {
  factoryAddress: string
  // tokenA: ERC20Token
  // tokenB: ERC20Token
  tokenA: string
  tokenB: string
  chainId: number
}): string => {
  const [token0, token1] = (tokenA.toLowerCase() < tokenB.toLowerCase()) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  const key = composeKey(token0, token1, chainId)
  
  if (PAIR_ADDRESS_CACHE?.[key] === undefined) {
    PAIR_ADDRESS_CACHE = {
      ...PAIR_ADDRESS_CACHE,
      [key]: getCreate2Address(
        factoryAddress as `0x${string}`,
        keccak256(
          // encodePacked(['address', 'address'], [token0 as `0x${string}`, token1 as `0x${string}`])
          solidityPacked(['address', 'address'], [token0 as `0x${string}`, token1 as `0x${string}`])
        ) as `0x${string}`,
        INIT_CODE_HASH_MAP[chainId]
      ) as string,
    }
  }

  return PAIR_ADDRESS_CACHE[key]
}

export function getPairAddress(tokenA: string, tokenB: string, chainId: number): string {
  return computePairAddress({
    factoryAddress: FACTORY_ADDRESS_MAP[chainId as keyof typeof FACTORY_ADDRESS_MAP],
    tokenA,
    tokenB,
    chainId
  })
}