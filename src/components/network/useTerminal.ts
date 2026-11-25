import { useCallback, useRef, useState } from "react"
import type { Device } from "../../data/network"
import type { Lang } from "../../i18n/context"
import { promptFor, runCommand } from "../../lib/cli"

export type TerminalLine = { id: number; kind: "in" | "out"; text: string }
type Session = { lines: TerminalLine[]; privileged: boolean }

const welcome = (lang: Lang): TerminalLine => ({
  id: 0,
  kind: "out",
  text: lang === "pt" ? 'Digite "help" para ver os comandos.' : 'Type "help" to see the commands.',
})

export function useTerminal(lang: Lang, onGoto: (id: string) => void, onClose: () => void) {
  const [sessions, setSessions] = useState<Record<string, Session>>({})
  const nextId = useRef(1)

  const session = (id: string): Session => sessions[id] ?? { lines: [welcome(lang)], privileged: false }

  const exec = useCallback(
    (device: Device, input: string) => {
      if (!input.trim()) return
      const current = sessions[device.id] ?? { lines: [welcome(lang)], privileged: false }
      const result = runCommand(input, lang, { device, privileged: current.privileged })
      const privileged = result.privileged ?? current.privileged
      const prompt = promptFor(device, current.privileged)

      let lines = current.lines
      if (result.clear) {
        lines = []
      } else {
        lines = [
          ...current.lines,
          { id: nextId.current++, kind: "in", text: `${prompt} ${input}` },
          ...result.out.map((text) => ({ id: nextId.current++, kind: "out" as const, text })),
        ]
      }
      setSessions((prev) => ({ ...prev, [device.id]: { lines, privileged } }))

      if (result.goto) onGoto(result.goto)
      if (result.close) onClose()
      if (result.open) window.open(result.open, "_blank", "noopener,noreferrer")
    },
    [lang, sessions, onGoto, onClose],
  )

  return { session, exec }
}
