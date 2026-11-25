import { skillName, skills } from "../data/content"
import { useLang } from "../i18n/context"
import { ui } from "../i18n/ui"
import SectionHeading from "./SectionHeading"
import { skillIcons } from "./skillIcons"

export default function Skills() {
  const { lang, t } = useLang()
  return (
    <section id="skills" className="py-20 border-t border-border">
      <SectionHeading first={t(ui.skillsFirst)} ghost={t(ui.skillsGhost)} />
      <ul className="grid sm:grid-cols-2 gap-3">
        {skills.map((skill) => {
          const { name, icon, color, kind } = skill
          const Icon = skillIcons[icon]
          return (
            <li
              key={name}
              style={{ "--skill": color } as React.CSSProperties}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/70 p-3.5 transition-colors duration-300 hover:border-[var(--skill)]"
            >
              <span className="w-12 h-12 rounded-xl bg-[#f4f4f2] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Icon size={24} style={{ color }} />
              </span>
              <span>
                <span className="block font-display font-semibold leading-tight">{skillName(skill, lang)}</span>
                <span className="block text-xs text-text-dim mt-0.5">{t(kind)}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
