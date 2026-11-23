import { useEffect, useState } from 'react'

// Rutas por hash (funcionan en GitHub Pages): #/categoria/Camisetas, #/producto/p3
const parse = () => {
  const simple = window.location.hash.match(/^#\/(admin|carrito)\/?$/)
  if (simple) return { name: simple[1], param: null }
  const pol = window.location.hash.match(/^#\/politicas\/(terminos|privacidad|cookies|cambios)\/?$/)
  if (pol) return { name: 'politicas', param: pol[1] }
  const m = window.location.hash.match(/^#\/(categoria|producto)\/(.+)$/)
  return m ? { name: m[1], param: decodeURIComponent(m[2]) } : { name: 'home', param: null }
}

export default function useRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const on = () => setRoute(parse())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  return route
}
