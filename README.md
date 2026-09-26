# Rafael Limongi - Portfólio

Portfólio pessoal de Rafael Limongi, desenvolvedor fullstack: Django/DRF,
React e PostgreSQL, entre outras tecnologias.

🔗 [rafaellimongi.com](https://rafaellimongi.com)

## Seções

- **Hero**: apresentação e stack
- **Sobre**: formação, experiência e trajetória
- **Skills**: tecnologias com ícones
- **Projetos**: Radar de Vagas Jr Dev, UFU Mia, Arcano Saber
- **Certificados**: carrossel com certificados de cursos e extensões
- **Contato**: email, LinkedIn e GitHub

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- react-icons
- Deploy: Vercel

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
  components/   # Nav, Hero, About, Skills, Projects, Certificates, Contact...
  data/         # conteúdo (perfil, projetos, skills, certificados)
  index.css     # tema (tokens de cor claro/escuro) e estilos globais
public/
  projects/     # screenshots dos projetos
  certs/        # imagens dos certificados
```

## Tema claro/escuro

O tema é controlado por `data-theme` no elemento `<html>` e persistido em
`localStorage`. As cores de cada tema estão em `src/index.css`.

## Deploy

Hospedado na Vercel, com domínio próprio `rafaellimongi.com` apontado via DNS.
