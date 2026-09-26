import { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_0_20px_-4px_var(--color-accent)] hover:bg-accent/90 transition-colors"
    >
      <FaArrowUp size={14} />
    </button>
  )
}
