import type { IconType } from "react-icons"
import {
  FaArrowPointer,
  FaCircleQuestion,
  FaEnvelope,
  FaExpand,
  FaMagnifyingGlassMinus,
  FaMagnifyingGlassPlus,
} from "react-icons/fa6"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"

type Props = {
  tool: "select" | "pdu"
  onTool: (tool: "select" | "pdu") => void
  onZoomIn: () => void
  onZoomOut: () => void
  onFit: () => void
  onHelp: () => void
}

export default function Toolbar({ tool, onTool, onZoomIn, onZoomOut, onFit, onHelp }: Props) {
  const { t } = useLang()

  const buttons: { label: string; icon: IconType; active?: boolean; onClick: () => void }[] = [
    { label: t(ui.toolSelect), icon: FaArrowPointer, active: tool === "select", onClick: () => onTool("select") },
    { label: t(ui.toolPdu), icon: FaEnvelope, active: tool === "pdu", onClick: () => onTool("pdu") },
    { label: t(ui.toolZoomIn), icon: FaMagnifyingGlassPlus, onClick: onZoomIn },
    { label: t(ui.toolZoomOut), icon: FaMagnifyingGlassMinus, onClick: onZoomOut },
    { label: t(ui.toolFit), icon: FaExpand, onClick: onFit },
    { label: t(ui.toolHelp), icon: FaCircleQuestion, onClick: onHelp },
  ]

  return (
    <div role="toolbar" className="flex lg:flex-col gap-1.5 p-2 border-t lg:border-t-0 lg:border-l border-border bg-surface/60">
      {buttons.map(({ label, icon: Icon, active, onClick }) => (
        <button
          key={label}
          type="button"
          onClick={onClick}
          title={label}
          aria-label={label}
          aria-pressed={active}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
            active ? "bg-accent text-[#111]" : "text-text-dim hover:text-accent hover:bg-surface-2"
          }`}
        >
          <Icon size={15} />
        </button>
      ))}
    </div>
  )
}
