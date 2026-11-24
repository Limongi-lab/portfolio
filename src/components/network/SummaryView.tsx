import { FaArrowUpRightFromSquare, FaGithub, FaLinkedinIn } from "react-icons/fa6"
import { certificates, journey, profile, projects, skills } from "../../data/content"
import type { Device } from "../../data/network"
import { useLang } from "../../i18n/context"
import { ui } from "../../i18n/ui"
import Contact from "../Contact"
import { skillIcons } from "../skillIcons"
import SubnetCalc from "./SubnetCalc"

function About() {
  const { t } = useLang()
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <p>{t(ui.about1)}</p>
      <p className="text-text-dim">{t(ui.about2)}</p>
      <p className="text-text-dim">{t(ui.about3)}</p>
    </div>
  )
}

function Tools() {
  const { t } = useLang()
  return (
    <ul className="grid grid-cols-2 gap-2">
      {skills.map(({ name, icon, color, kind }) => {
        const Icon = skillIcons[icon]
        return (
          <li key={name} className="flex items-center gap-3 rounded-xl border border-border bg-surface/70 p-2.5">
            <span className="w-9 h-9 rounded-lg bg-[#f4f4f2] flex items-center justify-center shrink-0">
              <Icon size={18} style={{ color }} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-tight truncate">{name}</span>
              <span className="block text-[11px] text-text-dim truncate">{t(kind)}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

function ProjectView({ index }: { index: number }) {
  const { t } = useLang()
  const project = projects[index]
  return (
    <div>
      <div className="h-40 rounded-xl overflow-hidden bg-surface-2 mb-4">
        <img
          src={project.image}
          alt={`${t(ui.shotAlt)} ${project.name}`}
          loading="lazy"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <p className="text-sm text-text-dim leading-relaxed">{t(project.description)}</p>
      <ul className="flex flex-wrap gap-1.5 mt-4">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-dim">
            {tech}
          </li>
        ))}
      </ul>
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent text-[#111] font-semibold text-sm px-4 py-2.5 hover:brightness-110 transition"
      >
        {t(ui.openProject)}
        <FaArrowUpRightFromSquare size={12} aria-hidden="true" />
      </a>
    </div>
  )
}

function Journey() {
  const { t } = useLang()
  return (
    <ol className="space-y-3">
      {journey.map((item) => (
        <li key={item.title.pt} className="rounded-xl border border-border bg-surface/70 p-3.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-[#111] ${
                item.kind === "experience" ? "bg-lime" : "bg-accent"
              }`}
            >
              {item.kind === "experience" ? t(ui.kindExperience) : t(ui.kindEducation)}
            </span>
            <span className="text-xs text-text-dim">{t(item.period)}</span>
          </div>
          <p className="font-semibold text-sm leading-snug">{t(item.title)}</p>
          <p className="text-xs text-text-dim">{item.place}</p>
          {item.description && <p className="text-xs text-text-dim leading-relaxed mt-2">{t(item.description)}</p>}
        </li>
      ))}
    </ol>
  )
}

function Certs() {
  const { t } = useLang()
  return (
    <ul className="space-y-2">
      {certificates.map((cert) => (
        <li key={cert.title.pt} className="flex items-center gap-3 rounded-xl border border-border bg-surface/70 p-2.5">
          {cert.image && (
            <img
              src={cert.image}
              alt={`${t(ui.certAlt)}: ${t(cert.title)}`}
              loading="lazy"
              className="w-14 h-10 rounded-md object-cover shrink-0"
            />
          )}
          <span className="min-w-0">
            <span className="block text-sm font-medium leading-snug">{t(cert.title)}</span>
            <span className="block text-[11px] text-accent2">{t(cert.issuer)}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

function Internet() {
  const links = [
    { href: profile.linkedin, label: "LinkedIn", icon: FaLinkedinIn },
    { href: profile.github, label: "GitHub", icon: FaGithub },
  ]
  return (
    <ul className="grid gap-3">
      {links.map(({ href, label, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface/70 p-4 hover:border-accent transition-colors"
          >
            <Icon size={20} className="text-accent" />
            <span className="font-display font-semibold">{label}</span>
            <FaArrowUpRightFromSquare size={12} className="ml-auto text-text-dim" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function SummaryView({ device }: { device: Device }) {
  switch (device.view) {
    case "about":
      return <About />
    case "tools":
      return <Tools />
    case "project":
      return <ProjectView index={device.project ?? 0} />
    case "journey":
      return <Journey />
    case "certs":
      return <Certs />
    case "contact":
      return <Contact variant="panel" />
    case "calc":
      return <SubnetCalc />
    case "internet":
      return <Internet />
  }
}
