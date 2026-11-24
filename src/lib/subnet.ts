export type SubnetResult = {
  prefix: number
  network: string
  mask: string
  wildcard: string
  broadcast: string
  first: string
  last: string
  hosts: number
}

const toInt = (o: number[]) => ((o[0] << 24) | (o[1] << 16) | (o[2] << 8) | o[3]) >>> 0
const toIp = (n: number) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".")

export function subnet(input: string): SubnetResult | null {
  const m = input.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/)
  if (!m) return null
  const octets = m.slice(1, 5).map(Number)
  const prefix = Number(m[5])
  if (octets.some((o) => o > 255) || prefix > 32) return null

  const ip = toInt(octets)
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  const network = (ip & mask) >>> 0
  const wildcard = ~mask >>> 0
  const broadcast = (network | wildcard) >>> 0

  let hosts = 2 ** (32 - prefix) - 2
  let first = network + 1
  let last = broadcast - 1
  if (prefix === 32) {
    hosts = 1
    first = network
    last = network
  } else if (prefix === 31) {
    hosts = 2
    first = network
    last = broadcast
  }

  return {
    prefix,
    network: toIp(network),
    mask: toIp(mask),
    wildcard: toIp(wildcard),
    broadcast: toIp(broadcast),
    first: toIp(first),
    last: toIp(last),
    hosts,
  }
}
