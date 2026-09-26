import {
  SiDjango,
  SiDocker,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSqlite,
  SiTypescript,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import type { IconType } from "react-icons"
import { skills } from "../data/content"

const iconMap: Record<string, IconType> = {
  SiPython,
  SiDjango,
  SiPostgresql,
  SiDocker,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  FaJava,
  SiMongodb,
  SiSqlite,
  SiGit,
}

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-16 max-w-5xl mx-auto py-24 border-t border-border">
      <p className="flex items-center gap-2 text-sm text-accent2 mb-3">
        <span className="text-accent">◆</span> Skills
      </p>
      <h2 className="font-display font-semibold text-3xl md:text-4xl mb-2">
        Tecnologias que fazem parte da <span className="text-accent">minha jornada</span>
      </h2>
      <p className="text-text-dim mb-12">
        Ferramentas que uso para construir produtos de ponta a ponta.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map(({ name, icon, color }) => {
          const Icon = iconMap[icon]
          return (
            <div
              key={name}
              className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface py-8 px-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent"
            >
              <Icon
                className="text-3xl transition-transform duration-300 group-hover:scale-110"
                style={{ color }}
              />
              <span className="text-sm text-text-dim transition-colors duration-300 group-hover:text-text">
                {name}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
