const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#skills", label: "Skills" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
]

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-bg/70 border-b border-border">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 md:px-16 h-16">
        <a href="#topo" className="font-display font-semibold text-lg tracking-tight">
          <span className="text-accent">&lt;</span>
          <span className="text-text">Rafael</span>
          <span className="text-accent-2">Limongi</span>
          <span className="text-accent">/&gt;</span>
        </a>
        <ul className="flex gap-4 sm:gap-7 text-xs sm:text-sm text-text-dim">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-accent-2 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
