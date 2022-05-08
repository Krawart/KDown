import { useCallback, useRef } from 'react'

export const useDebounce = () => {
  const debounceTimeout = useRef<NodeJS.Timeout>()

  return useCallback(
    (callback: () => void, timeout = 500) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
      debounceTimeout.current = setTimeout(callback, timeout)
    },
    [],
  )
}
