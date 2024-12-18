export const getUniqueByField = (array: Record<string, any>[], field: string) => {
  if (array.length === 0) return []
  return [...new Map(
    array.map(item => [item[field], item])
  ).values()];
}