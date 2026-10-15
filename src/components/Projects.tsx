import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import { projects } from "../data/content"
import { useLang } from "../i18n/context"
import { ui } from "../i18n/ui"
import SectionHeading from "./SectionHeading"

export default function Projects() {
  const { t } = useLang()
  return (
    <section id="projetos" className="py-20 border-t border-border">
      <SectionHeading first={t(ui.projectsFirst)} ghost={t(ui.projectsGhost)} />
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.name}>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col sm:flex-row gap-5 rounded-2xl border border-border bg-surface/70 p-4 transition-colors hover:border-accent"
            >
              <div className="sm:w-48 shrink-0 h-36 sm:h-auto sm:min-h-32 rounded-xl overflow-hidden bg-surface-2">
                <img
                  src={project.image}
                  alt={`${t(ui.shotAlt)} ${project.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-semibold text-xl leading-tight">
                    {project.name}
                    {project.featured && (
                      <span className="ml-3 align-middle rounded-full bg-lime px-2.5 py-0.5 text-[11px] font-semibold text-[#111]">
                        {t(ui.featured)}
                      </span>
                    )}
                  </h3>
                  <FaArrowUpRightFromSquare
                    size={13}
                    className="mt-1.5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-text-dim text-sm leading-relaxed mt-2">{t(project.description)}</p>
                <ul className="flex flex-wrap gap-1.5 mt-4">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-dim"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
