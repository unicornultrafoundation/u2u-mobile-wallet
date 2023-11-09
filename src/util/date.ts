import { format, formatDuration, intervalToDuration } from 'date-fns'

export const formatDate = (date: Date | number | string, formatString: string) => {
  return format(new Date(date), formatString)
}

export const parseInterval = (from: Date | number | string, to: Date | number | string) => {
  const duration = intervalToDuration({start: new Date(from), end: new Date(to)})

  return formatDuration(duration)
}