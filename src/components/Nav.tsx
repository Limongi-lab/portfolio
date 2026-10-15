import { useEffect, useState } from "react"
import { FaAward, FaCode, FaHouse, FaRegEnvelope, FaRoute, FaToolbox, FaUser } from "react-icons/fa6"
import type { IconType } from "react-icons"
import { useLang, type L } from "../i18n/context"
import { ui } from "../i18n/ui"
import LangSwitch from "./LangSwitch"
import ThemeToggle from "./ThemeToggle"

type Item = { id: string; label: L; icon: IconType }

const items: Item[] = [
  { id: "topo", label: ui.navHome, icon: FaHouse },
  { id: "sobre", label: ui.navAbout, icon: FaUser },
  { id: "skills", label: ui.navSkills, icon: FaToolbox },
  { id: "projetos", label: ui.navProjects, icon: FaCode },
  { id: "trajetoria", label: ui.navJourney, icon: FaRoute },
  { id: "certificados", label: ui.navCerts, icon: FaAward },
  { id: "contato", label: ui.navContact, icon: FaRegEnvelope },
]

export default function Nav() {
  const { t } = useLang()
  const [active, setActive] = useState("topo")

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none bg-bg/75 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a
            href="#topo"
            className="pointer-events-auto font-display font-bold text-xl md:text-2xl tracking-tight"
            aria-label={t(ui.logoAria)}
          >
            <span className="text-accent">&lt;</span>
            <span className="text-text">Limongi</span>
            <span className="text-accent2">Dev</span>
            <span className="text-accent">/&gt;</span>
          </a>
          <div className="pointer-events-auto flex items-center gap-2">
            <LangSwitch />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <nav
        aria-label={t(ui.navAria)}
        className="fixed z-50 pointer-events-none inset-x-0 bottom-4 md:bottom-auto md:top-4 flex justify-center px-4"
      >
        <ul className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-surface/80 backdrop-blur-md p-1.5 shadow-lg shadow-black/20">
          {items.map(({ id, label, icon: Icon }) => {
            const isActive = active === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-label={t(label)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center gap-2 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-[#111] px-3.5"
                      : "w-10 justify-center text-text-dim hover:text-text hover:bg-surface-2"
                  }`}
                >
                  <Icon size={15} />
                  {isActive && <span className="hidden sm:inline">{t(label)}</span>}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
