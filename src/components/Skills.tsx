import { skillGroups } from "../data/content"

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-16 max-w-5xl py-24 border-t border-border">
      <div className="grid md:grid-cols-[160px_1fr] gap-8">
        <p className="font-mono text-sm text-text-dim">Skills</p>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8 max-w-2xl">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="text-text-dim text-sm mb-3">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-2.5 py-1 rounded border border-border bg-surface text-text"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
