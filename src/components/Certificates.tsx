import { useRef } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { certificates } from "../data/content"

export default function Certificates() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" })
  }

  return (
    <section id="certificados" className="px-6 md:px-16 max-w-5xl mx-auto py-24 border-t border-border">
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <p className="flex items-center gap-2 text-sm text-accent2 mb-3">
            <span className="text-accent">◆</span> Certificados
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl">
            Formação e <span className="text-accent">aprendizado contínuo</span>
          </h2>
        </div>
        <div className="hidden sm:flex gap-2 shrink-0">
          <button
            onClick={() => scroll(-1)}
            aria-label="Anterior"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Próximo"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {certificates.map((cert) => (
          <div
            key={cert.title}
            className="snap-start shrink-0 w-64 rounded-lg border border-border bg-surface overflow-hidden hover:border-accent transition-colors"
          >
            {cert.image && (
              <div className="h-40 bg-surface-2 overflow-hidden">
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <p className="text-xs text-accent2 mb-1">{cert.issuer}</p>
              <h3 className="font-display font-medium text-sm leading-snug">{cert.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex sm:hidden gap-2 mt-4 justify-center">
        <button
          onClick={() => scroll(-1)}
          aria-label="Anterior"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
        >
          <FaChevronLeft size={14} />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Próximo"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
        >
          <FaChevronRight size={14} />
        </button>
      </div>
    </section>
  )
}
