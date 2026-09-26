export default function About() {
  return (
    <section id="sobre" className="px-6 md:px-16 max-w-5xl py-24 border-t border-border">
      <div className="grid md:grid-cols-[160px_1fr] gap-8">
        <p className="font-mono text-sm text-text-dim">Sobre</p>
        <div className="max-w-2xl space-y-5 text-text leading-relaxed">
          <p>
            Estudo Engenharia de Computação na UNIUBE e Gestão da Informação na
            UFU, e uso essa combinação para pensar produto de dois lados: como
            organizar e tratar dados, e como transformar isso em software que
            alguém realmente usa.
          </p>
          <p>
            Passei por prospecção comercial (SDR) antes de migrar para
            desenvolvimento — o que trouxe uma vantagem pouco técnica, mas
            útil: entender o que quem vai usar o produto realmente precisa,
            antes de escrever a primeira linha de código.
          </p>
          <p>
            Hoje construo projetos completos, do modelo de dados em Django à
            interface em React, priorizando código que eu mesmo entendo linha
            por linha — e que resolve um problema real, não só um exercício.
          </p>
        </div>
      </div>
    </section>
  )
}
