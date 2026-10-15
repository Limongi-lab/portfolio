import type { L } from "./context"

export const ui = {
  // navegação
  navHome: { pt: "Início", en: "Home" },
  navAbout: { pt: "Sobre", en: "About" },
  navSkills: { pt: "Ferramentas", en: "Tools" },
  navProjects: { pt: "Projetos", en: "Projects" },
  navJourney: { pt: "Trajetória", en: "Journey" },
  navCerts: { pt: "Certificados", en: "Certificates" },
  navContact: { pt: "Contato", en: "Contact" },
  navAria: { pt: "Seções", en: "Sections" },
  logoAria: { pt: "Rafael Limongi, ir ao topo", en: "Rafael Limongi, back to top" },
  langAria: { pt: "Idioma", en: "Language" },
  themeToLight: { pt: "Mudar para modo claro", en: "Switch to light mode" },
  themeToDark: { pt: "Mudar para modo escuro", en: "Switch to dark mode" },
  backToTop: { pt: "Voltar ao topo", en: "Back to top" },

  // card de perfil
  location: { pt: "Uberlândia, MG", en: "Uberlândia, MG, Brazil" },
  cardTagline: {
    pt: "Transformo problemas reais em software que funciona, do banco de dados à interface.",
    en: "I turn real problems into working software, from the database to the interface.",
  },
  available: { pt: "Aberto a oportunidades", en: "Open to opportunities" },

  // hero
  heroSr: { pt: "desenvolvedor fullstack", en: "fullstack developer" },
  heroLine: { pt: "Desenvolvedor", en: "Developer" },
  heroIntro: {
    pt: "Construo produtos completos, da modelagem de dados e APIs em Django até a interface em React. Gosto de automação, dados e de resolver problemas de verdade.",
    en: "I build complete products, from data modeling and Django APIs to the React interface. I enjoy automation, data and solving real problems.",
  },
  heroCardOne: { pt: "APIs, banco de dados e automação", en: "APIs, databases and automation" },
  heroCardTwo: { pt: "React, TypeScript e interfaces", en: "React, TypeScript and interfaces" },
  seeProjects: { pt: "Ver projetos", en: "See projects" },
  seeTools: { pt: "Ver ferramentas", en: "See tools" },

  // sobre
  aboutFirst: { pt: "Sobre", en: "About" },
  aboutGhost: { pt: "mim", en: "me" },
  about1: {
    pt: "Estudo Engenharia de Computação na UNIUBE e Gestão da Informação na UFU, e uso essa combinação para pensar produto de dois lados: como organizar e tratar dados, e como transformar isso em software que alguém realmente usa.",
    en: "I study Computer Engineering at UNIUBE and Information Management at UFU, and I use that combination to think about products from two sides: how to organize and process data, and how to turn it into software that someone actually uses.",
  },
  about2: {
    pt: "Passei por prospecção comercial (SDR) antes de migrar para desenvolvimento, e isso trouxe uma vantagem pouco técnica, mas útil: entender o que quem vai usar o produto realmente precisa, antes de escrever a primeira linha de código.",
    en: "I worked in sales prospecting (SDR) before moving into development, which gave me a less technical but useful advantage: understanding what the people who will use the product really need before writing the first line of code.",
  },
  about3: {
    pt: "Hoje construo projetos completos, do modelo de dados em Django à interface em React, priorizando código que eu mesmo entendo linha por linha e que resolve um problema real, não só um exercício.",
    en: "Today I build complete projects, from the Django data model to the React interface, favoring code I understand line by line and that solves a real problem, not just an exercise.",
  },

  // seções
  skillsFirst: { pt: "Minhas", en: "My" },
  skillsGhost: { pt: "ferramentas", en: "tools" },
  projectsFirst: { pt: "Projetos", en: "Recent" },
  projectsGhost: { pt: "recentes", en: "projects" },
  featured: { pt: "Destaque", en: "Featured" },
  shotAlt: { pt: "Captura de tela do projeto", en: "Screenshot of the project" },
  journeyFirst: { pt: "Minha", en: "My" },
  journeyGhost: { pt: "trajetória", en: "journey" },
  kindEducation: { pt: "Formação", en: "Education" },
  kindExperience: { pt: "Experiência", en: "Experience" },
  certsFirst: { pt: "Certificados", en: "Certificates" },
  certsGhost: { pt: "e cursos", en: "and courses" },
  certAlt: { pt: "Certificado", en: "Certificate" },
  certPrev: { pt: "Certificados anteriores", en: "Previous certificates" },
  certNext: { pt: "Próximos certificados", en: "Next certificates" },

  // contato
  contactFirst: { pt: "Vamos", en: "Let's" },
  contactGhost: { pt: "conversar?", en: "talk?" },
  contactIntro: {
    pt: "Aberto a oportunidades como desenvolvedor júnior e a bater um papo sobre os projetos acima.",
    en: "Open to junior developer opportunities and happy to chat about the projects above.",
  },
  formName: { pt: "Seu nome", en: "Your name" },
  formEmail: { pt: "Seu email", en: "Your email" },
  formMessage: { pt: "Como posso ajudar?", en: "How can I help?" },
  formSend: { pt: "Enviar mensagem", en: "Send message" },
  formSending: { pt: "Enviando...", en: "Sending..." },
  formSent: {
    pt: "Mensagem enviada! Respondo no email que você informou.",
    en: "Message sent! I'll reply to the email you provided.",
  },
  formSubject: { pt: "Contato pelo portfólio", en: "Portfolio contact" },
  activateLead: {
    pt: "Primeiro envio: o serviço mandou um email de ativação para",
    en: "First submission: the service sent an activation email to",
  },
  activateRest: {
    pt: "Abra, clique em Activate Form (olhe o spam) e envie de novo. Sua mensagem",
    en: "Open it, click Activate Form (check spam) and send again. Your message",
  },
  activateLink: { pt: "também pode seguir pelo Gmail", en: "can also go through Gmail" },
  errorLead: { pt: "Não consegui enviar agora", en: "I couldn't send it right now" },
  errorNoConn: { pt: "sem conexão com o serviço de envio", en: "no connection to the sending service" },
  errorLink: { pt: "Abrir no Gmail com a mensagem pronta", en: "Open in Gmail with the message ready" },
  hintConnect: { pt: "Conectar", en: "Connect" },
  hintCode: { pt: "Ver código", en: "View code" },
  emailLabel: { pt: "Email", en: "Email" },
  copyEmail: { pt: "Copiar email", en: "Copy email" },
  emailCopied: { pt: "Email copiado", en: "Email copied" },

  // rodapé
  footerTagline: {
    pt: "Do dado à interface, feito para ser usado.",
    en: "From data to interface, built to be used.",
  },
} satisfies Record<string, L>
