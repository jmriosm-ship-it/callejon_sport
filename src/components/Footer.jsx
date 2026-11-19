import logo from '../assets/logo.png'
import { useStore } from '../store/useStore'

export default function Footer() {
  const { instagram: INSTAGRAM_URL } = useStore()
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <div className="footer__brand">
          <span className="logo-mark" style={{ backgroundImage: `url(${logo})` }} aria-hidden="true" />
          <span>CALLEJÓN STORE</span>
        </div>
        <nav aria-label="Pie de página">
          <a href="#coleccion">Colección</a>
          <a href="#comprar">Cómo comprar</a>
          <a href="#visitanos">Visítanos</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </div>
      <p className="wrap footer__legal">© {new Date().getFullYear()} Callejón Store. Todos los derechos reservados.</p>
    </footer>
  )
}
