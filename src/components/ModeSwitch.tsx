import { FaList, FaNetworkWired } from "react-icons/fa6"
import { useLang } from "../i18n/context"
import { ui } from "../i18n/ui"

export type Mode = "classic" | "network"

export default function ModeSwitch({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  const { t } = useLang()
  const next: Mode = mode === "network" ? "classic" : "network"
  const label = t(next === "network" ? ui.modeToNetwork : ui.modeToClassic)

  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      aria-label={label}
      title={label}
      className="h-10 rounded-full border border-border bg-surface/80 backdrop-blur-md px-3 md:px-4 flex items-center gap-2 text-sm font-medium text-text-dim hover:text-accent hover:border-accent transition-colors"
    >
      {next === "network" ? <FaNetworkWired size={14} /> : <FaList size={14} />}
      <span className="hidden md:inline">{label}</span>
    </button>
  )
}
