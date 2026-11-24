import type { L } from "../i18n/context"
import { ui } from "../i18n/ui"
import { projects } from "./content"

export type DeviceKind = "internet" | "router" | "switch" | "server" | "pc" | "laptop" | "tool" | "storage"
export type DeviceView =
  | "about"
  | "tools"
  | "project"
  | "journey"
  | "certs"
  | "contact"
  | "calc"
  | "internet"

export type Device = {
  id: string
  host: string
  kind: DeviceKind
  view: DeviceView
  label: L
  x: number
  y: number
  project?: number
}

const projectDevice = (index: number, host: string, x: number, y: number): Device => ({
  id: host,
  host,
  kind: "server",
  view: "project",
  label: { pt: projects[index].name, en: projects[index].name },
  x,
  y,
  project: index,
})

export const devices: Device[] = [
  { id: "internet", host: "internet", kind: "internet", view: "internet", label: ui.devInternet, x: 12, y: 14 },
  { id: "r1", host: "r1", kind: "router", view: "about", label: ui.devAbout, x: 42, y: 14 },
  { id: "pc", host: "pc", kind: "pc", view: "contact", label: ui.devContact, x: 74, y: 14 },
  { id: "laptop", host: "laptop", kind: "laptop", view: "journey", label: ui.devJourney, x: 12, y: 46 },
  { id: "sw1", host: "sw1", kind: "switch", view: "tools", label: ui.devTools, x: 42, y: 46 },
  { id: "calc", host: "calc", kind: "tool", view: "calc", label: ui.devCalc, x: 74, y: 46 },
  projectDevice(0, "srv-radar", 14, 82),
  projectDevice(1, "srv-mia", 34, 82),
  projectDevice(2, "srv-arcano", 54, 82),
  { id: "nas", host: "nas", kind: "storage", view: "certs", label: ui.devCerts, x: 78, y: 82 },
]

export const links: [string, string][] = [
  ["internet", "r1"],
  ["r1", "pc"],
  ["r1", "laptop"],
  ["r1", "sw1"],
  ["sw1", "calc"],
  ["sw1", "srv-radar"],
  ["sw1", "srv-mia"],
  ["sw1", "srv-arcano"],
  ["sw1", "nas"],
]

export const findDevice = (idOrHost: string) =>
  devices.find((d) => d.id === idOrHost.toLowerCase() || d.host === idOrHost.toLowerCase())
