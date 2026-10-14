import { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

function getInitialTheme(): "dark" | "light" {
  const stored = localStorage.getItem("theme")
  if (stored === "dark" || stored === "light") return stored
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <button
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className="w-10 h-10 rounded-full border border-border bg-surface/80 backdrop-blur-md flex items-center justify-center text-text-dim hover:text-accent hover:border-accent transition-colors shrink-0"
    >
      {theme === "dark" ? <FaSun size={14} /> : <FaMoon size={14} />}
    </button>
  )
}
