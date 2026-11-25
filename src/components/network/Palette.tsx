import { FaDesktop, FaNetworkWired, FaServer } from "react-icons/fa6"
import { categories, devices, type Category } from "../../data/network"
import { useLang } from "../../i18n/context"
import DeviceIcon from "./DeviceIcon"

const categoryIcons = { network: FaNetworkWired, end: FaDesktop, servers: FaServer }

type Props = {
  category: Category
  onCategory: (category: Category) => void
  onOpen: (id: string) => void
  onHover: (ids: string[] | null) => void
}

export default function Palette({ category, onCategory, onOpen, onHover }: Props) {
  const { t } = useLang()
  const list = devices.filter((d) => d.category === category)

  return (
    <div className="flex min-w-0 flex-1">
      <div className="flex flex-col gap-1 p-2 border-r border-border w-44 shrink-0">
        {categories.map(({ id, label }) => {
          const Icon = categoryIcons[id]
          const active = id === category
          return (
            <button
              key={id}
              type="button"
              onClick={() => onCategory(id)}
              onMouseEnter={() => onHover(devices.filter((d) => d.category === id).map((d) => d.id))}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(devices.filter((d) => d.category === id).map((d) => d.id))}
              onBlur={() => onHover(null)}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-left transition-colors ${
                active ? "bg-accent text-[#111]" : "text-text-dim hover:text-text hover:bg-surface-2"
              }`}
            >
              <Icon size={13} aria-hidden="true" />
              <span className="leading-tight">{t(label)}</span>
            </button>
          )
        })}
      </div>

      <ul className="flex-1 min-w-0 flex gap-2 overflow-x-auto no-scrollbar p-3 items-start">
        {list.map((device) => (
          <li key={device.id} className="shrink-0">
            <button
              type="button"
              onClick={() => onOpen(device.id)}
              onMouseEnter={() => onHover([device.id])}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover([device.id])}
              onBlur={() => onHover(null)}
              className="group w-28 flex flex-col items-center gap-1.5 rounded-xl border border-border bg-surface/70 px-2 py-3 hover:border-accent transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-surface-2 text-accent flex items-center justify-center">
                <DeviceIcon kind={device.kind} size={22} />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase">{device.host}</span>
              <span className="text-[10px] leading-tight text-text-dim text-center">{t(device.label)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
