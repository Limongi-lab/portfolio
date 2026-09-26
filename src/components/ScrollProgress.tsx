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
    <div className="fixed top-0 right-0 h-full w-[3px] bg-transparent z-50 hidden sm:block">
      <div
        className="w-full bg-gradient-to-b from-accent to-accent2 transition-[height] duration-150"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  )
}
