import { useState } from "react"
import { devices, links } from "../../data/network"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"
import DeviceIcon from "./DeviceIcon"

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

const point = (id: string) => {
  const d = devices.find((device) => device.id === id)!
  return { x: d.x * 1.6, y: d.y }
}

export default function Topology({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (id: string) => void
}) {
  const { t } = useLang()
  const [reduced] = useState(reducedMotion)

  return (
    <div className="overflow-x-auto no-scrollbar rounded-3xl">
      <div className="workspace-grid relative aspect-[16/10] min-w-[720px] w-full rounded-3xl border border-border bg-surface/40">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 100" aria-hidden="true">
          {links.map(([a, b], i) => {
            const p1 = point(a)
            const p2 = point(b)
            const active = selected === a || selected === b
            return (
              <g key={`${a}-${b}`}>
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  strokeDasharray={active ? undefined : "5 6"}
                  strokeLinecap="round"
                  opacity={active ? 1 : 0.45}
                  vectorEffect="non-scaling-stroke"
                  className="transition-opacity duration-300"
                />
                {!reduced && (
                  <>
                    <circle r="0.9" fill="var(--color-accent2)">
                      <animateMotion
                        dur={`${3 + (i % 3)}s`}
                        begin={`${i * 0.45}s`}
                        repeatCount="indefinite"
                        path={`M${p1.x} ${p1.y} L${p2.x} ${p2.y}`}
                      />
                    </circle>
                    <circle r="0.9" fill="var(--color-accent)">
                      <animateMotion
                        dur={`${4 + (i % 2)}s`}
                        begin={`${i * 0.7 + 1}s`}
                        repeatCount="indefinite"
                        path={`M${p2.x} ${p2.y} L${p1.x} ${p1.y}`}
                      />
                    </circle>
                  </>
                )}
              </g>
            )
          })}
        </svg>

        {devices.map((device) => {
          const isSelected = selected === device.id
          return (
            <button
              key={device.id}
              type="button"
              onClick={() => onSelect(device.id)}
              aria-pressed={isSelected}
              aria-label={`${device.host}, ${t(device.label)}`}
              style={{ left: `${device.x}%`, top: `${device.y}%` }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 w-28 flex flex-col items-center gap-1.5 text-center"
            >
              <span
                className={`relative w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-200 group-hover:-translate-y-0.5 ${
                  isSelected
                    ? "bg-accent border-accent text-[#111] shadow-[0_0_24px_var(--color-accent)]"
                    : "bg-surface border-border text-accent group-hover:border-accent"
                }`}
              >
                <DeviceIcon kind={device.kind} />
                <span
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-lime ring-2 ring-bg"
                  title={t(ui.netConnected)}
                />
                {selected === null && device.id === "r1" && (
                  <span className="absolute inset-0 rounded-2xl border-2 border-accent animate-ping opacity-40" aria-hidden="true" />
                )}
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-wide">{device.host}</span>
              <span className="text-[11px] leading-tight text-text-dim">{t(device.label)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
