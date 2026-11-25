import { useEffect, useRef, useState } from "react"
import { FaCheck, FaEnvelope } from "react-icons/fa6"
import { canvas, devices, links, vlanNames } from "../../data/network"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"
import { byId, primaryIp } from "../../lib/netsim"
import DeviceIcon from "./DeviceIcon"
import type { Anim, PduResult } from "./usePdu"

type Props = {
  selectedId: string | null
  tool: "select" | "pdu"
  pduSource: string | null
  zoom: number
  dimExcept: string[] | null
  anim: Anim | null
  result: PduResult | null
  stepMs: number
  onDevice: (id: string) => void
}

const center = (id: string) => {
  const d = byId(id)!
  return { x: d.x, y: d.y }
}

const along = (from: { x: number; y: number }, to: { x: number; y: number }, distance: number) => {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy)
  return { x: from.x + (dx / len) * distance, y: from.y + (dy / len) * distance, angle: (Math.atan2(dy, dx) * 180) / Math.PI, nx: -dy / len, ny: dx / len }
}

export default function Workspace({ selectedId, tool, pduSource, zoom, dimExcept, anim, result, stepMs, onDevice }: Props) {
  const { t } = useLang()
  const box = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = box.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const fit = size.w && size.h ? Math.min(size.w / canvas.width, size.h / canvas.height) : 0.5
  const scale = fit * zoom
  const envelope = anim ? center(anim.path[anim.step]) : null
  const pathLinks = new Set<string>()
  if (anim) {
    anim.path.slice(0, anim.step + 1).forEach((id, i, arr) => {
      if (i > 0) pathLinks.add([arr[i - 1], id].sort().join("|"))
    })
  }

  return (
    <div ref={box} className="workspace-grid absolute inset-0 overflow-auto flex">
      <div className="relative m-auto" style={{ width: canvas.width * scale, height: canvas.height * scale }}>
        <div
          className={`absolute left-0 top-0 ${tool === "pdu" ? "cursor-crosshair" : ""}`}
          style={{ width: canvas.width, height: canvas.height, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <svg className="absolute inset-0" width={canvas.width} height={canvas.height} aria-hidden="true">
            {links.map((link) => {
              const p1 = center(link.a[0])
              const p2 = center(link.b[0])
              const selected = selectedId === link.a[0] || selectedId === link.b[0]
              const traveled = pathLinks.has([link.a[0], link.b[0]].sort().join("|"))
              const e1 = along(p1, p2, 54)
              const e2 = along(p2, p1, 54)
              const l1 = along(p1, p2, 86)
              const l2 = along(p2, p1, 86)
              const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
              const dim = dimExcept && !(dimExcept.includes(link.a[0]) && dimExcept.includes(link.b[0]))
              return (
                <g key={`${link.a[0]}-${link.b[0]}`} opacity={dim ? 0.25 : 1}>
                  <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={traveled ? "var(--color-accent2)" : "var(--color-accent)"}
                    strokeWidth={traveled || selected ? 3.5 : 2.5}
                    strokeDasharray={link.wan ? "10 8" : undefined}
                    strokeLinecap="round"
                    opacity={traveled || selected ? 1 : 0.6}
                  />
                  {[e1, e2].map((e, i) => (
                    <polygon
                      key={i}
                      points="-6,-6 7,0 -6,6"
                      transform={`translate(${e.x} ${e.y}) rotate(${e.angle})`}
                      fill="var(--color-accent2)"
                    />
                  ))}
                  {[
                    { p: l1, name: link.a[1] },
                    { p: l2, name: link.b[1] },
                  ].map(({ p, name }) => (
                    <text
                      key={name + p.x}
                      x={p.x + p.nx * 11}
                      y={p.y + p.ny * 11 + 3}
                      textAnchor="middle"
                      className="fill-text-dim font-mono"
                      fontSize="10"
                    >
                      {name}
                    </text>
                  ))}
                  {link.subnet && (
                    <text
                      x={mid.x + 8}
                      y={mid.y + 4}
                      className="fill-text font-mono"
                      fontSize="11"
                      stroke="var(--color-bg)"
                      strokeWidth="4"
                      paintOrder="stroke"
                    >
                      {link.subnet}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border border-dashed border-border bg-surface/80 px-3 py-2 font-mono text-[11px] leading-relaxed text-text-dim"
            style={{ left: 600, top: 478 }}
          >
            <div className="text-accent mb-0.5">VLANs</div>
            <div>VLAN 10 {vlanNames[10]} 192.168.10.0/24</div>
            <div>VLAN 20 {vlanNames[20]} 172.16.20.0/27</div>
            <div>VLAN 99 {vlanNames[99]} 192.168.99.0/24</div>
          </div>

          {devices.map((device) => {
            const isSelected = selectedId === device.id
            const isSource = pduSource === device.id
            const dim = dimExcept && !dimExcept.includes(device.id)
            return (
              <button
                key={device.id}
                type="button"
                onClick={() => onDevice(device.id)}
                aria-pressed={isSelected}
                aria-label={`${device.host}, ${t(device.label)}`}
                style={{ left: device.x, top: device.y }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 w-32 flex flex-col items-center gap-1 text-center transition-opacity ${
                  dim ? "opacity-30" : ""
                }`}
              >
                <span
                  className={`relative w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 group-hover:-translate-y-0.5 ${
                    isSelected
                      ? "bg-accent border-accent text-[#111] shadow-[0_0_28px_var(--color-accent)]"
                      : isSource
                        ? "bg-surface border-accent2 text-accent2 shadow-[0_0_20px_var(--color-accent2)]"
                        : "bg-surface border-border text-accent group-hover:border-accent"
                  }`}
                >
                  <DeviceIcon kind={device.kind} size={30} />
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-lime ring-2 ring-bg" />
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wide">{device.host}</span>
                <span className="font-mono text-[10px] text-text-dim">{primaryIp(device)}</span>
                <span className="text-[11px] leading-tight text-text-dim">{t(device.label)}</span>
              </button>
            )
          })}

          {envelope && (
            <span
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 w-9 h-7 rounded-md bg-accent2 text-[#111] flex items-center justify-center shadow-[0_0_18px_var(--color-accent2)] pointer-events-none"
              style={{ left: envelope.x, top: envelope.y, transition: `left ${stepMs}ms linear, top ${stepMs}ms linear` }}
            >
              <FaEnvelope size={16} />
            </span>
          )}

          {result && (
            <span
              className="absolute z-20 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-accent2 text-[#111] text-xs font-semibold px-3 py-1 pointer-events-none"
              style={{ left: byId(result.id)!.x, top: byId(result.id)!.y - 78 }}
            >
              <FaCheck size={11} /> {t(ui.statusOk)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
