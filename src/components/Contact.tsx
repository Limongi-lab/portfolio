import { useState } from "react"
import { FaCheck, FaCopy, FaGithub, FaLinkedinIn, FaPaperPlane, FaRegEnvelope } from "react-icons/fa6"
import { gmailCompose, profile } from "../data/content"
import SectionHeading from "./SectionHeading"

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-dim/70 focus:border-accent focus:outline-none transition-colors"

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "activate">("idle")
  const [detail, setDetail] = useState("")

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  // Envio real, sem servidor próprio. Com VITE_WEB3FORMS_KEY usa o Web3Forms;
  // sem a chave, usa o FormSubmit (que pede ativação no primeiro envio).
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return // campo escondido: só robôs preenchem
    setStatus("sending")
    setDetail("")

    const web3Key = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
    const subject = `Contato pelo portfólio: ${form.name}`

    try {
      const res = web3Key
        ? await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              access_key: web3Key,
              subject,
              name: form.name,
              email: form.email,
              message: form.message,
            }),
          })
        : await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              message: form.message,
              _subject: subject,
              _replyto: form.email,
              _captcha: "false",
              _template: "table",
            }),
          })

      const data = await res.json().catch(() => ({}))
      const ok = String(data.success) === "true"
      const message = String(data.message ?? "")

      if (ok) {
        setStatus("sent")
        setForm({ name: "", email: "", message: "", website: "" })
      } else if (/activat/i.test(message)) {
        setStatus("activate")
      } else {
        setDetail(message)
        setStatus("error")
      }
    } catch {
      setDetail("sem conexão com o serviço de envio")
      setStatus("error")
    }
  }

  const fallbackHref = gmailCompose(
    `Contato pelo portfólio: ${form.name}`,
    `${form.message}\n\n${form.name}\n${form.email}`,
  )

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard indisponível
    }
  }

  const links = [
    { href: profile.linkedin, label: "LinkedIn", hint: "Conectar", icon: FaLinkedinIn },
    { href: profile.github, label: "GitHub", hint: "Ver código", icon: FaGithub },
  ]

  return (
    <section id="contato" className="py-20 border-t border-border">
      <SectionHeading first="Vamos" ghost="conversar?" />
      <p className="text-text-dim max-w-md leading-relaxed mb-8">
        Aberto a oportunidades como desenvolvedor júnior e a bater um papo sobre os projetos acima.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="sr-only">Seu nome</span>
            <input required value={form.name} onChange={update("name")} placeholder="Seu nome" className={fieldClass} />
          </label>
          <label className="block">
            <span className="sr-only">Seu email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="Seu email"
              className={fieldClass}
            />
          </label>
        </div>
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={update("website")}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <label className="block">
          <span className="sr-only">Mensagem</span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={update("message")}
            placeholder="Como posso ajudar?"
            className={`${fieldClass} resize-none`}
          />
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent text-[#111] font-semibold py-3.5 hover:brightness-110 transition disabled:opacity-60 disabled:cursor-wait"
        >
          <FaPaperPlane size={14} /> {status === "sending" ? "Enviando..." : "Enviar mensagem"}
        </button>
        <div aria-live="polite" className="text-sm min-h-5">
          {status === "sent" && (
            <p className="flex items-center gap-2 text-accent2">
              <FaCheck size={13} /> Mensagem enviada! Respondo no email que você informou.
            </p>
          )}
          {status === "activate" && (
            <p className="text-text-dim">
              Primeiro envio: o serviço mandou um email de ativação para {profile.email}. Abra, clique em
              Activate Form (olhe o spam) e envie de novo. Sua mensagem{" "}
              <a href={fallbackHref} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">
                também pode seguir pelo Gmail
              </a>
              .
            </p>
          )}
          {status === "error" && (
            <p className="text-text-dim">
              Não consegui enviar agora{detail ? ` (${detail})` : ""}.{" "}
              <a href={fallbackHref} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">
                Abrir no Gmail com a mensagem pronta
              </a>
              .
            </p>
          )}
        </div>
      </form>

      <div className="grid sm:grid-cols-3 gap-3 mt-10">
        {links.map(({ href, label, hint, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-border bg-surface/70 p-4 flex items-center gap-3 hover:border-accent transition-colors"
          >
            <Icon size={20} className="text-accent" />
            <span>
              <span className="block font-display font-semibold leading-tight">{label}</span>
              <span className="block text-xs text-text-dim">{hint}</span>
            </span>
          </a>
        ))}
        <div className="relative rounded-2xl border border-border bg-surface/70 hover:border-accent transition-colors">
          <a
            href={gmailCompose()}
            target="_blank"
            rel="noreferrer"
            className="p-4 pr-14 flex items-center gap-3"
          >
            <FaRegEnvelope size={20} className="text-accent shrink-0" />
            <span className="min-w-0">
              <span className="block font-display font-semibold leading-tight">Email</span>
              <span className="block text-xs text-text-dim truncate">{profile.email}</span>
            </span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email copiado" : "Copiar email"}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-dim hover:text-accent hover:border-accent transition-colors"
          >
            {copied ? <FaCheck size={13} className="text-accent" /> : <FaCopy size={13} />}
          </button>
        </div>
      </div>
    </section>
  )
}
