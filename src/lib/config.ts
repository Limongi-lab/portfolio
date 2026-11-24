import { certificates, journey, profile, projects, skills } from "../data/content"
import type { Device } from "../data/network"
import type { Lang } from "../i18n/context"

const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "")
const slug = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

export function configFor(device: Device, lang: Lang): string[] {
  const head = [`hostname ${device.host.toUpperCase()}`, "!"]

  switch (device.view) {
    case "internet":
      return [
        ...head,
        "interface github",
        " description code",
        ` ip address ${bare(profile.github)}`,
        " no shutdown",
        "!",
        "interface linkedin",
        " description network",
        ` ip address ${bare(profile.linkedin)}`,
        " no shutdown",
      ]
    case "about":
      return [
        ...head,
        "banner motd #",
        ` ${profile.name}`,
        lang === "pt" ? " Desenvolvedor fullstack" : " Fullstack developer",
        " Uberlândia, MG",
        "#",
        "!",
        "interface FastEthernet0/0",
        " description link to SW1 (tools)",
        " no shutdown",
      ]
    case "tools":
      return [
        ...head,
        `interface range tools 1 - ${skills.length}`,
        " no shutdown",
        "!",
        ...skills.map((s) => `tool ${slug(s.name)}`),
      ]
    case "project": {
      const project = projects[device.project ?? 0]
      return [
        ...head,
        "interface web0",
        ` description ${project.name}`,
        ` ip address ${bare(project.href)}`,
        " no shutdown",
        "!",
        ...project.stack.map((s) => `service ${slug(s)}`),
      ]
    }
    case "journey":
      return [
        ...head,
        ...journey.flatMap((j) => [
          `${j.kind} ${slug(j.place)}`,
          ` period ${j.period[lang]}`,
          ` title ${j.title[lang]}`,
          "!",
        ]),
      ]
    case "certs":
      return [
        ...head,
        `file-count ${certificates.length}`,
        "!",
        ...certificates.map((c, i) => `file ${String(i + 1).padStart(2, "0")} ${c.title[lang]}`),
      ]
    case "contact":
      return [
        ...head,
        "interface mail0",
        ` ip address ${profile.email}`,
        " no shutdown",
        "!",
        "interface github0",
        ` ip address ${bare(profile.github)}`,
        " no shutdown",
      ]
    case "calc":
      return [...head, "ip subnet-zero", "ip classless", "!", "tool subnet-calculator", " input a.b.c.d/prefix"]
  }
}
