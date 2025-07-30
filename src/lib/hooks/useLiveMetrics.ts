import { useEffect, useState } from "react"

export const useLiveMetrics = () => {
  const [value, setValue] = useState(28000)

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 500)
      setValue(prev => prev + random)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return `$${value.toLocaleString()}`
}
