import { certificates, journey, profile, projects, skills } from "../data/content"
import { devices, findDevice } from "../data/network"
import type { Lang } from "../i18n/context"
import { subnet } from "./subnet"

export type CliResult = { out: string[]; clear?: boolean; goto?: string; open?: string }

const tx = (lang: Lang, pt: string, en: string) => (lang === "pt" ? pt : en)
const is = (word: string | undefined, full: string) => !!word && full.startsWith(word.toLowerCase())

export const commandNames = ["help", "show", "ping", "connect", "open", "subnet", "clear", "exit"]

const projectHosts = ["srv-radar", "srv-mia", "srv-arcano"]

function help(lang: Lang): string[] {
  const rows: [string, string, string][] = [
    ["help", "lista os comandos", "list the commands"],
    ["show version", "quem sou eu", "who I am"],
    ["show ip interface brief", "projetos e status", "projects and status"],
    ["show running-config", "skills e ferramentas", "skills and tools"],
    ["show journey", "formação e experiência", "education and experience"],
    ["show certificates", "cursos e certificados", "courses and certificates"],
    ["show contact", "como falar comigo", "how to reach me"],
    ["ping <host>", "testa um dispositivo (ex: srv-mia)", "test a device (e.g. srv-mia)"],
    ["connect <host>", "abre um dispositivo", "open a device"],
    ["open <host>", "abre o projeto ou link", "open the project or link"],
    ["subnet <ip>/<prefixo>", "calculadora de sub-redes", "subnet calculator"],
    ["clear", "limpa a tela", "clear the screen"],
    ["exit", "volta ao início", "back to start"],
  ]
  return rows.map(([cmd, pt, en]) => `${cmd.padEnd(26)}${tx(lang, pt, en)}`)
}

function version(lang: Lang): string[] {
  return [
    `${profile.name}, ${tx(lang, "desenvolvedor fullstack", "fullstack developer")}`,
    tx(lang, "Uberlândia, MG, Brasil", "Uberlândia, MG, Brazil"),
    tx(
      lang,
      "Engenharia de Computação (UNIUBE) e Gestão da Informação (UFU)",
      "Computer Engineering (UNIUBE) and Information Management (UFU)",
    ),
    tx(lang, "Foco: backend, automação e análise de dados", "Focus: backend, automation and data analysis"),
    tx(lang, "Aberto a oportunidades", "Open to opportunities"),
  ]
}

function interfaces(lang: Lang): string[] {
  const live = ["srv-mia"]
  const rows = projects.map((p, i) => {
    const host = projectHosts[i]
    const status = live.includes(host) ? tx(lang, "no ar", "live") : "github"
    return `${host.padEnd(14)}${p.name.padEnd(26)}${status}`
  })
  return [`${"Interface".padEnd(14)}${"Project".padEnd(26)}Status`, ...rows]
}

function runningConfig(): string[] {
  return ["!", `hostname ${profile.name.toLowerCase().replace(/\s+/g, "-")}`, "!", ...skills.map((s) => `tool ${s.name.toLowerCase().padEnd(14)}! ${s.kind.en.toLowerCase()}`), "!", "end"]
}

function ping(host: string): string[] {
  return [
    `Pinging ${host} with 32 bytes of data:`,
    ...Array.from({ length: 4 }, () => `Reply from ${host}: bytes=32 time<1ms TTL=64`),
    `Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`,
  ]
}

function subnetOut(arg: string | undefined, lang: Lang): string[] {
  if (!arg) return [tx(lang, "Uso: subnet 192.168.10.0/24", "Usage: subnet 192.168.10.0/24")]
  const r = subnet(arg)
  if (!r) return [tx(lang, "% Endereço inválido. Use 192.168.10.0/24", "% Invalid address. Use 192.168.10.0/24")]
  return [
    `${tx(lang, "Rede", "Network").padEnd(14)}${r.network}/${r.prefix}`,
    `${tx(lang, "Máscara", "Mask").padEnd(14)}${r.mask}`,
    `${"Wildcard".padEnd(14)}${r.wildcard}`,
    `${"Broadcast".padEnd(14)}${r.broadcast}`,
    `${tx(lang, "Primeiro host", "First host").padEnd(14)}${r.first}`,
    `${tx(lang, "Último host", "Last host").padEnd(14)}${r.last}`,
    `${tx(lang, "Hosts", "Hosts").padEnd(14)}${r.hosts}`,
  ]
}

function show(parts: string[], lang: Lang): string[] {
  const [, a, b, c] = parts
  if (is(a, "version")) return version(lang)
  if (is(a, "ip") && is(b, "interface") && (!c || is(c, "brief"))) return interfaces(lang)
  if (is(a, "running-config") || is(a, "skills")) return runningConfig()
  if (is(a, "journey")) return journey.map((j) => `${j.period[lang].padEnd(22)}${j.title[lang]}, ${j.place}`)
  if (is(a, "certificates")) return certificates.map((cert, i) => `${String(i + 1).padStart(2, "0")}. ${cert.title[lang]} (${cert.issuer[lang]})`)
  if (is(a, "contact")) return [`email     ${profile.email}`, `github    ${profile.github}`, `linkedin  ${profile.linkedin}`]
  return [tx(lang, "% Comando incompleto. Digite help.", "% Incomplete command. Type help.")]
}

export function runCommand(input: string, lang: Lang): CliResult {
  const parts = input.trim().split(/\s+/).filter(Boolean)
  const [cmd, arg] = parts
  if (!cmd) return { out: [] }

  if (is(cmd, "help") || cmd === "?") return { out: help(lang) }
  if (cmd.length >= 2 && is(cmd, "show")) return { out: show(parts, lang) }
  if (is(cmd, "clear") || cmd === "cls") return { out: [], clear: true }
  if (is(cmd, "exit")) return { out: [], goto: "home" }
  if (is(cmd, "subnet")) return { out: subnetOut(arg, lang) }

  if (is(cmd, "ping") || is(cmd, "connect") || is(cmd, "open")) {
    const device = arg ? findDevice(arg) : undefined
    if (!arg) return { out: [tx(lang, `Uso: ${cmd} <host>`, `Usage: ${cmd} <host>`)] }
    if (!device) {
      return {
        out: [
          tx(lang, "% Host desconhecido. Hosts disponíveis:", "% Unknown host. Available hosts:"),
          devices.map((d) => d.host).join("  "),
        ],
      }
    }
    if (is(cmd, "ping")) return { out: ping(device.host), goto: device.id }
    if (is(cmd, "connect")) return { out: [`Connected to ${device.host.toUpperCase()}`], goto: device.id }
    if (device.view === "project") return { out: [`Opening ${projects[device.project ?? 0].name}...`], open: projects[device.project ?? 0].href }
    if (device.view === "internet") return { out: ["Opening github..."], open: profile.github }
    return { out: [tx(lang, "% Nada para abrir neste dispositivo. Use connect.", "% Nothing to open on this device. Use connect.")] }
  }

  return { out: [tx(lang, "% Comando não reconhecido. Digite help.", "% Unrecognized command. Type help.")] }
}
