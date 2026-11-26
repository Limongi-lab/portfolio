import type { L } from "../i18n/context"
import { ui } from "../i18n/ui"
import { projects } from "./content"

export type DeviceKind =
  | "cloud"
  | "router"
  | "l3switch"
  | "switch"
  | "pc"
  | "laptop"
  | "phone"
  | "server"
  | "storage"

export type DeviceView =
  | "overview"
  | "about"
  | "tools"
  | "project"
  | "journey"
  | "certs"
  | "contact"
  | "calc"
  | "internet"
  | "infra"

export type Category = "network" | "end" | "servers"

export type Iface = {
  name: string
  ip?: string
  prefix?: number
  vlan?: number
  mode?: "access" | "trunk" | "routed" | "svi"
  allowed?: number[]
}

export type Route = { net: string; prefix: number; via: string }

export type Device = {
  id: string
  host: string
  kind: DeviceKind
  view: DeviceView
  category: Category
  label: L
  role: L
  x: number
  y: number
  labelSide?: "bottom" | "left" | "right"
  ifaces: Iface[]
  cli: boolean
  gateway?: string
  routes?: Route[]
  project?: number
}

export type Link = {
  a: [string, string]
  b: [string, string]
  subnet?: string
  wan?: boolean
}

export const canvas = { width: 1400, height: 650 }

export const vlanNames: Record<number, string> = { 10: "DATA", 20: "SERVERS", 99: "ADMIN" }

const projectLabel = (index: number): L => ({ pt: projects[index].name, en: projects[index].name })

const serverRole: L = {
  pt: "Servidor de aplicação (VLAN 20). Este projeto roda aqui.",
  en: "Application server (VLAN 20). This project runs here.",
}

