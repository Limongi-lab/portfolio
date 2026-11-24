import { useCallback, useState } from "react"
import { findDevice } from "../../data/network"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"
import DevicePanel, { type Tab } from "./DevicePanel"
import Topology from "./Topology"
import { useTerminal } from "./useTerminal"

export default function NetworkMode() {
  const { lang, t } = useLang()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>("summary")

  const onGoto = useCallback((id: string) => setSelectedId(id === "home" ? null : id), [])
  const terminal = useTerminal(lang, onGoto)

  const device = selectedId ? findDevice(selectedId) ?? null : null
  const prompt = device ? `${device.host.toUpperCase()}>` : "RAFAEL>"

  const select = (id: string) => {
    setSelectedId(id)
    setTab("summary")
  }

  const quick = (command: string) => {
    const fallback = selectedId ?? "r1"
    setSelectedId(fallback)
    setTab("cli")
    terminal.exec(command, `${fallback.toUpperCase()}>`)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-28 pb-16">
      <h1 className="ghost-title mb-4 animate-rise">
        <span className="sr-only">{`Rafael Limongi, ${t(ui.heroSr)}`}</span>
        <span aria-hidden="true" className="block">
          {t(ui.heroLine)}
        </span>
        <span aria-hidden="true" className="ghost">
          Fullstack
        </span>
      </h1>
      <p className="text-text-dim max-w-lg leading-relaxed mb-10">{t(ui.netHint)}</p>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8 items-start">
        <Topology selected={selectedId} onSelect={select} />
        <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto no-scrollbar">
          <DevicePanel
            device={device}
            tab={tab}
            onTab={setTab}
            lines={terminal.lines}
            onRun={(input) => terminal.exec(input, prompt)}
            onQuick={quick}
          />
        </div>
      </div>
    </div>
  )
}
