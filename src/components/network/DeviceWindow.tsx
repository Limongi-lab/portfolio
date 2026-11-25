import { useRef } from "react"
import { FaXmark } from "react-icons/fa6"
import type { Device } from "../../data/network"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"
import { configFor } from "../../lib/config"
import { promptFor } from "../../lib/cli"
import DeviceIcon from "./DeviceIcon"
import SummaryView from "./SummaryView"
import Terminal from "./Terminal"
import type { TerminalLine } from "./useTerminal"

export type Tab = "summary" | "config" | "cli"
export type WinPos = { x: number; y: number }

type Props = {
  device: Device
  tab: Tab
  onTab: (tab: Tab) => void
  pos: WinPos | null
  onPos: (pos: WinPos) => void
  lines: TerminalLine[]
  privileged: boolean
  onRun: (input: string) => void
  onOpen: (id: string) => void
  onClose: () => void
}

export default function DeviceWindow({ device, tab, onTab, pos, onPos, lines, privileged, onRun, onOpen, onClose }: Props) {
  const { lang, t } = useLang()
  const frame = useRef<HTMLDivElement>(null)
  const drag = useRef<{ dx: number; dy: number } | null>(null)

  const tabs: { id: Tab; label: string }[] = [
    { id: "summary", label: t(ui.tabSummary) },
    { id: "config", label: t(ui.tabConfig) },
    ...(device.cli ? [{ id: "cli" as Tab, label: t(ui.tabCli) }] : []),
  ]

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = frame.current
    const parent = el?.offsetParent as HTMLElement | null
    if (!el || !parent || (e.target as HTMLElement).closest("button")) return
    const box = el.getBoundingClientRect()
    const parentBox = parent.getBoundingClientRect()
    drag.current = { dx: e.clientX - box.left, dy: e.clientY - box.top }
    onPos({ x: box.left - parentBox.left, y: box.top - parentBox.top })
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = frame.current
    const parent = el?.offsetParent as HTMLElement | null
    if (!drag.current || !el || !parent) return
    const parentBox = parent.getBoundingClientRect()
    const x = Math.min(Math.max(0, e.clientX - parentBox.left - drag.current.dx), parentBox.width - 80)
    const y = Math.min(Math.max(0, e.clientY - parentBox.top - drag.current.dy), parentBox.height - 48)
    onPos({ x, y })
  }

  const onPointerUp = () => {
    drag.current = null
  }

  return (
    <div
      ref={frame}
      role="dialog"
      aria-label={`${device.host.toUpperCase()}, ${t(device.label)}`}
      style={pos ? { left: pos.x, top: pos.y } : { right: 16, top: 16 }}
      className="absolute z-30 w-[470px] max-w-[calc(100%-1rem)] max-h-[calc(100%-2rem)] flex flex-col rounded-2xl border border-border bg-bg/95 backdrop-blur-md shadow-2xl shadow-black/40 max-md:!fixed max-md:!inset-x-2 max-md:!left-2 max-md:!right-2 max-md:!top-auto max-md:!bottom-2 max-md:!w-auto max-md:max-h-[70vh]"
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="flex items-center gap-3 px-4 py-3 border-b border-border cursor-grab active:cursor-grabbing select-none touch-none"
      >
        <span className="w-9 h-9 rounded-lg bg-accent text-[#111] flex items-center justify-center shrink-0">
          <DeviceIcon kind={device.kind} size={20} />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-sm font-semibold uppercase leading-tight">{device.host}</p>
          <p className="text-xs text-text-dim truncate">{t(device.label)}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t(ui.close)}
          className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center text-text-dim hover:text-text hover:bg-surface-2 transition-colors"
        >
          <FaXmark size={14} />
        </button>
      </div>

      <div role="tablist" className="flex gap-1 px-4 pt-3">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => onTab(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === id ? "bg-accent text-[#111]" : "text-text-dim hover:text-text"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="p-4 overflow-y-auto no-scrollbar">
        {tab === "summary" && <SummaryView device={device} onOpen={onOpen} />}
        {tab === "config" && (
          <pre className="rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a] p-4 font-mono text-[12.5px] leading-relaxed text-[#c9c9c6] overflow-x-auto">
            {configFor(device, lang).join("\n")}
          </pre>
        )}
        {tab === "cli" && <Terminal prompt={promptFor(device, privileged)} lines={lines} onRun={onRun} />}
      </div>
    </div>
  )
}
