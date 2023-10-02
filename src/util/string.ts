export const truncate = (str: string, len: number) => {
  return `${str.substring(0, Math.min(len, str.length))}...`
}

export const shortenAddress = (str: string, head: number, tail: number) => {
  return `${str.substring(0, head)}...${str.substring(str.length - tail)}`
}