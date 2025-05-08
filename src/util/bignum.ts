import BigNumber from "bignumber.js"

export const parseFromRaw = (value: string | number, decimals: number, formatted = false) => {
  const bnVal = new BigNumber(value)

  if (formatted) return bnVal.dividedBy(10 ** decimals).toFormat()
  return bnVal.dividedBy(10 ** decimals).toFixed()
}