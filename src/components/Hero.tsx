import { FaArrowRight, FaDatabase, FaLayerGroup, FaNetworkWired } from "react-icons/fa6"
import { profile } from "../data/content"
import { useLang } from "../i18n/context"
import { ui } from "../i18n/ui"
import Typed from "./Typed"

export default function Hero({ onNetwork }: { onNetwork: () => void }) {
  const { t } = useLang()

  return (
    <section id="topo" className="pt-28 lg:pt-32 pb-20">
      <h1 className="ghost-title hero-title animate-rise">
        <span className="sr-only">{profile.name}, {t(ui.heroSr)}</span>
        <span aria-hidden="true" className="block">
          {t(ui.heroLine)}
        </span>
        <span aria-hidden="true" className="ghost min-h-[1em]">
          <Typed />
        </span>
      </h1>

      <p
        className="text-text-dim leading-relaxed max-w-md mt-6 animate-rise"
        style={{ animationDelay: "0.15s" }}
      >
        {t(ui.heroIntro)}
      </p>

      <div
        className="grid sm:grid-cols-2 gap-4 mt-12 animate-rise"
        style={{ animationDelay: "0.3s" }}
      >
        <a
          href="#projetos"
          className="group relative overflow-hidden rounded-2xl bg-accent text-[#111] p-5 min-h-44 flex flex-col justify-between transition-transform hover:-translate-y-1"
        >
          <FaDatabase size={20} />
          <p className="font-display font-semibold text-lg leading-snug max-w-[14rem]">
            {t(ui.heroCardOne)}
          </p>
          <span className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#111] text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
            <FaArrowRight size={13} />
          </span>
          <span className="sr-only">{t(ui.seeProjects)}</span>
        </a>

        <a
          href="#skills"
          className="group relative overflow-hidden rounded-2xl bg-lime text-[#111] p-5 min-h-44 flex flex-col justify-between transition-transform hover:-translate-y-1"
        >
          <svg
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            viewBox="0 0 300 180"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <polyline
              points="0,150 40,80 80,150 120,80 160,150 200,80 240,150 280,80 320,150"
              stroke="#fff"
              strokeWidth="6"
              strokeLinejoin="round"
            />
          </svg>
          <FaLayerGroup size={20} className="relative" />
          <p className="relative font-display font-semibold text-lg leading-snug max-w-[14rem]">
            {t(ui.heroCardTwo)}
          </p>
          <span className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#111] text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
            <FaArrowRight size={13} />
          </span>
          <span className="sr-only">{t(ui.seeTools)}</span>
        </a>

        <button
          type="button"
          onClick={onNetwork}
          className="group relative sm:col-span-2 rounded-2xl border-2 border-accent bg-surface/80 p-5 text-left flex items-center gap-5 transition-transform hover:-translate-y-1"
        >
          <span className="w-14 h-14 rounded-2xl bg-accent text-[#111] flex items-center justify-center shrink-0">
            <FaNetworkWired size={24} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-display font-semibold text-lg leading-snug">{t(ui.heroNetTitle)}</span>
            <span className="block text-sm text-text-dim leading-snug mt-1">{t(ui.heroNetText)}</span>
          </span>
          <span className="ml-auto hidden sm:inline-flex items-center gap-2 rounded-full bg-accent text-[#111] font-semibold text-sm px-4 py-2 shrink-0 transition-transform group-hover:translate-x-1">
            {t(ui.heroNetCta)}
            <FaArrowRight size={12} aria-hidden="true" />
          </span>
        </button>
      </div>
    </section>
  )
}
