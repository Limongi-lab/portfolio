import { projects, type Project } from "../data/content"

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-lg border border-border bg-surface overflow-hidden hover:border-accent transition-colors"
    >
      <div className={`overflow-hidden bg-surface-2 ${large ? "h-56 md:h-64" : "h-40"}`}>
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={`p-6 ${large ? "md:p-8" : ""}`}>
        <div className="flex items-start justify-between gap-4">
          <h3 className={`font-display font-semibold ${large ? "text-2xl" : "text-lg"}`}>
            {project.name}
          </h3>
          <span className="font-mono text-xs text-text-dim group-hover:text-accent2 transition-colors">
            ↗
          </span>
        </div>
        <p className="text-text-dim mt-3 leading-relaxed text-sm">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-xs text-accent2">
              {tech}
              {tech !== project.stack[project.stack.length - 1] ? " ·" : ""}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projetos" className="px-6 md:px-16 max-w-5xl mx-auto py-24 border-t border-border">
      <p className="flex items-center gap-2 text-sm text-accent2 mb-3">
        <span className="text-accent">◆</span> Projetos
      </p>
      <h2 className="font-display font-semibold text-3xl md:text-4xl mb-12">
        Alguns dos meus <span className="text-accent">projetos</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <ProjectCard project={featured} large />
        </div>
        {rest.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
