import { type Device } from "../../data/network"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"
import { configFor } from "../../lib/config"
import { profile } from "../../data/content"
import DeviceIcon from "./DeviceIcon"
import SummaryView from "./SummaryView"
import Terminal from "./Terminal"
import type { TerminalLine } from "./useTerminal"

export type Tab = "summary" | "config" | "cli"

const quickCommands = ["show version", "show ip interface brief", "ping srv-mia", "subnet 192.168.10.0/24"]

export default function DevicePanel({
  device,
  tab,
  onTab,
  lines,
  onRun,
  onQuick,
}: {
  device: Device | null
  tab: Tab
  onTab: (tab: Tab) => void
  lines: TerminalLine[]
  onRun: (input: string) => void
  onQuick: (command: string) => void
}) {
  const { lang, t } = useLang()
  const prompt = device ? `${device.host.toUpperCase()}>` : "RAFAEL>"

  if (!device) {
    return (
      <aside className="rounded-3xl border border-border bg-surface/80 backdrop-blur-md p-5">
        <div className="flex items-center gap-4">
          <img
            src="/rafael.jpg"
            alt={profile.name}
            className="w-16 h-16 rounded-2xl object-cover object-[50%_30%] ring-2 ring-accent"
          />
          <div>
            <p className="font-display font-bold text-xl leading-tight">{profile.name}</p>
            <p className="inline-flex items-center gap-2 text-xs text-text-dim mt-1">
              <span className="w-2 h-2 rounded-full bg-[#4fae67]" aria-hidden="true" />
              {t(ui.available)}
            </p>
          </div>
        </div>
        <p className="text-sm text-text-dim leading-relaxed mt-5">{t(ui.netWelcome)}</p>

        <p className="text-xs text-text-dim mt-6 mb-2">{t(ui.netTry)}</p>
        <ul className="flex flex-wrap gap-2">
          {quickCommands.map((command) => (
            <li key={command}>
              <button
                type="button"
                onClick={() => onQuick(command)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs hover:border-accent hover:text-accent transition-colors"
              >
                {command}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    )
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "summary", label: t(ui.tabSummary) },
    { id: "config", label: t(ui.tabConfig) },
    { id: "cli", label: t(ui.tabCli) },
  ]

  return (
    <aside className="rounded-3xl border border-border bg-surface/80 backdrop-blur-md p-5">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-11 h-11 rounded-xl bg-accent text-[#111] flex items-center justify-center shrink-0">
          <DeviceIcon kind={device.kind} size={22} />
        </span>
        <div className="min-w-0">
          <p className="font-display font-semibold leading-tight truncate">{t(device.label)}</p>
          <p className="font-mono text-xs text-text-dim uppercase">{device.host}</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-text-dim">
          <span className="w-2 h-2 rounded-full bg-lime" aria-hidden="true" />
          {t(ui.netConnected)}
        </span>
      </div>

      <div role="tablist" className="flex gap-1 rounded-full border border-border bg-surface p-1 mb-5">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => onTab(id)}
            className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
              tab === id ? "bg-accent text-[#111]" : "text-text-dim hover:text-text"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === "summary" && <SummaryView device={device} />}
        {tab === "config" && (
          <pre className="rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a] p-4 font-mono text-[12.5px] leading-relaxed text-[#c9c9c6] overflow-x-auto max-h-96">
            {configFor(device, lang).join("\n")}
          </pre>
        )}
        {tab === "cli" && <Terminal prompt={prompt} lines={lines} onRun={onRun} />}
      </div>
    </aside>
  )
}

