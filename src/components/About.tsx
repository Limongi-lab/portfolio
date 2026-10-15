import { useLang } from "../i18n/context"
import { ui } from "../i18n/ui"
import SectionHeading from "./SectionHeading"

export default function About() {
  const { t } = useLang()
  return (
    <section id="sobre" className="py-20 border-t border-border">
      <SectionHeading first={t(ui.aboutFirst)} ghost={t(ui.aboutGhost)} />
      <div className="space-y-5 leading-relaxed max-w-xl">
        <p>{t(ui.about1)}</p>
        <p className="text-text-dim">{t(ui.about2)}</p>
        <p className="text-text-dim">{t(ui.about3)}</p>
      </div>
    </section>
  )
}
