import { profile } from "../data/content"

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "Limongi-lab", href: profile.github },
  { label: "LinkedIn", value: "rafael-limongi", href: profile.linkedin },
]

export default function Contact() {
  return (
    <section id="contato" className="px-6 md:px-16 max-w-5xl py-24 border-t border-border">
      <div className="grid md:grid-cols-[160px_1fr] gap-8">
        <p className="font-mono text-sm text-text-dim">Contato</p>
        <div>
          <p className="text-text max-w-lg leading-relaxed mb-8">
            Aberto a oportunidades como desenvolvedor júnior e a conversar
            sobre os projetos acima. A forma mais direta de chegar até mim:
          </p>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex items-baseline gap-3 font-mono text-sm hover:text-accent-2 transition-colors"
                >
                  <span className="text-text-dim w-20">{link.label}</span>
                  <span>{link.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-text-dim text-xs mt-24 font-mono">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </section>
  )
}
