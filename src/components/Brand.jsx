import local from '../assets/local.webp'

const FACTS = [
  ['Local', 'Tienda física para que pruebes y escojas con calma.'],
  ['Envíos', 'Enviamos a toda Colombia.'],
  ['Pedidos', 'Eliges tu prenda, nos escribes y listo.'],
]

const STICKERS = [
  ['Local', { '--r': '-6deg', top: '10%', left: '-3%' }],
  ['Envíos', { '--r': '5deg', top: '42%', right: '-3%' }],
  ['Pedidos', { '--r': '-3deg', bottom: '12%', left: '-2%' }],
]

export default function Brand() {
  return (
    <section className="section brand" id="marca">
      <div className="wrap brand__grid">
        <div className="reveal"><div className="brand__photo">
          <img src={local} alt="Camisetas y gorras colgadas en el local de Callejón Store" loading="lazy" />
          <i className="brand__tape" aria-hidden="true" />
          {STICKERS.map(([t, style]) => (
            <span key={t} className="brand__sticker" style={style} aria-hidden="true">{t}</span>
          ))}
        </div>
        </div>
        <div className="brand__text reveal" style={{ '--d': '100ms' }}>
          <p className="idx">(03) La marca</p>
          <h2 className="brand__title">Ropa que no falla. Que no pasa de moda.</h2>
          <p className="brand__lead">Pintas que funcionan hoy, mañana y siempre. En Callejón Store cada prenda es un acierto.</p>
          <dl className="brand__facts">
            {FACTS.map(([t, d]) => (
              <div key={t}><dt style={{ display: 'inline' }}><b>{t}</b></dt> <dd style={{ display: 'inline' }}>{d}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
