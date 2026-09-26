export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-accent/50 blur-[80px]" />
      <div className="absolute top-[30%] -right-32 w-[540px] h-[540px] rounded-full bg-accent2/45 blur-[90px]" />
      <div className="absolute bottom-[-10%] left-[10%] w-[440px] h-[440px] rounded-full bg-accent/40 blur-[80px]" />
      <div className="absolute bottom-[15%] right-[8%] w-[320px] h-[320px] rounded-full bg-accent2/35 blur-[70px]" />

      <pre className="decor-code hidden md:block absolute top-28 right-10 font-mono text-[12px] leading-relaxed text-accent/25 select-none">
{`function build() {
  const stack = [
    "Django",
    "React",
    "PostgreSQL",
  ]
  return ship(stack)
}`}
      </pre>
      <pre className="decor-code hidden lg:block absolute bottom-20 left-6 font-mono text-[12px] leading-relaxed text-accent2/20 select-none">
{`git commit -m "new project"
npm run build
✓ ready`}
      </pre>
    </div>
  )
}
