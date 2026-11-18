import logo from '../assets/logo.png'
import { CHAT, STEPS } from '../data/config'

export default function HowToBuy() {
  return (
    <section className="section section--dark" id="comprar">
      <div className="wrap buy">
        <div className="reveal">
          <p className="idx">(04) Cómo comprar</p>
          <h2 className="cats-title">Comprar es fácil</h2>
          <ol className="buy__steps">
            {STEPS.map(([n, t, d]) => (
              <li key={n}>
                <span className="buy__n">{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="chat reveal" style={{ '--d': '120ms' }} role="img" aria-label="Ejemplo de un pedido por WhatsApp">
          <div className="chat__bar">
            <span className="logo-mark" style={{ backgroundImage: `url(${logo})` }} aria-hidden="true" />
            Callejón Store
            <small>en línea</small>
          </div>
          {CHAT.map((m, i) => (
            <p key={i} className={m.de === 'cliente' ? 'out' : 'in-msg'} style={{ '--i': i }}>{m.texto}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
