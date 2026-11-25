import { certificates, journey, profile, projects, skillName, skills } from "../data/content"
import { devices, type Device } from "../data/network"
import type { Lang } from "../i18n/context"
import {
  cdpNeighbors,
  ipInterfaceBrief,
  ipRoute,
  ipconfig,
  isInfra,
  isSwitch,
  pingLines,
  primaryIp,
  resolveTarget,
  tracerouteLines,
  vlanBrief,
} from "./netsim"
import { configFor } from "./config"
import { subnet } from "./subnet"

export type CliContext = { device: Device; privileged: boolean }
export type CliResult = {
  out: string[]
  clear?: boolean
  goto?: string
  open?: string
  close?: boolean
  privileged?: boolean
}

const tx = (lang: Lang, pt: string, en: string) => (lang === "pt" ? pt : en)
const is = (word: string | undefined, full: string) => !!word && full.startsWith(word.toLowerCase())

export const commandNames = [
  "help",
  "show",
  "ping",
  "traceroute",
  "tracert",
  "ipconfig",
  "enable",
  "disable",
  "connect",
  "open",
  "subnet",
  "about",
  "projects",
  "skills",
  "journey",
  "certs",
  "contact",
  "clear",
  "exit",
]

export const promptFor = (device: Device, privileged: boolean) =>
  isInfra(device) ? `${device.host.toUpperCase()}${privileged ? "#" : ">"}` : "C:\\>"

const row = (cmd: string, text: string) => `${cmd.padEnd(26)}${text}`

function help(lang: Lang, infra: boolean): string[] {
  const network = infra
    ? [
        row("show ip interface brief", tx(lang, "interfaces e endereços IP", "interfaces and IP addresses")),
        row("show ip route", tx(lang, "tabela de rotas", "routing table")),
        row("show vlan brief", tx(lang, "VLANs e portas (switches)", "VLANs and ports (switches)")),
        row("show cdp neighbors", tx(lang, "equipamentos vizinhos", "neighbor devices")),
        row("enable / disable", tx(lang, "modo privilegiado", "privileged mode")),
        row("show running-config", tx(lang, "configuração (após enable)", "configuration (after enable)")),
        row("ping <host|ip>", tx(lang, "testa conectividade", "test connectivity")),
        row("traceroute <host|ip>", tx(lang, "mostra o caminho", "show the path")),
      ]
    : [
        row("ipconfig", tx(lang, "configuração de IP", "IP configuration")),
        row("ping <host|ip>", tx(lang, "testa conectividade", "test connectivity")),
        row("tracert <host|ip>", tx(lang, "mostra o caminho", "show the path")),
      ]
  const portfolio = [
    row("about", tx(lang, "quem sou eu", "who I am")),
    row("projects", tx(lang, "meus projetos", "my projects")),
    row("skills", tx(lang, "ferramentas e áreas", "tools and areas")),
    row("journey", tx(lang, "formação e experiência", "education and experience")),
    row("certs", tx(lang, "cursos e certificados", "courses and certificates")),
    row("contact", tx(lang, "como falar comigo", "how to reach me")),
    row("connect <host>", tx(lang, "abre outro dispositivo", "open another device")),
    row("open <host>", tx(lang, "abre o projeto ou link", "open the project or link")),
    row("subnet <ip>/<prefixo>", tx(lang, "calculadora de sub-redes", "subnet calculator")),
    row("clear / exit", tx(lang, "limpa a tela / fecha", "clear the screen / close")),
  ]
  return [tx(lang, "Rede:", "Network:"), ...network, "", tx(lang, "Portfólio:", "Portfolio:"), ...portfolio]
}

function about(lang: Lang): string[] {
  return [
    `${profile.name}, ${tx(lang, "desenvolvedor fullstack", "fullstack developer")}`,
    tx(lang, "Uberlândia, MG, Brasil", "Uberlândia, MG, Brazil"),
    tx(
      lang,
      "Engenharia de Computação (UNIUBE) e Gestão da Informação (UFU)",
      "Computer Engineering (UNIUBE) and Information Management (UFU)",
    ),
    tx(
      lang,
      "Foco: backend, automação, dados e redes de computadores",
      "Focus: backend, automation, data and computer networking",
    ),
    tx(lang, "Aberto a oportunidades", "Open to opportunities"),
  ]
}

function projectsTable(lang: Lang): string[] {
  const rows = devices
    .filter((d) => d.view === "project")
    .map((d) => {
      const project = projects[d.project ?? 0]
      const status = d.id === "srv-mia" ? tx(lang, "no ar", "live") : "github"
      return `${d.host.padEnd(12)}${primaryIp(d).padEnd(15)}${project.name.padEnd(24)}${status}`
    })
  return [`${"Host".padEnd(12)}${"IP".padEnd(15)}${"Project".padEnd(24)}Status`, ...rows]
}

function skillsList(): string[] {
  return [
    "!",
    ...skills.map((s) => `tool ${skillName(s, "en").toLowerCase().padEnd(24)}! ${s.kind.en.toLowerCase()}`),
    "!",
  ]
}

