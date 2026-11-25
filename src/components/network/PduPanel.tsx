import { useEffect, useState } from "react"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"
import { byId } from "../../lib/netsim"
import type { Pdu, PduEvent } from "./usePdu"

type Props = {
  simulation: boolean
  onSimulation: (simulation: boolean) => void
  pdus: Pdu[]
  events: PduEvent[]
}

function Clock() {
  const { t } = useLang()
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")
  return (
    <span className="font-mono text-xs text-text-dim">
      {t(ui.clockLabel)}: {pad(Math.floor(seconds / 3600))}:{pad(Math.floor(seconds / 60) % 60)}:{pad(seconds % 60)}
    </span>
  )
}

const host = (id: string) => (id === "-" ? "-" : (byId(id)?.host.toUpperCase() ?? id))

export default function PduPanel({ simulation, onSimulation, pdus, events }: Props) {
  const { t } = useLang()
  const [tab, setTab] = useState<"pdu" | "events">("pdu")
  const shown = simulation ? tab : "pdu"

  const head = "text-left font-medium text-text-dim px-2 py-1.5 border-b border-border"
  const cell = "px-2 py-1.5 font-mono"

  return (
    <div className="hidden lg:flex flex-col w-[430px] shrink-0 border-l border-border">
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border">
        <Clock />
        <div className="flex gap-1 rounded-full border border-border bg-surface p-0.5">
          {[
            { id: false, label: t(ui.modeRealtime) },
            { id: true, label: t(ui.modeSimulation) },
          ].map(({ id, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                onSimulation(id)
                setTab(id ? "events" : "pdu")
              }}
              aria-pressed={simulation === id}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                simulation === id ? "bg-accent text-[#111]" : "text-text-dim hover:text-text"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {simulation && (
        <div role="tablist" className="flex gap-4 px-3 pt-2 text-xs">
          {[
            { id: "pdu" as const, label: t(ui.pduList) },
            { id: "events" as const, label: t(ui.eventList) },
          ].map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={shown === id}
              onClick={() => setTab(id)}
              className={`pb-1 border-b-2 ${shown === id ? "border-accent text-text" : "border-transparent text-text-dim"}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-auto no-scrollbar text-xs">
        {shown === "pdu" ? (
          pdus.length ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th className={head}>{t(ui.colStatus)}</th>
                  <th className={head}>{t(ui.colSource)}</th>
                  <th className={head}>{t(ui.colDest)}</th>
                  <th className={head}>{t(ui.colType)}</th>
                  <th className={head}>{t(ui.colTime)}</th>
                </tr>
              </thead>
              <tbody>
                {pdus.map((p) => (
                  <tr key={p.n}>
                    <td className={`${cell} text-accent2`}>{t(ui.statusOk)}</td>
                    <td className={cell}>{host(p.src)}</td>
                    <td className={cell}>{host(p.dst)}</td>
                    <td className={cell}>ICMP</td>
                    <td className={cell}>{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-4 text-text-dim">{t(ui.pduEmpty)}</p>
          )
        ) : events.length ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className={head}>{t(ui.colTime)}</th>
                <th className={head}>{t(ui.colLast)}</th>
                <th className={head}>{t(ui.colAt)}</th>
                <th className={head}>{t(ui.colType)}</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td className={cell}>{e.time}</td>
                  <td className={cell}>{host(e.last)}</td>
                  <td className={cell}>{host(e.at)}</td>
                  <td className={cell}>ICMP</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-text-dim">{t(ui.eventEmpty)}</p>
        )}
      </div>
    </div>
  )
}
