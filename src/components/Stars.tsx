import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  depth: number
  phase: number
  warm: boolean
  ox: number
  oy: number
}

export default function Stars() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mouse = { x: -9999, y: -9999 }
    let stars: Star[] = []
    let w = 0
    let h = 0
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w * h) / 9000)
      stars = Array.from({ length: count }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + depth * 1.4,
          vx: (Math.random() - 0.5) * 0.35 * (0.4 + depth),
          vy: -(0.12 + Math.random() * 0.5) * (0.4 + depth),
          depth,
          phase: Math.random() * Math.PI * 2,
          warm: Math.random() < 0.14,
          ox: 0,
          oy: 0,
        }
      })
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const REACH = 140

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const scroll = window.scrollY
      for (const s of stars) {
        if (!reduced) {
          s.x += s.vx
          s.y += s.vy
          if (s.y < -4) {
            s.y = h + 4
            s.x = Math.random() * w
          }
          if (s.x < -4) s.x = w + 4
          if (s.x > w + 4) s.x = -4

          // empurra as estrelas para longe do cursor e deixa voltarem devagar
          const px = s.x + s.ox
          const py = s.y + s.oy - ((scroll * s.depth * 0.25) % h)
          const dx = px - mouse.x
          const dy = py - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < REACH && dist > 0.1) {
            const force = (1 - dist / REACH) * 2.2
            s.ox += (dx / dist) * force
            s.oy += (dy / dist) * force
          }
          s.ox *= 0.94
          s.oy *= 0.94
        }

        let y = s.y + s.oy - ((scroll * s.depth * 0.25) % h)
        if (y < -4) y += h + 8
        const x = s.x + s.ox

        const tw = reduced ? 0.7 : 0.4 + 0.5 * Math.sin(t / 450 + s.phase)
        ctx.globalAlpha = Math.max(0.1, tw)
        ctx.fillStyle = s.warm ? "#ee6a3c" : "#ffffff"
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    resize()
    draw(0)
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return <canvas ref={ref} className="stars" aria-hidden="true" />
}