export const devices: Device[] = [
  {
    id: "isp",
    host: "isp",
    kind: "cloud",
    view: "internet",
    category: "network",
    label: ui.devInternet,
    role: {
      pt: "Provedor de internet. É por aqui que GitHub e LinkedIn chegam até você.",
      en: "Internet provider. This is how GitHub and LinkedIn reach you.",
    },
    x: 140,
    y: 85,
    cli: false,
    ifaces: [{ name: "Gi0/0", ip: "203.0.113.1", prefix: 30, mode: "routed" }],
  },
  {
    id: "r1",
    host: "r1",
    kind: "router",
    view: "overview",
    category: "network",
    label: ui.navHome,
    role: {
      pt: "Roteador de borda. Liga a rede do portfólio à Internet e é o ponto de partida.",
      en: "Edge router. Connects the portfolio network to the Internet and is the starting point.",
    },
    x: 440,
    y: 85,
    cli: true,
    gateway: "203.0.113.1",
    routes: [
      { net: "192.168.10.0", prefix: 24, via: "10.10.10.2" },
      { net: "172.16.20.0", prefix: 27, via: "10.10.10.2" },
      { net: "192.168.99.0", prefix: 24, via: "10.10.10.2" },
    ],
    ifaces: [
      { name: "Gi0/0/1", ip: "10.10.10.1", prefix: 30, mode: "routed" },
      { name: "Gi0/0/0", ip: "203.0.113.2", prefix: 30, mode: "routed" },
    ],
  },
  {
    id: "csw1",
    host: "csw1",
    kind: "l3switch",
    view: "tools",
    category: "network",
    label: ui.devTools,
    role: {
      pt: "Switch de núcleo (camada 3). Roteia entre as VLANs e conecta tudo. Aqui ficam as tecnologias que eu uso.",
      en: "Core layer 3 switch. Routes between VLANs and connects everything. This is where the technologies I use live.",
    },
    x: 740,
    y: 85,
    cli: true,
    gateway: "10.10.10.1",
    ifaces: [
      { name: "Gi1/0/1", ip: "10.10.10.2", prefix: 30, mode: "routed" },
      { name: "Gi1/0/2", mode: "trunk", allowed: [10, 99] },
      { name: "Gi1/0/3", mode: "trunk", allowed: [20, 99] },
      { name: "Vlan10", ip: "192.168.10.1", prefix: 24, vlan: 10, mode: "svi" },
      { name: "Vlan20", ip: "172.16.20.1", prefix: 27, vlan: 20, mode: "svi" },
      { name: "Vlan99", ip: "192.168.99.1", prefix: 24, vlan: 99, mode: "svi" },
    ],
  },
  {
    id: "asw1",
    host: "asw1",
    kind: "switch",
    view: "infra",
    category: "network",
    label: { pt: "Switch de acesso", en: "Access switch" },
    role: {
      pt: "Switch de acesso. Conecta as estações da VLAN de dados (10) e da administração (99).",
      en: "Access switch. Connects the data VLAN (10) and admin VLAN (99) workstations.",
    },
    x: 360,
    y: 325,
    labelSide: "left",
    cli: true,
    gateway: "192.168.99.1",
    ifaces: [
      { name: "Gi0/1", mode: "trunk", allowed: [10, 99] },
      { name: "Fa0/1", mode: "access", vlan: 10 },
      { name: "Fa0/2", mode: "access", vlan: 10 },
      { name: "Fa0/3", mode: "access", vlan: 10 },
      { name: "Fa0/4", mode: "access", vlan: 99 },
      { name: "Vlan99", ip: "192.168.99.2", prefix: 24, vlan: 99, mode: "svi" },
    ],
  },
  {
    id: "dsw1",
    host: "dsw1",
    kind: "switch",
    view: "infra",
    category: "network",
    label: { pt: "Switch de servidores", en: "Server switch" },
    role: {
      pt: "Switch dos servidores (VLAN 20). Cada projeto roda em um servidor ligado aqui.",
      en: "Server switch (VLAN 20). Each project runs on a server connected here.",
    },
    x: 1025,
    y: 325,
    labelSide: "right",
    cli: true,
    gateway: "192.168.99.1",
    ifaces: [
      { name: "Gi0/1", mode: "trunk", allowed: [20, 99] },
      { name: "Fa0/1", mode: "access", vlan: 20 },
      { name: "Fa0/2", mode: "access", vlan: 20 },
      { name: "Fa0/3", mode: "access", vlan: 20 },
      { name: "Fa0/4", mode: "access", vlan: 20 },
      { name: "Vlan99", ip: "192.168.99.3", prefix: 24, vlan: 99, mode: "svi" },
    ],
  },
  {
    id: "pc0",
    host: "pc0",
    kind: "pc",
    view: "about",
    category: "end",
    label: ui.devAbout,
    role: {
      pt: "Estação de trabalho do Rafael (VLAN 10). Quem eu sou.",
      en: "Rafael's workstation (VLAN 10). Who I am.",
    },
    x: 150,
    y: 520,
    cli: true,
    gateway: "192.168.10.1",
    ifaces: [{ name: "Fa0", ip: "192.168.10.50", prefix: 24, vlan: 10 }],
  },
  {
    id: "laptop1",
    host: "laptop1",
    kind: "laptop",
    view: "journey",
    category: "end",
    label: ui.devJourney,
    role: {
      pt: "Laptop de estudos (VLAN 10). Minha formação e experiência.",
      en: "Study laptop (VLAN 10). My education and experience.",
    },
    x: 290,
    y: 520,
    cli: true,
    gateway: "192.168.10.1",
    ifaces: [{ name: "Fa0", ip: "192.168.10.55", prefix: 24, vlan: 10 }],
  },
  {
    id: "phone1",
    host: "phone1",
    kind: "phone",
    view: "contact",
    category: "end",
    label: ui.devContact,
    role: { pt: "Telefone IP (VLAN 10). Fale comigo.", en: "IP phone (VLAN 10). Talk to me." },
    x: 430,
    y: 520,
    cli: true,
    gateway: "192.168.10.1",
    ifaces: [{ name: "Fa0", ip: "192.168.10.60", prefix: 24, vlan: 10 }],
  },
  {
    id: "admin-pc",
    host: "admin-pc",
    kind: "pc",
    view: "calc",
    category: "end",
    label: ui.devCalc,
    role: {
      pt: "Estação de administração (VLAN 99). Ferramentas de rede, como a calculadora de sub-redes.",
      en: "Admin workstation (VLAN 99). Network tools, like the subnet calculator.",
    },
    x: 570,
    y: 520,
    cli: true,
    gateway: "192.168.99.1",
    ifaces: [{ name: "Fa0", ip: "192.168.99.10", prefix: 24, vlan: 99 }],
  },
  {
    id: "srv-radar",
    host: "srv-radar",
    kind: "server",
    view: "project",
    category: "servers",
    label: projectLabel(0),
    role: serverRole,
    x: 815,
    y: 520,
    cli: true,
    gateway: "172.16.20.1",
    project: 0,
    ifaces: [{ name: "Eth0", ip: "172.16.20.10", prefix: 27, vlan: 20 }],
  },
  {
    id: "srv-mia",
    host: "srv-mia",
    kind: "server",
    view: "project",
    category: "servers",
    label: projectLabel(1),
    role: serverRole,
    x: 955,
    y: 520,
    cli: true,
    gateway: "172.16.20.1",
    project: 1,
    ifaces: [{ name: "Eth0", ip: "172.16.20.11", prefix: 27, vlan: 20 }],
  },
  {
    id: "srv-arcano",
    host: "srv-arcano",
    kind: "server",
    view: "project",
    category: "servers",
    label: projectLabel(2),
    role: serverRole,
    x: 1095,
    y: 520,
    cli: true,
    gateway: "172.16.20.1",
    project: 2,
    ifaces: [{ name: "Eth0", ip: "172.16.20.12", prefix: 27, vlan: 20 }],
  },
  {
    id: "nas1",
    host: "nas1",
    kind: "storage",
    view: "certs",
    category: "servers",
    label: ui.devCerts,
    role: {
      pt: "Servidor de arquivos (VLAN 20). Guarda os certificados.",
      en: "File server (VLAN 20). Stores the certificates.",
    },
    x: 1235,
    y: 520,
    cli: true,
    gateway: "172.16.20.1",
    ifaces: [{ name: "Eth0", ip: "172.16.20.20", prefix: 27, vlan: 20 }],
  },
]

