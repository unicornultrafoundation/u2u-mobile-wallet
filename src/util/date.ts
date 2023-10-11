import { format } from 'date-fns'

export const formatDate = (date: Date | number | string, formatString: string) => {
  return format(new Date(date), formatString)
}