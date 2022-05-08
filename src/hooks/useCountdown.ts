import { useEffect, useRef, useState } from 'react'
import { Duration, getDuration, isDurationEqualsZero } from '../time-utils'

export function useCountdown(eventDateTime: Date) {
  const now = new Date()
  const timer = useRef(0)
  const [isFinished, setIsFinished] = useState(false)
  const [remainingTime, setRemainingTime] = useState<Duration | undefined>(undefined)

  useEffect(() => {
    timer.current = window.setInterval(() => {
      const time = getDuration(eventDateTime, now)
      if (time && isDurationEqualsZero(time)) {
        setIsFinished(true)
        clearInterval(timer.current)
      }
      setRemainingTime(time)
    }, 1000)
    return () => clearInterval(timer.current)
  }, [eventDateTime, now])

  return {
    isFinished,
    remainingTime,
  }
}
