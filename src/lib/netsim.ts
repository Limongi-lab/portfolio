import { devices, links, vlanNames, type Device, type Iface } from "../data/network"
import type { Lang } from "../i18n/context"
import { subnet } from "./subnet"

const tx = (lang: Lang, pt: string, en: string) => (lang === "pt" ? pt : en)

export const byId = (id: string) => devices.find((d) => d.id === id)
export const isInfra = (d: Device) => d.kind === "router" || d.kind === "l3switch" || d.kind === "switch"
export const isL3 = (d: Device) => d.kind === "router" || d.kind === "l3switch"
export const isSwitch = (d: Device) => d.kind === "switch" || d.kind === "l3switch"

export const prefixToMask = (prefix: number) => {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  return [mask >>> 24, (mask >>> 16) & 255, (mask >>> 8) & 255, mask & 255].join(".")
}

const toInt = (ip: string) => ip.split(".").reduce((acc, o) => ((acc << 8) | Number(o)) >>> 0, 0)
const sameNet = (a: string, b: string, prefix: number) => {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  return ((toInt(a) & mask) >>> 0) === ((toInt(b) & mask) >>> 0)
}

export const primaryIface = (d: Device) => d.ifaces.find((i) => i.ip)
export const primaryIp = (d: Device) => primaryIface(d)?.ip ?? ""

export const longName = (name: string) =>
  name.replace(/^Gi(?=\d)/, "GigabitEthernet").replace(/^Fa(?=\d)/, "FastEthernet")

export type Neighbor = { id: string; local: string; remote: string }

export function neighborsOf(id: string): Neighbor[] {
  const result: Neighbor[] = []
  for (const link of links) {
    if (link.a[0] === id) result.push({ id: link.b[0], local: link.a[1], remote: link.b[1] })
    if (link.b[0] === id) result.push({ id: link.a[0], local: link.b[1], remote: link.a[1] })
  }
  return result
}

export function findPath(from: string, to: string): string[] | null {
  const previous = new Map<string, string | null>([[from, null]])
  const queue = [from]
  while (queue.length) {
    const current = queue.shift()!
    if (current === to) {
      const path: string[] = []
      let step: string | null = to
      while (step) {
        path.unshift(step)
        step = previous.get(step) ?? null
      }
      return path
    }
    for (const n of neighborsOf(current)) {
      if (!previous.has(n.id)) {
        previous.set(n.id, current)
        queue.push(n.id)
      }
    }
  }
  return null
}

export function resolveTarget(arg: string): Device | undefined {
  const key = arg.toLowerCase()
  return devices.find((d) => d.id === key || d.host === key || d.ifaces.some((i) => i.ip === key))
}

export function peerVlan(d: Device): number | undefined {
  const own = d.ifaces[0]
  if (own.vlan) return own.vlan
  return undefined
}

const baseTtl = (d: Device) => (isInfra(d) || d.kind === "cloud" ? 255 : d.kind === "server" || d.kind === "storage" ? 64 : 128)

export function pingLines(src: Device, dst: Device, lang: Lang): string[] {
  const path = findPath(src.id, dst.id)
  const ip = primaryIp(dst)
  if (!path) return [tx(lang, `Falha: sem rota para ${ip}`, `Failed: no route to ${ip}`)]
  const between = path.slice(1, -1).map((id) => byId(id)!).filter(isL3).length
  const ttl = baseTtl(dst) - between
  const ms = Math.max(1, Math.ceil((path.length - 1) / 2))
  const reply = `Reply from ${ip}: bytes=32 time=${ms}ms TTL=${ttl}`
  return [
    `Pinging ${ip} with 32 bytes of data:`,
    reply,
    reply,
    reply,
    reply,
    `Ping statistics for ${ip}:`,
    "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)",
  ]
}

function hopIp(d: Device, previousIp: string): string {
  const match = d.ifaces.find((i) => i.ip && i.prefix !== undefined && sameNet(i.ip, previousIp, i.prefix))
  return (match ?? primaryIface(d))?.ip ?? ""
}

