import { createContext, useContext } from "react"

export type Lang = "pt" | "en"
export type L = { pt: string; en: string }

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (text: L) => string }

export const LangContext = createContext<Ctx>({
  lang: "pt",
  setLang: () => {},
  t: (text) => text.pt,
})

export const useLang = () => useContext(LangContext)
