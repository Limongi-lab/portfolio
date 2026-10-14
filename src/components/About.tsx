import SectionHeading from "./SectionHeading"

export default function About() {
  return (
    <section id="sobre" className="py-20 border-t border-border">
      <SectionHeading first="Sobre" ghost="mim" />
      <div className="space-y-5 leading-relaxed max-w-xl">
        <p>
          Estudo Engenharia de Computação na UNIUBE e Gestão da Informação na UFU, e uso essa
          combinação para pensar produto de dois lados: como organizar e tratar dados, e como
          transformar isso em software que alguém realmente usa.
        </p>
        <p className="text-text-dim">
          Passei por prospecção comercial (SDR) antes de migrar para desenvolvimento, e isso trouxe
          uma vantagem pouco técnica, mas útil: entender o que quem vai usar o produto realmente
          precisa, antes de escrever a primeira linha de código.
        </p>
        <p className="text-text-dim">
          Hoje construo projetos completos, do modelo de dados em Django à interface em React,
          priorizando código que eu mesmo entendo linha por linha e que resolve um problema real,
          não só um exercício.
        </p>
      </div>
    </section>
  )
}
