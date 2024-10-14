export const getUniqueByField = (array: Record<string, any>[], field: string) => {
  return [...new Map(array.map(item =>
    [item[field], item])).values()];
}