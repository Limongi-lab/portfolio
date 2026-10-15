import { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa"
import { useLang } from "../i18n/context"
import { ui } from "../i18n/ui"

export default function BackToTop() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t(ui.backToTop)}
      className="fixed bottom-24 md:bottom-6 right-5 z-40 w-11 h-11 rounded-full bg-accent text-[#111] flex items-center justify-center hover:brightness-110 transition"
    >
      <FaArrowUp size={14} />
    </button>
  )
}
