import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? scrollTop / max : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed top-0 inset-x-0 h-[3px] z-[60] pointer-events-none" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-accent to-lime"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