const journeyList = (lang: Lang) =>
  journey.map((j) => `${j.period[lang].padEnd(22)}${j.title[lang]}, ${j.place}`)

const certList = (lang: Lang) =>
  certificates.map((c, i) => `${String(i + 1).padStart(2, "0")}. ${c.title[lang]} (${c.issuer[lang]})`)

const contactList = () => [
  `email     ${profile.email}`,
  `github    ${profile.github}`,
  `linkedin  ${profile.linkedin}`,
]

function show(parts: string[], lang: Lang, ctx: CliContext): CliResult {
  const [, a, b, c] = parts
  const { device, privileged } = ctx
  const infra = isInfra(device)
  const onlyNetwork = tx(
    lang,
    "% Comando disponível apenas em equipamentos de rede (ex: R1, CSW1).",
    "% Command available only on network equipment (e.g. R1, CSW1).",
  )

  if (is(a, "version")) return { out: about(lang) }
  if (is(a, "projects")) return { out: projectsTable(lang) }
  if (is(a, "skills")) return { out: skillsList() }
  if (is(a, "journey")) return { out: journeyList(lang) }
  if (is(a, "certificates")) return { out: certList(lang) }
  if (is(a, "contact")) return { out: contactList() }

  if (is(a, "ip") && is(b, "interface")) return { out: infra ? ipInterfaceBrief(device) : [onlyNetwork] }
  if (is(a, "ip") && is(b, "route")) return { out: infra ? ipRoute(device, lang) : [onlyNetwork] }
  if (is(a, "vlan")) {
    return { out: isSwitch(device) ? vlanBrief(device) : [onlyNetwork] }
  }
  if (is(a, "cdp") && (!b || is(b, "neighbors"))) return { out: infra ? cdpNeighbors(device) : [onlyNetwork] }
  if (is(a, "running-config") || (is(a, "run") && !c)) {
    if (!infra) return { out: [onlyNetwork] }
    if (!privileged) {
      return {
        out: [tx(lang, "% Comando privilegiado. Digite enable primeiro.", "% Privileged command. Type enable first.")],
      }
    }
    return { out: configFor(device, lang) }
  }
  return { out: [tx(lang, "% Comando incompleto. Digite help.", "% Incomplete command. Type help.")] }
}

export function runCommand(input: string, lang: Lang, ctx: CliContext): CliResult {
  const parts = input.trim().split(/\s+/).filter(Boolean)
  const [rawCmd, arg] = parts
  if (!rawCmd) return { out: [] }
  const cmd = rawCmd.toLowerCase()
  const { device } = ctx
  const infra = isInfra(device)

  if (is(cmd, "help") || cmd === "?") return { out: help(lang, infra) }
  if (cmd.length >= 2 && is(cmd, "show")) return show(parts, lang, ctx)
  if (cmd === "clear" || cmd === "cls") return { out: [], clear: true }
  if (cmd === "exit") return { out: [], close: true }
  if (cmd === "about") return { out: about(lang) }
  if (cmd === "projects") return { out: projectsTable(lang) }
  if (cmd === "skills") return { out: skillsList() }
  if (cmd === "journey") return { out: journeyList(lang) }
  if (cmd === "certs" || cmd === "certificates") return { out: certList(lang) }
  if (cmd === "contact") return { out: contactList() }
  if (cmd === "subnet") return { out: subnetOut(arg, lang) }

  if (cmd === "ipconfig") {
    return { out: infra ? [tx(lang, "% Use show ip interface brief.", "% Use show ip interface brief.")] : ipconfig(device) }
  }
  if (cmd === "enable" && infra) return { out: [], privileged: true }
  if (cmd === "disable" && infra) return { out: [], privileged: false }

  const needsHost = ["ping", "traceroute", "tracert", "connect", "open"].find((c) => c === cmd || (cmd.length >= 3 && c.startsWith(cmd)))
  if (needsHost) {
    if (!arg) return { out: [tx(lang, `Uso: ${needsHost} <host>`, `Usage: ${needsHost} <host>`)] }
    const target = resolveTarget(arg)
    if (!target) {
      return {
        out: [
          tx(lang, "% Host desconhecido. Hosts disponíveis:", "% Unknown host. Available hosts:"),
          devices.map((d) => d.host).join("  "),
        ],
      }
    }
    if (needsHost === "ping") return { out: pingLines(device, target, lang) }
    if (needsHost === "traceroute" || needsHost === "tracert") return { out: tracerouteLines(device, target, lang) }
    if (needsHost === "connect") return { out: [`Connected to ${target.host.toUpperCase()}`], goto: target.id }
    if (target.view === "project") {
      const project = projects[target.project ?? 0]
      return { out: [`Opening ${project.name}...`], open: project.href }
    }
    if (target.view === "internet") return { out: ["Opening github..."], open: profile.github }
    return {
      out: [tx(lang, "% Nada para abrir neste dispositivo. Use connect.", "% Nothing to open on this device. Use connect.")],
    }
  }

  return { out: [tx(lang, "% Comando não reconhecido. Digite help.", "% Unrecognized command. Type help.")] }
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
    `${"Hosts".padEnd(14)}${r.hosts}`,
  ]
}
