import { useState } from "react"
import { FaArrowRight, FaEnvelope, FaPaperPlane } from "react-icons/fa6"
import { useLang } from "../i18n/context"
import { ui } from "../i18n/ui"
import { byId, findPath, primaryIp } from "../lib/netsim"
import DeviceIcon from "./network/DeviceIcon"
import { usePdu } from "./network/usePdu"
import SectionHeading from "./SectionHeading"

const layout: Record<string, { x: number; y: number }> = {
  isp: { x: 8, y: 50 },
  r1: { x: 26, y: 50 },
  csw1: { x: 44, y: 50 },
  asw1: { x: 66, y: 22 },
  dsw1: { x: 66, y: 78 },
  pc0: { x: 90, y: 22 },
  "srv-mia": { x: 90, y: 78 },
}

const miniLinks: [string, string][] = [
  ["isp", "r1"],
  ["r1", "csw1"],
  ["csw1", "asw1"],
  ["csw1", "dsw1"],
  ["asw1", "pc0"],
  ["dsw1", "srv-mia"],
]

const ids = Object.keys(layout)

export default function MiniNetwork({ onNetwork }: { onNetwork: () => void }) {
  const { t } = useLang()
  const [selectedId, setSelectedId] = useState("pc0")
  const pdu = usePdu(false)
  const sending = pdu.anim !== null
  const last = pdu.pdus[pdu.pdus.length - 1]
  const selected = byId(selectedId)!
  const envelope = pdu.anim ? layout[pdu.anim.path[pdu.anim.step]] : null

  return (
    <section id="rede" className="py-20 border-t border-border">
      <SectionHeading first={t(ui.miniFirst)} ghost={t(ui.miniGhost)} />
      <p className="text-text-dim max-w-md leading-relaxed mb-8">{t(ui.miniText)}</p>

      <div className="workspace-grid relative aspect-[16/9] sm:aspect-[2/1] w-full rounded-3xl border border-border bg-surface/40">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {miniLinks.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={layout[a].x}
              y1={layout[a].y}
              x2={layout[b].x}
              y2={layout[b].y}
              stroke="var(--color-accent)"
              strokeWidth={2}
              strokeLinecap="round"
              opacity={selectedId === a || selectedId === b ? 1 : 0.55}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {ids.map((id) => {
          const device = byId(id)!
          const active = selectedId === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedId(id)}
              aria-pressed={active}
              aria-label={`${device.host}, ${t(device.label)}`}
              style={{ left: `${layout[id].x}%`, top: `${layout[id].y}%` }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12"
            >
              <span
                className={`absolute inset-0 rounded-xl border-2 flex items-center justify-center transition-all duration-200 group-hover:-translate-y-0.5 ${
                  active
                    ? "bg-accent border-accent text-[#111] shadow-[0_0_20px_var(--color-accent)]"
                    : "bg-surface border-border text-accent group-hover:border-accent"
                }`}
              >
                <DeviceIcon kind={device.kind} size={22} />
              </span>
              <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 font-mono text-[10px] sm:text-[11px] font-semibold uppercase whitespace-nowrap">
                {device.host}
              </span>
            </button>
          )
        })}

        {envelope && (
          <span
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 w-8 h-6 rounded-md bg-accent2 text-[#111] flex items-center justify-center shadow-[0_0_14px_var(--color-accent2)] pointer-events-none"
            style={{
              left: `${envelope.x}%`,
              top: `${envelope.y}%`,
              transition: `left ${pdu.stepMs}ms linear, top ${pdu.stepMs}ms linear`,
            }}
          >
            <FaEnvelope size={14} />
          </span>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-surface/70 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <span className="w-12 h-12 rounded-xl bg-accent text-[#111] flex items-center justify-center shrink-0">
          <DeviceIcon kind={selected.kind} size={24} />
        </span>
        <div className="min-w-0">
          <p className="font-display font-semibold leading-tight">
            <span className="font-mono uppercase">{selected.host}</span>
            <span className="text-text-dim font-normal"> · {t(selected.label)}</span>
          </p>
          <p className="text-sm text-text-dim leading-snug mt-1">{t(selected.role)}</p>
          <p className="font-mono text-xs text-text-dim mt-1">{primaryIp(selected)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={sending}
          onClick={() => pdu.send("pc0", "srv-mia")}
          className="inline-flex items-center gap-2 rounded-xl bg-accent text-[#111] font-semibold text-sm px-4 py-2.5 hover:brightness-110 transition disabled:opacity-60"
        >
          <FaPaperPlane size={13} aria-hidden="true" />
          {sending ? t(ui.miniSending) : t(ui.miniSend)}
        </button>
        <button
          type="button"
          onClick={onNetwork}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-accent text-text font-semibold text-sm px-4 py-2 hover:bg-accent hover:text-[#111] transition-colors"
        >
          {t(ui.heroNetCta)}
          <FaArrowRight size={12} aria-hidden="true" />
        </button>
      </div>

      <p className="text-sm text-text-dim mt-3 min-h-5" aria-live="polite">
        {last && !sending
          ? t(ui.miniDelivered).replace("{n}", String((findPath(last.src, last.dst)?.length ?? 1) - 1))
          : t(ui.miniPick)}
      </p>
    </section>
  )
}
