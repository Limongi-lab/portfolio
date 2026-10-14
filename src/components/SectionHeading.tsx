export default function SectionHeading({
  first,
  ghost,
  id,
}: {
  first: string
  ghost: string
  id?: string
}) {
  return (
    <h2 id={id} className="ghost-title mb-10">
      {first}
      <span className="ghost">{ghost}</span>
    </h2>
  )
}
