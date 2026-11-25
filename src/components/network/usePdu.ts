import { useCallback, useEffect, useRef, useState } from "react"
import { findPath } from "../../lib/netsim"

export type Pdu = { n: number; src: string; dst: string; time: string }
export type PduEvent = { id: number; time: string; last: string; at: string }
export type Anim = { path: string[]; step: number }
export type PduResult = { id: string; n: number }

const stamp = (hops: number) => (hops * 0.001).toFixed(3)

export function usePdu(simulation: boolean) {
  const [pdus, setPdus] = useState<Pdu[]>([])
  const [events, setEvents] = useState<PduEvent[]>([])
  const [anim, setAnim] = useState<Anim | null>(null)
  const [result, setResult] = useState<PduResult | null>(null)
  const timers = useRef<number[]>([])
  const counter = useRef(1)
  const stepMs = simulation ? 900 : 380

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((id) => window.clearTimeout(id))
  }, [])

  const send = useCallback(
    (src: string, dst: string) => {
      const path = findPath(src, dst)
      if (!path) return
      timers.current.forEach((id) => window.clearTimeout(id))
      timers.current = []
      const n = counter.current++
      const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

      setEvents([{ id: 0, time: stamp(0), last: "-", at: src }])
      setAnim({ path, step: 0 })
      setResult(null)

      path.forEach((id, i) => {
        if (i === 0) return
        later(() => {
          setAnim({ path, step: i })
          setEvents((prev) => [...prev, { id: i, time: stamp(i), last: path[i - 1], at: id }])
        }, i * stepMs)
      })

      later(() => {
        setPdus((prev) => [...prev, { n, src, dst, time: stamp(path.length - 1) }])
        setResult({ id: dst, n })
        setAnim(null)
      }, path.length * stepMs)

      later(() => setResult((r) => (r && r.n === n ? null : r)), path.length * stepMs + 2400)
    },
    [stepMs],
  )

  return { pdus, events, anim, result, stepMs, send }
}
