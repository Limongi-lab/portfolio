import { FaGithub, FaLinkedin } from "react-icons/fa"
import { profile } from "../data/content"
import ThemeToggle from "./ThemeToggle"

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#skills", label: "Skills" },
  { href: "#projetos", label: "Projetos" },
  { href: "#certificados", label: "Certificados" },
  { href: "#contato", label: "Contato" },
]

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-bg/70 border-b border-border">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 md:px-16 h-20 md:h-24">
        <a href="#topo" className="font-display font-bold text-2xl md:text-3xl tracking-tight">
          <span className="text-accent">&lt;</span>
          <span className="text-text">Limongi</span>
          <span className="text-accent2">Dev</span>
          <span className="text-accent">/&gt;</span>
        </a>
        <ul className="hidden md:flex gap-7 text-sm text-text-dim">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-accent2 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors"
          >
            <FaLinkedin size={15} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors"
          >
            <FaGithub size={15} />
          </a>
          <ThemeToggle />
        </div>
      </nav>
      <ul className="flex md:hidden gap-4 justify-center text-xs text-text-dim pb-3">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="hover:text-accent2 transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}
