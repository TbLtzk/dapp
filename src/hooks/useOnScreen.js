import { useEffect, useState } from 'react'

export default function useOnScreen (ref) {
  const [isIntersecting, setIntersecting] = useState(true)

  const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))

  useEffect(() => {
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}
