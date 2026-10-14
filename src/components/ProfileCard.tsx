import { FaCode, FaGithub, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa6"
import { gmailCompose, profile } from "../data/content"

const socials = [
  { href: profile.linkedin, label: "LinkedIn", icon: FaLinkedinIn, external: true },
  { href: profile.github, label: "GitHub", icon: FaGithub, external: true },
  { href: gmailCompose(), label: "Email", icon: FaRegEnvelope, external: true },
]

export default function ProfileCard() {
  return (
    <aside className="relative rounded-[28px] bg-card text-card-text p-5 shadow-2xl shadow-black/30">
      {/* arco tracejado, assinatura da referência */}
      <svg
        className="absolute -top-1 -left-1 w-28 h-24 text-accent pointer-events-none"
        viewBox="0 0 112 96"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 94 C 4 40, 40 6, 110 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-accent">
        <img
          src="/rafael.jpg"
          alt="Rafael Limongi"
          className="w-full h-full object-cover object-[50%_30%]"
        />
      </div>

      <div className="text-center pt-5">
        <p className="font-display font-bold text-2xl leading-tight">{profile.name}</p>
        <p className="text-sm opacity-70 mt-1">{profile.location}</p>

        <div className="flex items-center gap-3 my-4" aria-hidden="true">
          <span className="flex-1 border-t-2 border-dashed border-accent/70" />
          <span className="w-8 h-8 rounded-full bg-accent text-[#111] flex items-center justify-center">
            <FaCode size={14} />
          </span>
          <span className="flex-1 border-t-2 border-dashed border-accent/70" />
        </div>

        <p className="text-sm leading-relaxed opacity-80">
          Transformo problemas reais em software que funciona, do banco de dados à interface.
        </p>

        <div className="flex justify-center gap-3 mt-5">
          {socials.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="w-10 h-10 rounded-full border-2 border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-[#111] transition-colors"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>

        <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1.5 text-xs font-medium">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#4fae67] animate-ping opacity-60" />
            <span className="relative w-2 h-2 rounded-full bg-[#4fae67]" />
          </span>
          Aberto a oportunidades
        </p>
      </div>
    </aside>
  )
}
