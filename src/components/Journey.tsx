import { journey } from "../data/content"
import SectionHeading from "./SectionHeading"

export default function Journey() {
  return (
    <section id="trajetoria" className="py-20 border-t border-border">
      <SectionHeading first="Minha" ghost="trajetória" />
      <ol className="relative">
        <span className="timeline-line absolute left-[22px] top-3 bottom-3 w-px" aria-hidden="true" />
        {journey.map((item, i) => (
          <li key={item.title} className="relative pl-14 pb-10 last:pb-0">
            <span
              className="absolute left-4 top-2 w-3.5 h-3.5 rounded-full bg-bg border-2 border-accent shadow-[0_0_14px_var(--color-accent)]"
              aria-hidden="true"
            />
            <span
              className="font-tech font-bold text-5xl leading-none text-transparent select-none"
              style={{ WebkitTextStroke: "1.5px var(--color-ghost)" }}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mt-3 rounded-2xl border border-border bg-surface/70 p-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    item.kind === "Experiência" ? "bg-lime text-[#111]" : "bg-accent text-[#111]"
                  }`}
                >
                  {item.kind}
                </span>
                <span className="text-sm text-text-dim">{item.period}</span>
              </div>
              <h3 className="font-display font-semibold text-lg leading-snug">{item.title}</h3>
              <p className="text-sm text-text-dim">{item.place}</p>
              {item.description && (
                <p className="text-sm text-text-dim leading-relaxed mt-3">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
