import { useEffect, useState, type ReactNode } from "react"
import { LangContext, type L, type Lang } from "./context"

function initialLang(): Lang {
  const stored = localStorage.getItem("lang")
  if (stored === "pt" || stored === "en") return stored
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en"
}

const titles: L = {
  pt: "Rafael Limongi — Desenvolvedor Fullstack",
  en: "Rafael Limongi — Fullstack Developer",
}

export default function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    localStorage.setItem("lang", lang)
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en"
    document.title = titles[lang]
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: (text) => text[lang] }}>
      {children}
    </LangContext.Provider>
  )
}
