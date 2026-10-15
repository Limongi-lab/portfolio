import { useEffect, useState } from "react"
import { FaArrowRight, FaDatabase, FaLayerGroup } from "react-icons/fa6"
import { profile, typedWords } from "../data/content"
import { useLang } from "../i18n/context"
import { ui } from "../i18n/ui"

function useTyped(words: string[]) {
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
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

export default function Hero() {
  const { lang, t } = useLang()
  const typed = useTyped(typedWords[lang])

  return (
    <section id="topo" className="pt-28 lg:pt-32 pb-20">
      <h1 className="ghost-title hero-title animate-rise">
        <span className="sr-only">{profile.name}, {t(ui.heroSr)}</span>
        <span aria-hidden="true" className="block">
          {t(ui.heroLine)}
        </span>
        <span aria-hidden="true" className="ghost min-h-[1em]">
          {typed}
          <span className="inline-block w-[0.07em] h-[0.85em] -mb-[0.05em] ml-1 bg-accent animate-caret" />
        </span>
      </h1>

      <p
        className="text-text-dim leading-relaxed max-w-md mt-6 animate-rise"
        style={{ animationDelay: "0.15s" }}
      >
        {t(ui.heroIntro)}
      </p>

      <div
        className="grid sm:grid-cols-2 gap-4 mt-12 animate-rise"
        style={{ animationDelay: "0.3s" }}
      >
        <a
          href="#projetos"
          className="group relative overflow-hidden rounded-2xl bg-accent text-[#111] p-5 min-h-44 flex flex-col justify-between transition-transform hover:-translate-y-1"
        >
          <FaDatabase size={20} />
          <p className="font-display font-semibold text-lg leading-snug max-w-[14rem]">
            {t(ui.heroCardOne)}
          </p>
          <span className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#111] text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
            <FaArrowRight size={13} />
          </span>
          <span className="sr-only">{t(ui.seeProjects)}</span>
        </a>

        <a
          href="#skills"
          className="group relative overflow-hidden rounded-2xl bg-lime text-[#111] p-5 min-h-44 flex flex-col justify-between transition-transform hover:-translate-y-1"
        >
          <svg
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            viewBox="0 0 300 180"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <polyline
              points="0,150 40,80 80,150 120,80 160,150 200,80 240,150 280,80 320,150"
              stroke="#fff"
              strokeWidth="6"
              strokeLinejoin="round"
            />
          </svg>
          <FaLayerGroup size={20} className="relative" />
          <p className="relative font-display font-semibold text-lg leading-snug max-w-[14rem]">
            {t(ui.heroCardTwo)}
          </p>
          <span className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#111] text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
            <FaArrowRight size={13} />
          </span>
          <span className="sr-only">{t(ui.seeTools)}</span>
        </a>
      </div>
    </section>
  )
}
