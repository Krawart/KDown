import { useEffect, useRef, useState } from 'react'
import { Duration, getDuration, isDurationEqualsZero } from '../utils/time-utils'

export function useCountdown(eventDateTime: Date) {
  const now = new Date()
  const timer = useRef(0)
  const [isFinished, setIsFinished] = useState(false)
  const [remainingTime, setRemainingTime] = useState<Duration | undefined>(undefined)
  const time = getDuration(eventDateTime, now)

  useEffect(() => {
    setRemainingTime(time)
    timer.current = window.setInterval(() => {
      if (time && isDurationEqualsZero(time)) {
        setIsFinished(true)
        clearInterval(timer.current)
      }
    }, 1000)
    return () => clearInterval(timer.current)
  }, [eventDateTime, now])

  return {
    isFinished,
    remainingTime,
  }
}
