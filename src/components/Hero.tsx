import { profile } from "../data/content"

export default function Hero() {
  return (
    <section
      id="topo"
      className="min-h-[92vh] flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto gap-14 lg:flex-row lg:items-center"
    >
      <div className="max-w-xl">
        <p
          className="text-sm text-accent2 mb-6 opacity-0 animate-[fadeUp_0.6s_ease_forwards]"
          style={{ animationDelay: "0.05s" }}
        >
          {profile.location}
        </p>
        <h1
          className="font-display font-semibold text-5xl md:text-6xl leading-[1.05] tracking-tight opacity-0 animate-[fadeUp_0.7s_ease_forwards]"
          style={{ animationDelay: "0.15s" }}
        >
          {profile.name}
        </h1>
        <h2
          className="font-display text-2xl md:text-3xl text-text-dim mt-4 opacity-0 animate-[fadeUp_0.7s_ease_forwards]"
          style={{ animationDelay: "0.3s" }}
        >
          {profile.title}
        </h2>
        <p
          className="text-text-dim mt-6 leading-relaxed opacity-0 animate-[fadeUp_0.7s_ease_forwards]"
          style={{ animationDelay: "0.45s" }}
        >
          Construo produtos completos, da modelagem de dados e APIs em
          Django até a interface em React. Gosto de automação, dados e de
          transformar problemas reais em software que funciona.
        </p>
        <div
          className="flex gap-4 mt-10 opacity-0 animate-[fadeUp_0.7s_ease_forwards]"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#projetos"
            className="px-5 py-2.5 rounded-md bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
          >
            Ver projetos
          </a>
          <a
            href="#contato"
            className="px-5 py-2.5 rounded-md border border-border text-text hover:border-accent2 hover:text-accent2 transition-colors"
          >
            Contato
          </a>
        </div>
      </div>

      <div
        className="hidden lg:block w-[380px] shrink-0 opacity-0 animate-[fadeUp_0.8s_ease_forwards]"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-2xl shadow-black/40">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e05252]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#e0b552]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4fae67]" />
            <span className="font-mono text-xs text-text-dim ml-3">dev.ts</span>
          </div>
          <pre className="font-mono text-[13px] leading-relaxed p-5 overflow-x-auto">
            <code>
              <span className="text-accent2">const</span> <span className="text-text">dev</span> = {"{"}
              {"\n"}  name: <span className="text-accent">"Rafael Limongi"</span>,
              {"\n"}  role: <span className="text-accent">"fullstack"</span>,
              {"\n"}  stack: [<span className="text-accent">"Django"</span>, <span className="text-accent">"React"</span>, <span className="text-accent">"PostgreSQL"</span>],
              {"\n"}  status: <span className="text-accent">"aberto a oportunidades"</span>,
              {"\n"}
              {"}"}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