export const links: Link[] = [
  { a: ["isp", "Gi0/0"], b: ["r1", "Gi0/0/0"], subnet: "203.0.113.0/30", wan: true },
  { a: ["r1", "Gi0/0/1"], b: ["csw1", "Gi1/0/1"], subnet: "10.10.10.0/30" },
  { a: ["csw1", "Gi1/0/2"], b: ["asw1", "Gi0/1"] },
  { a: ["csw1", "Gi1/0/3"], b: ["dsw1", "Gi0/1"] },
  { a: ["asw1", "Fa0/1"], b: ["pc0", "Fa0"] },
  { a: ["asw1", "Fa0/2"], b: ["laptop1", "Fa0"] },
  { a: ["asw1", "Fa0/3"], b: ["phone1", "Fa0"] },
  { a: ["asw1", "Fa0/4"], b: ["admin-pc", "Fa0"] },
  { a: ["dsw1", "Fa0/1"], b: ["srv-radar", "Eth0"] },
  { a: ["dsw1", "Fa0/2"], b: ["srv-mia", "Eth0"] },
  { a: ["dsw1", "Fa0/3"], b: ["srv-arcano", "Eth0"] },
  { a: ["dsw1", "Fa0/4"], b: ["nas1", "Eth0"] },
]

export const categories: { id: Category; label: L }[] = [
  { id: "network", label: ui.catNetwork },
  { id: "end", label: ui.catEnd },
  { id: "servers", label: ui.catServers },
]

export const findDevice = (idOrHost: string) =>
  devices.find((d) => d.id === idOrHost.toLowerCase() || d.host === idOrHost.toLowerCase())
