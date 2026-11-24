import { useCallback, useRef, useState } from "react"
import { runCommand } from "../../lib/cli"
import type { Lang } from "../../i18n/context"

export type TerminalLine = { id: number; kind: "in" | "out"; text: string }

export function useTerminal(lang: Lang, onGoto: (id: string) => void) {
  const welcome = lang === "pt" ? 'Digite "help" para ver os comandos.' : 'Type "help" to see the commands.'
  const [lines, setLines] = useState<TerminalLine[]>([{ id: 0, kind: "out", text: welcome }])
  const nextId = useRef(1)

  const exec = useCallback(
    (input: string, prompt: string) => {
      if (!input.trim()) return
      const result = runCommand(input, lang)
      if (result.clear) {
        setLines([])
      } else {
        const entries: TerminalLine[] = [
          { id: nextId.current++, kind: "in", text: `${prompt} ${input}` },
          ...result.out.map((text) => ({ id: nextId.current++, kind: "out" as const, text })),
        ]
        setLines((prev) => [...prev, ...entries])
      }
      if (result.goto) onGoto(result.goto)
      if (result.open) window.open(result.open, "_blank", "noopener,noreferrer")
    },
    [lang, onGoto],
  )

  return { lines, exec }
}
