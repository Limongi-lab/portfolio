import { FaList, FaXmark } from "react-icons/fa6"
import { profile } from "../../data/content"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"

export default function WelcomeWindow({ onStart, onClassic }: { onStart: () => void; onClassic: () => void }) {
  const { t } = useLang()

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-bg/50 backdrop-blur-[2px]">
      <div role="dialog" aria-label={t(ui.appTitle)} className="relative w-full max-w-sm rounded-2xl border border-border bg-bg p-6 shadow-2xl shadow-black/40">
        <button
          type="button"
          onClick={onStart}
          aria-label={t(ui.close)}
          className="absolute right-3 top-3 w-8 h-8 rounded-lg flex items-center justify-center text-text-dim hover:text-text hover:bg-surface-2 transition-colors"
        >
          <FaXmark size={14} />
        </button>

        <img
          src="/rafael.jpg"
          alt={profile.name}
          className="w-16 h-16 rounded-2xl object-cover object-[50%_30%] ring-2 ring-accent"
        />
        <p className="font-display font-bold text-2xl mt-4 leading-tight">{profile.name}</p>
        <p className="text-sm text-text-dim leading-relaxed mt-2">{t(ui.welcomeLead)}</p>

        <button
          type="button"
          onClick={onStart}
          className="mt-6 w-full rounded-xl bg-accent text-[#111] font-semibold py-3 hover:brightness-110 transition"
        >
          {t(ui.welcomeStart)}
        </button>

        <p className="text-xs text-text-dim mt-5 mb-2">{t(ui.modeSimpleHint)}</p>
        <button
          type="button"
          onClick={onClassic}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-lime text-[#111] font-semibold py-3 hover:brightness-110 transition"
        >
          <FaList size={14} aria-hidden="true" />
          {t(ui.modeToClassic)}
        </button>
      </div>
    </div>
  )
}
