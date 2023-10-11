import BigNumber from "bignumber.js"

export const parseFromRaw = (value: string | number, decimals: number, format = false) => {
  const bnVal = new BigNumber(value)

  if (format) return bnVal.dividedBy(10 ** decimals).toFormat()
  return bnVal.dividedBy(10 ** decimals).toFormat()
}