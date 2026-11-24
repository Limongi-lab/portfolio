import { useMemo, useState } from "react"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"
import { subnet } from "../../lib/subnet"

const examples = ["192.168.10.0/24", "172.16.20.0/27", "10.10.10.0/30"]

export default function SubnetCalc() {
  const { t } = useLang()
  const [value, setValue] = useState(examples[0])
  const result = useMemo(() => subnet(value), [value])

  const rows = result
    ? [
        [t(ui.subnetNetwork), `${result.network}/${result.prefix}`],
        [t(ui.subnetMask), result.mask],
        [t(ui.subnetWildcard), result.wildcard],
        [t(ui.subnetBroadcast), result.broadcast],
        [t(ui.subnetFirst), result.first],
        [t(ui.subnetLast), result.last],
        [t(ui.subnetHosts), String(result.hosts)],
      ]
    : []

  return (
    <div>
      <p className="text-sm text-text-dim leading-relaxed mb-4">{t(ui.subnetIntro)}</p>
      <label className="block">
        <span className="sr-only">{t(ui.devCalc)}</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          inputMode="decimal"
          placeholder="192.168.10.0/24"
          aria-invalid={!result}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 font-mono text-sm focus:border-accent focus:outline-none transition-colors"
        />
      </label>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-xs text-text-dim">{t(ui.subnetExamples)}:</span>
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setValue(example)}
            className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-text-dim hover:border-accent hover:text-accent transition-colors"
          >
            {example}
          </button>
        ))}
      </div>

      {result ? (
        <dl className="mt-5 divide-y divide-border rounded-2xl border border-border bg-surface/70">
          {rows.map(([label, content]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
              <dt className="text-xs text-text-dim">{label}</dt>
              <dd className="font-mono text-sm">{content}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-5 text-sm text-accent" role="alert">
          {t(ui.subnetInvalid)}
        </p>
      )}
    </div>
  )
}
