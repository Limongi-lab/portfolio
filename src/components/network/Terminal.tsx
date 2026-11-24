import { useEffect, useRef, useState } from "react"
import { commandNames } from "../../lib/cli"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"
import type { TerminalLine } from "./useTerminal"

export default function Terminal({
  prompt,
  lines,
  onRun,
}: {
  prompt: string
  lines: TerminalLine[]
  onRun: (input: string) => void
}) {
  const { t } = useLang()
  const [value, setValue] = useState("")
  const history = useRef<string[]>([])
  const cursor = useRef(-1)
  const scroller = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const text = value.trim()
      if (text) history.current.push(text)
      cursor.current = -1
      onRun(value)
      setValue("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const h = history.current
      if (!h.length) return
      cursor.current = cursor.current === -1 ? h.length - 1 : Math.max(0, cursor.current - 1)
      setValue(h[cursor.current])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const h = history.current
      if (cursor.current === -1) return
      cursor.current += 1
      if (cursor.current >= h.length) {
        cursor.current = -1
        setValue("")
      } else {
        setValue(h[cursor.current])
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const word = value.trim().toLowerCase()
      if (!word || word.includes(" ")) return
      const match = commandNames.find((c) => c.startsWith(word))
      if (match) setValue(`${match} `)
    }
  }

  return (
    <div
      role="region"
      aria-label={t(ui.cliAria)}
      onClick={() => input.current?.focus()}
      className="rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a] text-[#e8e8e6] font-mono text-[12.5px] leading-relaxed"
    >
      <div ref={scroller} className="h-72 overflow-y-auto p-4 no-scrollbar">
        {lines.map((line) => (
          <pre
            key={line.id}
            className={`whitespace-pre-wrap break-words font-mono ${line.kind === "in" ? "text-[#ee6a3c]" : "text-[#c9c9c6]"}`}
          >
            {line.text}
          </pre>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#ee6a3c] shrink-0">{prompt}</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t(ui.cliPlaceholder)}
            aria-label={t(ui.cliAria)}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent outline-none text-[#c8f53c] caret-[#c8f53c] placeholder:text-[#555]"
          />
        </div>
      </div>
    </div>
  )
}
