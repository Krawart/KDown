export type Duration = {
  hours: number
  minutes: number
  seconds: number
}

export function getDuration(date1: Date, date2: Date) {
  const secondsToEvent = (date1.getTime() - date2.getTime()) / 1000
  return {
    hours: Math.max(0, Math.floor(secondsToEvent / 3600)) % 24,
    minutes: Math.max(0, Math.floor(secondsToEvent / 60)) % 60,
    seconds: Math.max(0, Math.floor(secondsToEvent)) % 60,
  }
}

function getTwoSpaceNumber(number: number) {
  return `${number < 10 ? '0' : ''}${number}`
}

export function customFormatDuration(duration: Duration, delimiter?: string) {
  const delimiterSymbol = delimiter ?? ':'
  const hours = getTwoSpaceNumber(duration.hours ?? 0)
  const minutes = getTwoSpaceNumber(duration.minutes ?? 0)
  const seconds = getTwoSpaceNumber(duration.seconds ?? 0)
  return `${hours}${delimiterSymbol}${minutes}${delimiterSymbol}${seconds}`
}

export function isDurationEqualsZero(duration: Duration) {
  return duration.hours + duration.minutes + duration.seconds === 0
}
