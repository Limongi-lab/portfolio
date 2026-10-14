export const profile = {
  name: "Rafael Limongi",
  title: "Desenvolvedor Fullstack",
  location: "Uberlândia, MG",
  email: "limongifael@gmail.com",
  github: "https://github.com/Limongi-lab",
  linkedin: "https://linkedin.com/in/rafael-limongi",
}

export function gmailCompose(subject = "", body = "") {
  const q = new URLSearchParams({ view: "cm", fs: "1", to: profile.email })
  if (subject) q.set("su", subject)
  if (body) q.set("body", body)
  return `https://mail.google.com/mail/?${q.toString()}`
}

export type Skill = { name: string; icon: string; color: string; kind: string }

export const skills: Skill[] = [
  { name: "Python", icon: "SiPython", color: "#3776AB", kind: "Linguagem" },
  { name: "Django", icon: "SiDjango", color: "#44B78B", kind: "Framework web" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1", kind: "Banco de dados" },
  { name: "Docker", icon: "SiDocker", color: "#2496ED", kind: "Containers" },
  { name: "React", icon: "SiReact", color: "#61DAFB", kind: "Biblioteca de interface" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", kind: "Linguagem" },
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", kind: "Linguagem" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#83CD29", kind: "Ambiente de execução" },
  { name: "Java", icon: "FaJava", color: "#F89820", kind: "Linguagem" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248", kind: "Banco NoSQL" },
  { name: "SQLite", icon: "SiSqlite", color: "#3FA6E8", kind: "Banco de dados" },
  { name: "Git", icon: "SiGit", color: "#F05033", kind: "Versionamento" },
]

export type Project = {
  name: string
  description: string
  stack: string[]
  href: string
  image: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: "Radar de Vagas Jr Dev",
    description:
      "API que coleta vagas reais de dev júnior (Remotive e Adzuna), extrai as tecnologias mais pedidas e calcula o gap entre o mercado e um perfil técnico, com dashboard para acompanhar a demanda ao longo do tempo.",
    stack: ["Django REST Framework", "PostgreSQL", "Docker", "pytest", "GitHub Actions", "Chart.js"],
    href: "https://github.com/Limongi-lab/radar-vagas-jrdev",
    image: "/projects/radar-vagas.png",
    featured: true,
  },
  {
    name: "UFU Mia",
    description:
      "Site do Projeto Mia, extensão de proteção animal da UFU, no ar de verdade: gatos para adoção, doação via Pix e um painel de administração com login para a equipe editar fotos e textos sem mexer em código.",
    stack: ["Django", "Django REST Framework", "React", "Vite", "Cloudinary", "Vercel", "Render"],
    href: "https://ufumia.vercel.app/",
    image: "/projects/ufu-mia.png",
  },
  {
    name: "Arcano Saber",
    description:
      "Plataforma educacional com narrativa em RPG, sistema de XP e avaliação de respostas por IA. Apresentada na Mostratec da UNIUBE.",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Groq / LLaMA"],
    href: "https://github.com/Gustacraft45/Plataforma_ebook",
    image: "/projects/arcano-saber.png",
  },
]

export type Certificate = {
  title: string
  issuer: string
  image?: string
  href?: string
}

// Envie as imagens dos certificados e eu preencho esta lista.
export const certificates: Certificate[] = [
  {
    title: "SiSconec.TA 2026",
    issuer: "Extensão UFU (FEMEC)",
    image: "/certs/ufu-sisconecta.png",
  },
  {
    title: "Animação Matemática com a Biblioteca Manim em Python",
    issuer: "Extensão UFU (IME)",
    image: "/certs/ufu-manim.png",
  },
  {
    title: "Capacita+: Construa com o Gemini",
    issuer: "Google Cloud",
    image: "/certs/google-capacita.png",
  },
  {
    title: "Introdução à Administração",
    issuer: "Fundação Bradesco (Escola Virtual)",
    image: "/certs/bradesco-administracao.png",
  },
  {
    title: "Introdução à Programação Orientada a Objetos (POO)",
    issuer: "Fundação Bradesco (Escola Virtual)",
    image: "/certs/bradesco-poo-intro.png",
  },
  {
    title: "Crie um site simples usando HTML, CSS e JavaScript",
    issuer: "Fundação Bradesco (Escola Virtual)",
    image: "/certs/bradesco-html-css-js.png",
  },
  {
    title: "Desenvolvimento Orientado a Objetos utilizando Python",
    issuer: "Fundação Bradesco (Escola Virtual)",
    image: "/certs/bradesco-poo-python.png",
  },
  {
    title: "Projeto completo Python com estruturas de dados",
    issuer: "Fundação Bradesco (Escola Virtual)",
    image: "/certs/bradesco-projeto-estruturas.png",
  },
  {
    title: "Simplifica Inteligência Artificial Express",
    issuer: "Simplifica Treinamentos",
    image: "/certs/simplifica-ia.png",
  },
]

export const education = [
  { period: "2024 - 2028", title: "Engenharia de Computação", place: "UNIUBE" },
  { period: "2023 - 2028", title: "Gestão da Informação", place: "UFU" },
]

export const experience = [
  {
    period: "12/2025 – 06/2026",
    title: "Estágio",
    place: "Septem Capulus",
    description:
      "Desenvolvimento de comunicação e relacionamento com clientes, hoje aplicado para entender melhor o que quem usa um produto realmente precisa.",
  },
]

export type JourneyItem = {
  kind: "Formação" | "Experiência"
  period: string
  title: string
  place: string
  description?: string
}

// Ordem do mais recente para o mais antigo.
export const journey: JourneyItem[] = [
  {
    kind: "Experiência",
    period: "12/2025 – 06/2026",
    title: "Estágio comercial (SDR)",
    place: "Septem Capulus",
    description: experience[0].description,
  },
  {
    kind: "Formação",
    period: "2024 – 2028",
    title: "Engenharia de Computação",
    place: "UNIUBE",
  },
  {
    kind: "Formação",
    period: "2023 – 2028",
    title: "Gestão da Informação",
    place: "UFU",
  },
]

export const typedWords = ["Fullstack", "Django+React", "Automação", "Dados"]
