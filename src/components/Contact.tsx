import { useState } from "react"
import { FaCheck, FaGithub, FaLinkedin, FaRegEnvelope } from "react-icons/fa"
import { profile } from "../data/content"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleEmailClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard indisponível, o link mailto abaixo ainda tenta abrir normalmente
    }
    // não faz e.preventDefault(): deixa o mailto tentar abrir o cliente de email também
    void e
  }

  return (
    <section id="contato" className="px-6 md:px-16 max-w-5xl mx-auto py-24 border-t border-border">
      <div className="rounded-2xl border border-border bg-surface px-8 py-16 text-center">
        <p className="flex items-center gap-2 text-sm text-accent2 mb-3"><span className="text-accent">◆</span> Contato</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl mb-4">
          Vamos <span className="text-accent">conversar?</span>
        </h2>
        <p className="text-text-dim max-w-md mx-auto mb-2">
          Aberto a oportunidades como desenvolvedor júnior e a bater um papo
          sobre os projetos acima.
        </p>
        <p className="text-text-dim text-sm mb-8">{profile.email}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            onClick={handleEmailClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
          >
            {copied ? <FaCheck /> : <FaRegEnvelope />}
            {copied ? "Email copiado!" : "Email"}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-accent2 hover:text-accent2 transition-colors"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-accent2 hover:text-accent2 transition-colors"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
      <p className="text-text-dim text-xs mt-10 font-mono text-center">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </section>
  )
}
