export const truncate = (str: string, len: number) => {
  return `${str.substring(0, Math.min(len, str.length))}...`
}