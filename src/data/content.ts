export const profile = {
  name: "Rafael Limongi",
  title: "Desenvolvedor Fullstack",
  location: "Uberlândia, MG",
  email: "limongifael@gmail.com",
  github: "https://github.com/Limongi-lab",
  linkedin: "https://linkedin.com/in/rafael-limongi",
}

export const skillGroups: { label: string; items: string[] }[] = [
  { label: "Linguagens", items: ["Python", "JavaScript", "TypeScript", "Java", "SQL"] },
  { label: "Backend", items: ["Django", "Django REST Framework", "Node.js", "Express"] },
  { label: "Frontend", items: ["React", "Vite", "HTML", "CSS"] },
  { label: "Dados & Infra", items: ["PostgreSQL", "MongoDB", "SQLite", "Docker", "Git"] },
]

export type Project = {
  name: string
  description: string
  stack: string[]
  href: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: "Radar de Vagas Jr Dev",
    description:
      "API que coleta vagas reais de dev júnior (Remotive e Adzuna), extrai as tecnologias mais pedidas e calcula o gap entre o mercado e um perfil técnico — com dashboard para acompanhar a demanda ao longo do tempo.",
    stack: ["Django REST Framework", "PostgreSQL", "Docker", "pytest", "GitHub Actions", "Chart.js"],
    href: "https://github.com/Limongi-lab/radar-vagas-jrdev",
    featured: true,
  },
  {
    name: "UFU Mia",
    description:
      "Site do Projeto Mia, extensão de proteção animal da UFU: cadastro de animais para adoção, histórias de resgates e doação via Pix.",
    stack: ["Django", "React", "TypeScript"],
    href: "https://github.com/Limongi-lab/ufu.mia",
  },
  {
    name: "Arcano Saber",
    description:
      "Plataforma educacional com narrativa em RPG, sistema de XP e avaliação de respostas por IA. Apresentada na Mostratec da UNIUBE.",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Groq / LLaMA"],
    href: "https://lnkd.in/dCMpDYum",
  },
]
