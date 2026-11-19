import { useEffect, useRef } from 'react'
import logo from '../assets/logo-3d.png'

const LAYERS = 18 // capas apiladas: dan el grosor del logo
const GAP = 2.6 // separación entre capas en px

// Logo en 3D: se balancea solo todo el tiempo (animación CSS) y el mouse le suma inclinación
export default function Logo3D() {
  const root = useRef(null)
  const tilt = useRef(null)

  useEffect(() => {
    const el = root.current
    let timer = 0

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)))
      const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)))
      tilt.current.style.transform = `rotateX(${(-dy * 14).toFixed(1)}deg) rotateY(${(dx * 20).toFixed(1)}deg)`
      clearTimeout(timer)
      timer = setTimeout(() => { if (tilt.current) tilt.current.style.transform = '' }, 1600)
    }

    // pausa la animación cuando el logo no se ve
    const io = new IntersectionObserver(([en]) => el.classList.toggle('is-paused', !en.isIntersecting))
    io.observe(el)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      clearTimeout(timer)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="l3d" ref={root} role="img" aria-label="Logo CS de Callejón Store en 3D">
      <div className="l3d__shadow" aria-hidden="true" />
      <div className="l3d__sway" aria-hidden="true">
        <div className="l3d__tilt" ref={tilt}>
          {Array.from({ length: LAYERS }, (_, i) => (
            <span
              key={i}
              className={`l3d__layer ${i === 0 ? 'l3d__layer--front' : ''}`}
              style={{ '--z': `${(LAYERS / 2 - i) * GAP}px`, '--o': i === 0 ? 0 : Math.min(0.12 + i * 0.045, 0.85) }}
            >
              <img src={logo} alt="" draggable="false" />
              {i === 0 && <i className="l3d__shine" />}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
