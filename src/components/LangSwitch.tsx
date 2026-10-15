import { useLang, type Lang } from "../i18n/context"
import { ui } from "../i18n/ui"

function BrazilFlag() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
      <defs>
        <clipPath id="flag-br">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-br)">
        <rect width="32" height="32" fill="#009c3b" />
        <polygon points="16,4.5 29.5,16 16,27.5 2.5,16" fill="#ffdf00" />
        <circle cx="16" cy="16" r="6" fill="#002776" />
        <path d="M10.3 14.6 Q16 12.6 21.7 17.2" stroke="#fff" strokeWidth="1.2" fill="none" />
      </g>
    </svg>
  )
}

function UsaFlag() {
  const stripe = 32 / 13
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
      <defs>
        <clipPath id="flag-us">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-us)">
        <rect width="32" height="32" fill="#fff" />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} y={i * 2 * stripe} width="32" height={stripe} fill="#b22234" />
        ))}
        <rect width="15" height={stripe * 7} fill="#3c3b6e" />
        {[0, 1, 2].flatMap((r) =>
          [0, 1, 2].map((c) => (
            <circle key={`${r}${c}`} cx={3.2 + c * 4.4} cy={3.6 + r * 4.6} r="0.9" fill="#fff" />
          )),
        )}
      </g>
    </svg>
  )
}

const options: { lang: Lang; label: string; Flag: () => React.JSX.Element }[] = [
  { lang: "pt", label: "Português (Brasil)", Flag: BrazilFlag },
  { lang: "en", label: "English", Flag: UsaFlag },
]

export default function LangSwitch() {
  const { lang, setLang, t } = useLang()

  return (
    <div
      role="group"
      aria-label={t(ui.langAria)}
      className="h-10 flex items-center gap-1 rounded-full border border-border bg-surface/80 backdrop-blur-md px-1.5"
    >
      {options.map(({ lang: code, label, Flag }) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`w-7 h-7 rounded-full overflow-hidden transition-all duration-200 ${
              active
                ? "ring-2 ring-accent ring-offset-2 ring-offset-surface scale-105"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            <Flag />
          </button>
        )
      })}
    </div>
  )
}
