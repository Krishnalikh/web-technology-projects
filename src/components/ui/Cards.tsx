import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white dark:bg-zinc-900 rounded-2xl shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>
}
