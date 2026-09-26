import { education, experience } from "../data/content"

export default function About() {
  return (
    <section id="sobre" className="px-6 md:px-16 max-w-5xl mx-auto py-24 border-t border-border">
      <p className="flex items-center gap-2 text-sm text-accent2 mb-3">
        <span className="text-accent">◆</span> Sobre
      </p>
      <div className="grid md:grid-cols-[1fr_260px] gap-12 items-center">
        <div className="space-y-5 text-text leading-relaxed order-2 md:order-1">
          <h2 className="font-display font-semibold text-3xl md:text-4xl leading-tight mb-4">
            Transformando dados em <span className="text-accent">software real</span>
          </h2>
          <p>
            Estudo Engenharia de Computação na UNIUBE e Gestão da Informação na
            UFU, e uso essa combinação para pensar produto de dois lados: como
            organizar e tratar dados, e como transformar isso em software que
            alguém realmente usa.
          </p>
          <p>
            Passei por prospecção comercial (SDR) antes de migrar para
            desenvolvimento, e isso trouxe uma vantagem pouco técnica, mas
            útil: entender o que quem vai usar o produto realmente precisa,
            antes de escrever a primeira linha de código.
          </p>
          <p>
            Hoje construo projetos completos, do modelo de dados em Django à
            interface em React, priorizando código que eu mesmo entendo linha
            por linha e que resolve um problema real, não só um exercício.
          </p>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-52 h-52 md:w-60 md:h-60">
            <div className="absolute inset-0 rounded-full bg-accent/30 blur-2xl" />
            <img
              src="/rafael.jpg"
              alt="Rafael Limongi"
              className="relative w-full h-full rounded-full object-cover border-2 border-accent shadow-[0_0_40px_-8px_var(--color-accent)]"
            />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-10 mt-16">
        <div>
          <p className="text-xs uppercase tracking-wide text-text-dim mb-4">Formação</p>
          <ul className="space-y-4">
            {education.map((item) => (
              <li key={item.title} className="border-l-2 border-accent pl-4">
                <p className="text-xs text-accent2">{item.period}</p>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-text-dim">{item.place}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-text-dim mb-4">Experiência</p>
          <ul className="space-y-4">
            {experience.map((item) => (
              <li key={item.title} className="border-l-2 border-accent2 pl-4">
                <p className="text-xs text-accent2">{item.period}</p>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-text-dim">{item.place}</p>
                <p className="text-sm text-text-dim mt-1">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
