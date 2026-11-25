import { certificates, projects } from "../data/content"
import { byId, longName, neighborsOf, prefixToMask } from "./netsim"
import { vlanNames, type Device } from "../data/network"
import type { Lang } from "../i18n/context"
import { skills } from "../data/content"

const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "")
const slug = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

function runningConfig(d: Device): string[] {
  const lines = [`hostname ${d.host.toUpperCase()}`, "!"]
  if (d.kind === "l3switch") lines.push("ip routing", "!")
  if (d.kind !== "router") {
    for (const [id, name] of Object.entries(vlanNames)) lines.push(`vlan ${id}`, ` name ${name}`)
    lines.push("!")
  }
  for (const i of d.ifaces) {
    lines.push(`interface ${longName(i.name)}`)
    const peer = neighborsOf(d.id).find((n) => n.local === i.name)
    if (peer) lines.push(` description to ${byId(peer.id)!.host.toUpperCase()}`)
    if (i.mode === "routed" && d.kind === "l3switch") lines.push(" no switchport")
    if (i.mode === "trunk") lines.push(" switchport mode trunk", ` switchport trunk allowed vlan ${i.allowed?.join(",")}`)
    if (i.mode === "access") lines.push(" switchport mode access", ` switchport access vlan ${i.vlan}`)
    if (i.ip && i.prefix !== undefined) lines.push(` ip address ${i.ip} ${prefixToMask(i.prefix)}`)
    lines.push(" no shutdown", "!")
  }
  if (d.gateway) {
    lines.push(
      d.kind === "router" || d.kind === "l3switch"
        ? `ip route 0.0.0.0 0.0.0.0 ${d.gateway}`
        : `ip default-gateway ${d.gateway}`,
    )
  }
  for (const r of d.routes ?? []) lines.push(`ip route ${r.net} ${prefixToMask(r.prefix)} ${r.via}`)
  if (d.id === "csw1") {
    lines.push("!")
    for (const s of skills) lines.push(`tool ${slug(s.name)}`)
  }
  lines.push("!", "end")
  return lines
}

function hostConfig(d: Device, lang: Lang): string[] {
  const i = d.ifaces[0]
  const lines = [
    "IP Configuration",
    ` IPv4 Address . . . . : ${i.ip}`,
    ` Subnet Mask . . . . . : ${prefixToMask(i.prefix ?? 24)}`,
    ` Default Gateway . . : ${d.gateway ?? ""}`,
    ` VLAN . . . . . . . . . . : ${i.vlan} (${vlanNames[i.vlan ?? 0] ?? ""})`,
  ]
  if (d.view === "project") {
    const project = projects[d.project ?? 0]
    lines.push("", "Services", ` HTTP . . . . . . . . . . : ${bare(project.href)}`, "")
    for (const s of project.stack) lines.push(`service ${slug(s)}`)
  }
  if (d.view === "certs") {
    lines.push("", `Files (${certificates.length})`)
    certificates.forEach((c, n) => lines.push(` ${String(n + 1).padStart(2, "0")} ${c.title[lang]}`))
  }
  return lines
}

export function configFor(d: Device, lang: Lang): string[] {
  if (d.kind === "cloud") return ["ISP", ` ip address ${d.ifaces[0].ip}`, ` peer 203.0.113.2`]
  return d.kind === "router" || d.kind === "l3switch" || d.kind === "switch"
    ? runningConfig(d)
    : hostConfig(d, lang)
}
