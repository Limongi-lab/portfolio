import { typedWords } from "../data/content"
import { useLang } from "../i18n/context"
import { useTyped } from "../lib/useTyped"

export default function Typed() {
  const { lang } = useLang()
  const text = useTyped(typedWords[lang])

  return (
    <>
      {text}
      <span className="inline-block w-[0.07em] h-[0.85em] -mb-[0.05em] ml-1 bg-accent animate-caret" />
    </>
  )
}
