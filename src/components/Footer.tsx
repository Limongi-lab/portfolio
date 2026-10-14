import { profile } from "../data/content"

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 pb-28 md:pb-10 text-center">
      <p className="font-display font-bold text-xl tracking-tight">
        <span className="text-accent">&lt;</span>
        Limongi
        <span className="text-accent2">Dev</span>
        <span className="text-accent">/&gt;</span>
      </p>
      <p className="text-text-dim text-sm mt-2">Do dado à interface, feito para ser usado.</p>
      <p className="text-text-dim text-xs mt-6">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
