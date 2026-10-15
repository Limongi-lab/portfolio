import type { L, Lang } from "../i18n/context"

export const profile = {
  name: "Rafael Limongi",
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

export type Skill = { name: string; icon: string; color: string; kind: L }

const language: L = { pt: "Linguagem", en: "Language" }
const database: L = { pt: "Banco de dados", en: "Database" }

export const skills: Skill[] = [
  { name: "Python", icon: "SiPython", color: "#3776AB", kind: language },
  { name: "Django", icon: "SiDjango", color: "#44B78B", kind: { pt: "Framework web", en: "Web framework" } },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1", kind: database },
  { name: "Docker", icon: "SiDocker", color: "#2496ED", kind: { pt: "Containers", en: "Containers" } },
  { name: "React", icon: "SiReact", color: "#61DAFB", kind: { pt: "Biblioteca de interface", en: "UI library" } },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", kind: language },
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", kind: language },
  { name: "Node.js", icon: "SiNodedotjs", color: "#83CD29", kind: { pt: "Ambiente de execução", en: "Runtime environment" } },
  { name: "Java", icon: "FaJava", color: "#F89820", kind: language },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248", kind: { pt: "Banco NoSQL", en: "NoSQL database" } },
  { name: "SQLite", icon: "SiSqlite", color: "#3FA6E8", kind: database },
  { name: "Git", icon: "SiGit", color: "#F05033", kind: { pt: "Versionamento", en: "Version control" } },
]

export type Project = {
  name: string
  description: L
  stack: string[]
  href: string
  image: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: "Radar de Vagas Jr Dev",
    description: {
      pt: "API que coleta vagas reais de dev júnior (Remotive e Adzuna), extrai as tecnologias mais pedidas e calcula o gap entre o mercado e um perfil técnico, com dashboard para acompanhar a demanda ao longo do tempo.",
      en: "API that collects real junior dev job postings (Remotive and Adzuna), extracts the most requested technologies and calculates the gap between the market and a technical profile, with a dashboard to track demand over time.",
    },
    stack: ["Django REST Framework", "PostgreSQL", "Docker", "pytest", "GitHub Actions", "Chart.js"],
    href: "https://github.com/Limongi-lab/radar-vagas-jrdev",
    image: "/projects/radar-vagas.png",
    featured: true,
  },
  {
    name: "UFU Mia",
    description: {
      pt: "Site do Projeto Mia, extensão de proteção animal da UFU, no ar de verdade: gatos para adoção, doação via Pix e um painel de administração com login para a equipe editar fotos e textos sem mexer em código.",
      en: "Website of Projeto Mia, UFU's animal protection outreach program, live in production: cats up for adoption, donations via Pix and an admin panel with login so the team can edit photos and texts without touching code.",
    },
    stack: ["Django", "Django REST Framework", "React", "Vite", "Cloudinary", "Vercel", "Render"],
    href: "https://ufumia.vercel.app/",
    image: "/projects/ufu-mia.png",
  },
  {
    name: "Arcano Saber",
    description: {
      pt: "Plataforma educacional com narrativa em RPG, sistema de XP e avaliação de respostas por IA. Apresentada na Mostratec da UNIUBE.",
      en: "Educational platform with an RPG narrative, XP system and AI-graded answers. Presented at UNIUBE's Mostratec.",
    },
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Groq / LLaMA"],
    href: "https://github.com/Gustacraft45/Plataforma_ebook",
    image: "/projects/arcano-saber.png",
  },
]

export type Certificate = {
  title: L
  issuer: L
  image?: string
}

const bradesco: L = {
  pt: "Fundação Bradesco (Escola Virtual)",
  en: "Fundação Bradesco (Virtual School)",
}

export const certificates: Certificate[] = [
  {
    title: { pt: "SiSconec.TA 2026", en: "SiSconec.TA 2026" },
    issuer: { pt: "Extensão UFU (FEMEC)", en: "UFU Extension Program (FEMEC)" },
    image: "/certs/ufu-sisconecta.png",
  },
  {
    title: {
      pt: "Animação Matemática com a Biblioteca Manim em Python",
      en: "Mathematical Animation with the Manim Library in Python",
    },
    issuer: { pt: "Extensão UFU (IME)", en: "UFU Extension Program (IME)" },
    image: "/certs/ufu-manim.png",
  },
  {
    title: { pt: "Capacita+: Construa com o Gemini", en: "Capacita+: Build with Gemini" },
    issuer: { pt: "Google Cloud", en: "Google Cloud" },
    image: "/certs/google-capacita.png",
  },
  {
    title: { pt: "Introdução à Administração", en: "Introduction to Business Administration" },
    issuer: bradesco,
    image: "/certs/bradesco-administracao.png",
  },
  {
    title: {
      pt: "Introdução à Programação Orientada a Objetos (POO)",
      en: "Introduction to Object-Oriented Programming (OOP)",
    },
    issuer: bradesco,
    image: "/certs/bradesco-poo-intro.png",
  },
  {
    title: {
      pt: "Crie um site simples usando HTML, CSS e JavaScript",
      en: "Build a Simple Website with HTML, CSS and JavaScript",
    },
    issuer: bradesco,
    image: "/certs/bradesco-html-css-js.png",
  },
  {
    title: {
      pt: "Desenvolvimento Orientado a Objetos utilizando Python",
      en: "Object-Oriented Development with Python",
    },
    issuer: bradesco,
    image: "/certs/bradesco-poo-python.png",
  },
  {
    title: {
      pt: "Projeto completo Python com estruturas de dados",
      en: "Complete Python Project with Data Structures",
    },
    issuer: bradesco,
    image: "/certs/bradesco-projeto-estruturas.png",
  },
  {
    title: {
      pt: "Simplifica Inteligência Artificial Express",
      en: "Simplifica Artificial Intelligence Express",
    },
    issuer: { pt: "Simplifica Treinamentos", en: "Simplifica Treinamentos" },
    image: "/certs/simplifica-ia.png",
  },
]

export type JourneyItem = {
  kind: "education" | "experience"
  period: L
  title: L
  place: string
  description?: L
}

// Ordem do mais recente para o mais antigo.
export const journey: JourneyItem[] = [
  {
    kind: "experience",
    period: { pt: "12/2025 – 06/2026", en: "Dec 2025 – Jun 2026" },
    title: { pt: "Estágio comercial (SDR)", en: "Commercial internship (SDR)" },
    place: "Septem Capulus",
    description: {
      pt: "Desenvolvimento de comunicação e relacionamento com clientes, hoje aplicado para entender melhor o que quem usa um produto realmente precisa.",
      en: "Built communication and client relationship skills, which I now use to better understand what the people using a product actually need.",
    },
  },
  {
    kind: "education",
    period: { pt: "2024 – 2028", en: "2024 – 2028" },
    title: { pt: "Engenharia de Computação", en: "Computer Engineering" },
    place: "UNIUBE",
  },
  {
    kind: "education",
    period: { pt: "2023 – 2028", en: "2023 – 2028" },
    title: { pt: "Gestão da Informação", en: "Information Management" },
    place: "UFU",
  },
]

export const typedWords: Record<Lang, string[]> = {
  pt: ["Fullstack", "Django+React", "Automação", "Dados"],
  en: ["Fullstack", "Django+React", "Automation", "Data"],
}
