import { useState } from 'react'

function useDebounce(delay) {
  const [handler, setHandler] = useState(null)

  return (callback) => {
    if (handler) {
      clearTimeout(handler)
    }

    const delayedHandler = setTimeout(() => {
      callback()
    }, delay)

    setHandler(delayedHandler)
  }
}

export default useDebounce
