import { useEffect, useState } from 'react'
import { Duration, getDuration, isDurationEqualsZero } from '../utils/time-utils'

export function useCountdown(eventDateTime: Date) {
  const [isFinished, setIsFinished] = useState(false)
  const [remainingTime, setRemainingTime] = useState<Duration | undefined>(undefined)

  useEffect(() => {
    const timer = setInterval(() => {
      const time = getDuration(eventDateTime, new Date())
      setRemainingTime(time)
      if (time && isDurationEqualsZero(time)) {
        setIsFinished(true)
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [eventDateTime])

  return {
    isFinished,
    remainingTime,
  }
}
