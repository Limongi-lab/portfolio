import { projects, type Project } from "../data/content"

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className={`group block rounded-lg border border-border bg-surface p-6 hover:border-accent transition-colors ${
        large ? "md:p-8" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className={`font-display font-semibold ${large ? "text-2xl" : "text-lg"}`}>
          {project.name}
        </h3>
        <span className="font-mono text-xs text-text-dim group-hover:text-accent-2 transition-colors">
          ↗
        </span>
      </div>
      <p className="text-text-dim mt-3 leading-relaxed text-sm">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-5">
        {project.stack.map((tech) => (
          <span key={tech} className="font-mono text-xs text-accent-2">
            {tech}
            {tech !== project.stack[project.stack.length - 1] ? " ·" : ""}
          </span>
        ))}
      </div>
    </a>
  )
}

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projetos" className="px-6 md:px-16 max-w-5xl py-24 border-t border-border">
      <div className="grid md:grid-cols-[160px_1fr] gap-8">
        <p className="font-mono text-sm text-text-dim">Projetos</p>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <ProjectCard project={featured} large />
          </div>
          {rest.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
