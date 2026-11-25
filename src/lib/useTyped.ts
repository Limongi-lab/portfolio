import { useEffect, useState } from "react"

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function useTyped(words: string[]) {
  const reduced = prefersReduced()
  const [text, setText] = useState(reduced ? words[0] : "")

  useEffect(() => {
    if (reduced) return
    let word = 0
    let chars = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = words[word]
      chars += deleting ? -1 : 1
      setText(current.slice(0, chars))

      let delay = deleting ? 45 : 95
      if (!deleting && chars === current.length) {
        deleting = true
        delay = 1700
      } else if (deleting && chars === 0) {
        deleting = false
        word = (word + 1) % words.length
        delay = 350
      }
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [words, reduced])

  return reduced ? words[0] : text
}
