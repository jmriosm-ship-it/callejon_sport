import { SHIPPING, PAYMENTS } from '../data/config'

// "Etiqueta: valor" -> etiqueta en negrita y el valor normal
const Row = ({ text }) => {
  const i = text.indexOf(':')
  return i === -1 ? text : <><b>{text.slice(0, i)}</b>{text.slice(i + 1).trim()}</>
}

function Tape({ word }) {
  const row = Array.from({ length: 6 }, (_, i) => <span key={i}>{word} ✕</span>)
  return (
    <div className="box__tape" aria-hidden="true">
      <div>{row}{row}</div>
    </div>
  )
}

export default function ShippingPayments() {
  return (
    <section className="section ship" id="envios">
      <div className="wrap duo">
        <div className="reveal"><article className="box" style={{ '--r': '-1.2deg' }}>
          <Tape word="Envíos" />
          <h2 className="box__title">Llegamos a donde estés</h2>
          <p className="lead">Enviamos a toda Colombia.</p>
          <ul className="box__list">
            {SHIPPING.map((s) => <li key={s}><Row text={s} /></li>)}
          </ul>
        </article></div>
        <div className="reveal" style={{ '--d': '100ms' }}><article className="box" style={{ '--r': '1deg' }}>
          <Tape word="Pagos" />
          <h2 className="box__title">Paga como prefieras</h2>
          <p className="lead">Métodos de pago disponibles.</p>
          <ul className="box__list">
            {PAYMENTS.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </article></div>
      </div>
    </section>
  )
}
