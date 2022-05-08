import { useEffect, useState } from 'react'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import defaultBackground from '../assets/bg-01.jpg'
import { useDebounce } from './useDebounce'

export function useCountdownSettings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const onDebounced = useDebounce()

  const [eventTitle, setEventTitle] = useState((searchParams.get('event-title') as string) ?? '')
  const [backgroundUrl, setBackgroundUrl] = useState(
    (searchParams.get('background-url') as string) ?? defaultBackground
  )
  const [finishedText, setFinishedText] = useState((searchParams.get('finished-text') as string) ?? '')
  const [eventDate, setEventDate] = useState<Date | null>(
    searchParams.get('event-date') ? new Date(searchParams.get('event-date') as string) : null
  )
  const [isPresenting, setIsPresenting] = useState<boolean>(false)

  useEffect(() => {
    onDebounced(() => {
      const params = new URLSearchParams()
      if (eventTitle.length > 0) params.append('event-title', eventTitle)
      if (finishedText.length > 0) params.append('finished-text', finishedText)
      if (backgroundUrl.length > 0 && backgroundUrl !== defaultBackground)
        params.append('background-url', backgroundUrl)
      if (eventDate !== null) params.append('event-date', eventDate.toISOString())
      setSearchParams(createSearchParams(params))
    })
  }, [eventTitle, finishedText, backgroundUrl, eventDate])

  return {
    eventTitle,
    setEventTitle,
    backgroundUrl,
    setBackgroundUrl,
    finishedText,
    setFinishedText,
    eventDate,
    setEventDate,
    isPresenting,
    setIsPresenting,
  }
}
