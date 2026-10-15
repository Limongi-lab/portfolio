import { useRef } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { certificates } from "../data/content"
import { useLang } from "../i18n/context"
import { ui } from "../i18n/ui"
import SectionHeading from "./SectionHeading"

const arrowClass =
  "w-11 h-11 rounded-full border border-border bg-surface flex items-center justify-center text-text-dim hover:border-accent hover:text-accent transition-colors"

export default function Certificates() {
  const { t } = useLang()
  const trackRef = useRef<HTMLUListElement>(null)

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" })
  }

  return (
    <section id="certificados" className="py-20 border-t border-border">
      <SectionHeading first={t(ui.certsFirst)} ghost={t(ui.certsGhost)} />

      <ul
        ref={trackRef}
        className="no-scrollbar flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
      >
        {certificates.map((cert) => (
          <li
            key={cert.title.pt}
            className="snap-start shrink-0 w-64 rounded-2xl border border-border bg-surface/70 overflow-hidden transition-colors hover:border-accent"
          >
            {cert.image && (
              <div className="h-40 bg-surface-2 overflow-hidden">
                <img
                  src={cert.image}
                  alt={`${t(ui.certAlt)}: ${t(cert.title)}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <p className="text-xs text-accent2 mb-1">{t(cert.issuer)}</p>
              <h3 className="font-display font-medium text-sm leading-snug">{t(cert.title)}</h3>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 justify-end mt-5">
        <button onClick={() => scroll(-1)} aria-label={t(ui.certPrev)} className={arrowClass}>
          <FaChevronLeft size={13} />
        </button>
        <button onClick={() => scroll(1)} aria-label={t(ui.certNext)} className={arrowClass}>
          <FaChevronRight size={13} />
        </button>
      </div>
    </section>
  )
}
