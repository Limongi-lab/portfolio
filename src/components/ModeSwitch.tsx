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
      className={`h-10 rounded-full px-3 sm:px-4 flex items-center gap-2 text-sm font-semibold text-[#111] hover:brightness-110 transition ${
        next === "network" ? "bg-accent" : "bg-lime"
      }`}
    >
      {next === "network" ? <FaNetworkWired size={14} /> : <FaList size={14} />}
      <span className="hidden sm:inline whitespace-nowrap">{label}</span>
    </button>
  )
}
