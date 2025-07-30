"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="p-2 rounded-md border flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span className="text-xs">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  )
}
