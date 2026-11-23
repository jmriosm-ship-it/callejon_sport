import logo from '../assets/logo.png'
import { useStore } from '../store/useStore'

export default function Footer() {
  const { instagram: INSTAGRAM_URL, settings } = useStore()
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
          {settings.tiktok && <a href={settings.tiktok} target="_blank" rel="noreferrer">TikTok</a>}
          {settings.facebook && <a href={settings.facebook} target="_blank" rel="noreferrer">Facebook</a>}
        </nav>
      </div>
      <nav className="wrap footer__policies" aria-label="Políticas">
        <a href="#/politicas/terminos">Términos y condiciones</a>
        <a href="#/politicas/privacidad">Privacidad</a>
        <a href="#/politicas/cookies">Cookies</a>
        <a href="#/politicas/cambios">Cambios y devoluciones</a>
      </nav>
      <p className="wrap footer__legal">© {new Date().getFullYear()} Callejón Store. Todos los derechos reservados.</p>
    </footer>
  )
}
