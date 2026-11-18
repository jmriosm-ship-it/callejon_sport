import local from '../assets/local.webp'
import { wa } from '../data/config'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <img className="hero__bg" src={local} alt="Interior de Callejón Store con camisetas y gorras" />
      <div className="hero__shade" />
      <h1 className="hero__word">Callejón Store</h1>
      <div className="wrap hero__content">
        <p className="hero__cap">
          Tienda de ropa urbana<br />
          Camisetas · Gorras · Jeans · Tenis<br />
          Nueva colección
        </p>
        <div className="hero__cta">
          <a className="btn btn--light" href="#coleccion">Ver colección</a>
          <a className="btn btn--ghost" href={wa('Hola Callejón Store, quiero hacer un pedido')} target="_blank" rel="noreferrer">
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
