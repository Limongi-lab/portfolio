import { FaCloud, FaDesktop, FaHardDrive, FaLaptop, FaPhone, FaServer } from "react-icons/fa6"
import type { DeviceKind } from "../../data/network"

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

function Router({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...common} aria-hidden="true">
      <circle cx="16" cy="16" r="12" />
      <path d="M16 7v6M13.5 9.5 16 7l2.5 2.5" />
      <path d="M16 25v-6M13.5 22.5 16 25l2.5-2.5" />
      <path d="M7 16h6M9.5 13.5 7 16l2.5 2.5" />
      <path d="M25 16h-6M22.5 13.5 25 16l-2.5 2.5" />
    </svg>
  )
}

function Switch({ size, layer3 }: { size: number; layer3?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...common} aria-hidden="true">
      <rect x="3" y="8" width="26" height="16" rx="3" />
      <path d="M9 14h12M18.5 11.5 21 14l-2.5 2.5" />
      <path d="M23 19H11M13.5 16.5 11 19l2.5 2.5" />
      {layer3 && <circle cx="27" cy="7" r="3.5" fill="currentColor" stroke="none" />}
    </svg>
  )
}

export default function DeviceIcon({ kind, size = 28 }: { kind: DeviceKind; size?: number }) {
  const small = size - 4
  switch (kind) {
    case "router":
      return <Router size={size} />
    case "switch":
      return <Switch size={size} />
    case "l3switch":
      return <Switch size={size} layer3 />
    case "cloud":
      return <FaCloud size={size - 2} aria-hidden="true" />
    case "pc":
      return <FaDesktop size={small} aria-hidden="true" />
    case "laptop":
      return <FaLaptop size={small} aria-hidden="true" />
    case "phone":
      return <FaPhone size={small - 2} aria-hidden="true" />
    case "server":
      return <FaServer size={small} aria-hidden="true" />
    case "storage":
      return <FaHardDrive size={small} aria-hidden="true" />
  }
}