export function tracerouteLines(src: Device, dst: Device, lang: Lang): string[] {
  const path = findPath(src.id, dst.id)
  const target = primaryIp(dst)
  if (!path) return [tx(lang, `Falha: sem rota para ${target}`, `Failed: no route to ${target}`)]
  const lines = [`Tracing route to ${target} over a maximum of 30 hops:`, ""]
  let previousIp = primaryIp(src)
  let hop = 1
  path.slice(1).forEach((id, index) => {
    const device = byId(id)!
    const last = index === path.length - 2
    if (!isL3(device) && !last) return
    const ip = last ? target : hopIp(device, previousIp)
    const ms = Math.ceil((index + 1) / 2)
    lines.push(`${String(hop).padStart(3)}   ${ms} ms   ${ip}`)
    previousIp = ip
    hop += 1
  })
  lines.push("", "Trace complete.")
  return lines
}

const pad = (text: string, size: number) => text.padEnd(size)

export function ipInterfaceBrief(d: Device): string[] {
  const rows = d.ifaces.map((i) => `${pad(i.name, 12)}${pad(i.ip ?? "unassigned", 16)}${pad("up", 8)}up`)
  return [`${pad("Interface", 12)}${pad("IP-Address", 16)}${pad("Status", 8)}Protocol`, ...rows]
}

export function ipRoute(d: Device, lang: Lang): string[] {
  if (d.kind === "switch") return [tx(lang, "% Roteamento IP não habilitado", "% IP routing not enabled")]
  const lines = ["Codes: C - connected, S - static, * - candidate default", ""]
  if (d.gateway) {
    lines.push(`Gateway of last resort is ${d.gateway} to network 0.0.0.0`, "")
    lines.push(`S*    0.0.0.0/0 [1/0] via ${d.gateway}`)
  }
  for (const i of d.ifaces) {
    if (i.ip && i.prefix !== undefined) {
      const net = subnet(`${i.ip}/${i.prefix}`)!.network
      lines.push(`C     ${net}/${i.prefix} is directly connected, ${i.name}`)
    }
  }
  for (const r of d.routes ?? []) lines.push(`S     ${r.net}/${r.prefix} [1/0] via ${r.via}`)
  return lines
}

export function vlanBrief(d: Device): string[] {
  const ports = (vlan: number) =>
    d.ifaces
      .filter((i) => i.mode === "access" && i.vlan === vlan)
      .map((i) => i.name)
      .join(", ")
  const rows = [`${pad("1", 5)}${pad("default", 11)}${pad("active", 10)}`]
  for (const [id, name] of Object.entries(vlanNames)) {
    rows.push(`${pad(id, 5)}${pad(name, 11)}${pad("active", 10)}${ports(Number(id))}`)
  }
  return [`${pad("VLAN", 5)}${pad("Name", 11)}${pad("Status", 10)}Ports`, `${"-".repeat(4)} ${"-".repeat(10)} ${"-".repeat(9)} ${"-".repeat(20)}`, ...rows]
}

export function cdpNeighbors(d: Device): string[] {
  const rows = neighborsOf(d.id)
    .map((n) => ({ ...n, device: byId(n.id)! }))
    .filter((n) => isInfra(n.device))
    .map((n) => `${pad(n.device.host.toUpperCase(), 12)}${pad(n.local, 14)}${n.remote}`)
  return [`${pad("Device ID", 12)}${pad("Local Intf", 14)}Port ID`, ...rows]
}

export function ipconfig(d: Device): string[] {
  const i = d.ifaces[0] as Iface
  return [
    `${i.name} Connection:`,
    "",
    `   IPv4 Address......: ${i.ip}`,
    `   Subnet Mask.......: ${prefixToMask(i.prefix ?? 24)}`,
    `   Default Gateway...: ${d.gateway ?? ""}`,
  ]
}
