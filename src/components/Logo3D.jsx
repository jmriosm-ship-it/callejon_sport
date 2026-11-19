import { useEffect, useRef } from 'react'
import logo from '../assets/logo-3d.png'

const LAYERS = 18 // capas apiladas: dan el grosor del logo
const GAP = 2.6 // separación entre capas en px

// Logo en 3D: siempre se balancea solo y, además, reacciona al mouse
export default function Logo3D() {
  const root = useRef(null)
  const tilt = useRef(null)
  const shine = useRef(null)
  const shadow = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      tilt.current.style.transform = 'rotateX(-6deg) rotateY(-16deg)'
      return undefined
    }

    let px = 0, py = 0 // inclinación que pone el mouse
    let cx = 0, cy = 0 // inclinación actual (suavizada)
    let last = -1e9
    let raf = 0
    let visible = true

    const onMove = (e) => {
      const r = root.current.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)
      const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)
      py = Math.max(-1, Math.min(1, dx)) * 24
      px = -Math.max(-1, Math.min(1, dy)) * 16
      last = performance.now()
    }

    const frame = (t) => {
      if (visible) {
        // si el mouse se queda quieto, su influencia se va apagando
        if (t - last > 1500) {
          px *= 0.96
          py *= 0.96
        }
        // movimiento automático: nunca se detiene
        const autoY = Math.sin(t / 1100) * 24 + Math.sin(t / 2700) * 12
        const autoX = Math.cos(t / 1500) * 9 - 3
        const ty = autoY + py
        const tx = autoX + px
        cx += (tx - cx) * 0.1
        cy += (ty - cy) * 0.1
        tilt.current.style.transform = `rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg)`
        shine.current.style.setProperty('--sx', `${50 + cy * 1.8}%`)
        shine.current.style.setProperty('--sy', `${40 - cx * 2.2}%`)
        shadow.current.style.transform = `translateX(${(-cy * 1.2).toFixed(1)}px) scale(${(1 - Math.abs(cx) * 0.004).toFixed(3)})`
      }
      raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting })
    io.observe(root.current)
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="l3d" ref={root} role="img" aria-label="Logo CS de Callejón Store en 3D">
      <div className="l3d__shadow" ref={shadow} aria-hidden="true" />
      <div className="l3d__tilt" ref={tilt} aria-hidden="true">
        {Array.from({ length: LAYERS }, (_, i) => (
          <span
            key={i}
            className={`l3d__layer ${i === 0 ? 'l3d__layer--front' : ''}`}
            style={{ '--z': `${(LAYERS / 2 - i) * GAP}px`, '--o': i === 0 ? 0 : Math.min(0.12 + i * 0.045, 0.85) }}
          >
            <img src={logo} alt="" draggable="false" />
            {i === 0 && <i className="l3d__shine" ref={shine} />}
          </span>
        ))}
      </div>
    </div>
  )
}
