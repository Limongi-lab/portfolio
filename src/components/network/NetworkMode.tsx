import { useCallback, useState } from "react"
import { FaList, FaNetworkWired } from "react-icons/fa6"
import type { Category } from "../../data/network"
import { findDevice } from "../../data/network"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"
import { byId } from "../../lib/netsim"
import Typed from "../Typed"
import DeviceWindow, { type Tab, type WinPos } from "./DeviceWindow"
import Palette from "./Palette"
import PduPanel from "./PduPanel"
import Toolbar from "./Toolbar"
import { usePdu } from "./usePdu"
import { useTerminal } from "./useTerminal"
import WelcomeWindow from "./WelcomeWindow"
import Workspace from "./Workspace"

const clamp = (value: number) => Math.min(2.2, Math.max(0.6, Number(value.toFixed(2))))

export default function NetworkMode({ onClassic }: { onClassic: () => void }) {
  const { lang, t } = useLang()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>("summary")
  const [tool, setTool] = useState<"select" | "pdu">("select")
  const [pduSource, setPduSource] = useState<string | null>(null)
  const [simulation, setSimulation] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [category, setCategory] = useState<Category>("network")
  const [hoverIds, setHoverIds] = useState<string[] | null>(null)
  const [welcome, setWelcome] = useState(true)
  const [pos, setPos] = useState<WinPos | null>(null)

  const pdu = usePdu(simulation)

  const openDevice = useCallback((id: string) => {
    setSelectedId(id)
    setWelcome(false)
  }, [])
  const closeDevice = useCallback(() => setSelectedId(null), [])
  const terminal = useTerminal(lang, openDevice, closeDevice)

  const device = selectedId ? (findDevice(selectedId) ?? null) : null
  const effectiveTab: Tab = device && tab === "cli" && !device.cli ? "summary" : tab
  const session = device ? terminal.session(device.id) : null

  const changeTool = (next: "select" | "pdu") => {
    setTool(next)
    setPduSource(null)
  }

  const onDevice = (id: string) => {
    if (tool === "pdu") {
      if (!pduSource) {
        setPduSource(id)
      } else if (id !== pduSource) {
        pdu.send(pduSource, id)
        changeTool("select")
      }
      return
    }
    setTab("summary")
    openDevice(id)
  }

  const hint =
    tool === "pdu"
      ? pduSource
        ? t(ui.hintPduDest).replace("{src}", byId(pduSource)!.host.toUpperCase())
        : t(ui.hintPduSource)
      : t(ui.hintSelect)

  return (
    <div className="h-dvh pt-20 px-3 md:px-5 pb-3">
      <div className="h-full rounded-2xl border border-border bg-surface/70 backdrop-blur-md flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border">
          <span className="w-7 h-7 rounded-lg bg-accent text-[#111] flex items-center justify-center">
            <FaNetworkWired size={13} aria-hidden="true" />
          </span>
          <span className="font-display font-semibold text-sm">{t(ui.appTitle)}</span>
          <button
            type="button"
            onClick={onClassic}
            className="ml-auto flex items-center gap-2 rounded-full bg-lime text-[#111] font-semibold text-sm px-4 py-1.5 hover:brightness-110 transition"
          >
            <FaList size={12} aria-hidden="true" />
            {t(ui.modeToClassic)}
          </button>
        </div>

        <div className="flex items-center gap-4 px-4 py-2 border-b border-border text-xs">
          <span className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-text-dim whitespace-nowrap">
            {t(ui.appLogical)}
          </span>
          <p className="font-display font-bold text-sm md:text-base whitespace-nowrap">
            {t(ui.heroLine)} <span className="text-text-dim"><Typed /></span>
          </p>
          <p className="hidden xl:block ml-auto text-text-dim truncate">{hint}</p>
        </div>

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
          <div className="relative flex-1 min-h-0">
            <Workspace
              selectedId={selectedId}
              tool={tool}
              pduSource={pduSource}
              zoom={zoom}
              dimExcept={hoverIds}
              anim={pdu.anim}
              result={pdu.result}
              stepMs={pdu.stepMs}
              onDevice={onDevice}
            />
            {device && session && (
              <DeviceWindow
                device={device}
                tab={effectiveTab}
                onTab={setTab}
                pos={pos}
                onPos={setPos}
                lines={session.lines}
                privileged={session.privileged}
                onRun={(input) => terminal.exec(device, input)}
                onOpen={(id) => {
                  setTab("summary")
                  openDevice(id)
                }}
                onClose={closeDevice}
              />
            )}
            {welcome && <WelcomeWindow onStart={() => setWelcome(false)} onClassic={onClassic} />}
          </div>
          <Toolbar
            tool={tool}
            onTool={changeTool}
            onZoomIn={() => setZoom((z) => clamp(z + 0.2))}
            onZoomOut={() => setZoom((z) => clamp(z - 0.2))}
            onFit={() => setZoom(1)}
            onHelp={() => setWelcome(true)}
          />
        </div>

        <div className="flex h-44 shrink-0 border-t border-border bg-surface/60">
          <Palette category={category} onCategory={setCategory} onOpen={onDevice} onHover={setHoverIds} />
          <PduPanel simulation={simulation} onSimulation={setSimulation} pdus={pdu.pdus} events={pdu.events} />
        </div>
      </div>
    </div>
  )
}
