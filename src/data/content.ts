export const profile = {
  name: "Rafael Limongi",
  title: "Desenvolvedor Fullstack",
  location: "Uberlândia, MG",
  email: "limongifael@gmail.com",
  github: "https://github.com/Limongi-lab",
  linkedin: "https://linkedin.com/in/rafael-limongi",
}

export type Skill = { name: string; icon: string; color: string }

export const skills: Skill[] = [
  { name: "Python", icon: "SiPython", color: "#3776AB" },
  { name: "Django", icon: "SiDjango", color: "#44B78B" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1" },
  { name: "Docker", icon: "SiDocker", color: "#2496ED" },
  { name: "React", icon: "SiReact", color: "#61DAFB" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#83CD29" },
  { name: "Java", icon: "FaJava", color: "#F89820" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { name: "SQLite", icon: "SiSqlite", color: "#3FA6E8" },
  { name: "Git", icon: "SiGit", color: "#F05033" },
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
      "Site do Projeto Mia, extensão de proteção animal da UFU: cadastro de animais para adoção, histórias de resgates e doação via Pix.",
    stack: ["Django", "React", "TypeScript"],
    href: "https://github.com/Limongi-lab/ufu.mia",
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
