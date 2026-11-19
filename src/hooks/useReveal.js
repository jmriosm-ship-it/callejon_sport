import { useEffect } from 'react'

// Añade la clase "in" a los elementos .reveal cuando entran en pantalla.
// `dep` cambia al cambiar de página para volver a observar los elementos nuevos.
export default function useReveal(dep) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}
