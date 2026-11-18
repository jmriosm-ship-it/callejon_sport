import local from '../assets/local.webp'
import logo from '../assets/logo.png'
import './lab.css'

const mark = { backgroundImage: `url(${logo})` }
const crop = (pos, size = 300) => ({ backgroundImage: `url(${local})`, backgroundSize: `${size}% auto`, backgroundPosition: pos })

// A. Foto primero (referencias: Stüssy, Kith)
function A() {
  return (
    <section className="v va">
      <img src={local} alt="" />
      <div className="va__top">
        <span className="logo-mark" style={mark} />
        <nav><a>BUSCAR</a><a>WHATSAPP</a><a>MENÚ</a></nav>
      </div>
      <p className="va__cap">CALLEJÓN STORE<br />TIENDA DE ROPA URBANA<br />NUEVA COLECCIÓN</p>
      <h1 className="va__word">CALLEJÓN</h1>
    </section>
  )
}

// B. Underground (referencia: Corteiz)
function B() {
  const items = ['N°01 CAMISETA OVERSIZE', 'N°02 GORRA', 'N°03 CAMISETA GRÁFICA', 'N°04 CAMISETA BLANCA', 'N°05 PERCHERO', 'N°06 NUEVA COLECCIÓN']
  const pos = ['81% 57%', '3% 38%', '70% 40%', '100% 82%', '11% 91%', '40% 60%']
  return (
    <section className="v vb">
      <div className="vb__bar">NUEVA COLECCIÓN — PEDIDOS POR WHATSAPP — ENVÍOS A TODA COLOMBIA</div>
      <aside>
        <span className="logo-mark vb__logo" style={mark} />
        <ul>{['NUEVO', 'CAMISETAS', 'GORRAS', 'JEANS', 'BERMUDAS', 'TENIS', 'SUDADERAS', 'ACCESORIOS'].map((c) => <li key={c}>{c}</li>)}</ul>
        <p>INSTAGRAM<br />WHATSAPP<br />EL LOCAL</p>
      </aside>
      <div className="vb__grid">
        {items.map((t, i) => (
          <figure key={t}><div style={crop(pos[i])} /><figcaption>{t}<br /><em>PRECIO POR WHATSAPP</em></figcaption></figure>
        ))}
      </div>
    </section>
  )
}

// C. Letras con foto (referencia: Palace)
function C() {
  return (
    <section className="v vc">
      <nav className="vc__pill"><span className="logo-mark" style={mark} /><b>MENÚ</b></nav>
      <h1 className="vc__word" style={{ backgroundImage: `url(${local})` }}>CALLEJÓN</h1>
      <div className="vc__row">
        <span className="vc__tag">NUEVA COLECCIÓN</span>
        <p>Ropa urbana, gorras y pintas con estilo. Pedí por WhatsApp.</p>
        <a className="vc__btn">VER</a>
      </div>
    </section>
  )
}

// D. Cinta en el callejón (referencia: cinta de precaución, calle)
function D() {
  const t = 'CALLEJÓN STORE ✕ ROPA URBANA ✕ NUEVA COLECCIÓN ✕ ENVÍOS A TODA COLOMBIA ✕ '
  return (
    <section className="v vd">
      <img src={local} alt="" />
      <div className="vd__shade" />
      <div className="vd__top"><span className="logo-mark" style={mark} /><nav><a>COLECCIÓN</a><a>LOOKS</a><a>LOCAL</a><a className="vd__wa">WHATSAPP</a></nav></div>
      <div className="vd__tape vd__tape--1"><span>{t.repeat(4)}</span></div>
      <div className="vd__tape vd__tape--2"><span>{t.repeat(4)}</span></div>
      <h1>TU ESTILO,<br />TU CALLEJÓN</h1>
      <a className="vd__cta">VER COLECCIÓN →</a>
    </section>
  )
}

const CATS = [
  ['Camisetas', '81% 57%'], ['Gorras', '3% 38%'], ['Jeans', '40% 88%'], ['Bermudas', '100% 82%'],
  ['Tenis', '11% 91%'], ['Sudaderas', '70% 40%'], ['Accesorios', '8% 28%'], ['Deportivo', '50% 70%'],
]
const gothic = { fontFamily: "'UnifrakturCook', serif", fontWeight: 700 }
const ph = (pos, size = 300) => ({ backgroundImage: `url(${local})`, backgroundSize: `${size}% auto`, backgroundPosition: pos })

// Categorías A: mosaico con foto
function CA() {
  return (
    <section className="vcat vca">
      <p className="idx">(01) Colección</p>
      <h2 style={gothic}>Compra por categoría</h2>
      <div className="vca__grid">
        {CATS.map(([n, pos], i) => (
          <a key={n} style={ph(pos)}>
            <small>{String(i + 1).padStart(2, '0')}</small>
            <b style={gothic}>{n}</b>
          </a>
        ))}
      </div>
    </section>
  )
}

// Categorías B: índice gigante con foto al pasar el mouse
function CB() {
  return (
    <section className="vcat vcb">
      <p className="idx">(01) Colección</p>
      <ul>
        {CATS.slice(0, 6).map(([n, pos], i) => (
          <li key={n} className={i === 1 ? 'on' : ''}>
            <small>{String(i + 1).padStart(2, '0')}</small>
            <b style={gothic}>{n}</b>
            <span className="vcb__thumb" style={ph(pos, 400)} />
            <em>→</em>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Categorías C: carrusel horizontal de tarjetas altas
function CC() {
  return (
    <section className="vcat vcc">
      <div className="vcc__head"><div><p className="idx">(01) Colección</p><h2 style={gothic}>Compra por categoría</h2></div><span>ARRASTRÁ →</span></div>
      <div className="vcc__row">
        {CATS.map(([n, pos], i) => (
          <a key={n} style={ph(pos, 360)}>
            <small>{String(i + 1).padStart(2, '0')} / 08</small>
            <b style={gothic}>{n}</b>
            <i>Comprar →</i>
          </a>
        ))}
      </div>
    </section>
  )
}

// Categorías D: etiquetas colgantes de ropa
function CD() {
  return (
    <section className="vcat vcd">
      <p className="idx">(01) Colección</p>
      <h2 style={gothic}>Compra por categoría</h2>
      <div className="vcd__grid">
        {CATS.map(([n, pos], i) => (
          <a key={n} className="vcd__tag" style={{ '--r': `${[-3, 2, -2, 3][i % 4]}deg` }}>
            <i className="vcd__hole" />
            <span className="vcd__ph" style={ph(pos, 380)} />
            <small>N°{String(i + 1).padStart(2, '0')}</small>
            <b style={gothic}>{n}</b>
          </a>
        ))}
      </div>
    </section>
  )
}

// Conjuntos: buzo (arriba) + pantaloneta (abajo)
const CONJ = [
  ['Conjunto 01', '81% 57%', '100% 82%'],
  ['Conjunto 02', '70% 40%', '40% 88%'],
  ['Conjunto 03', '3% 38%', '11% 91%'],
  ['Conjunto 04', '50% 55%', '8% 28%'],
]

// J-A: par dividido, buzo arriba y pantaloneta abajo
function JA() {
  return (
    <section className="vcat vja">
      <p className="idx">(02) Conjuntos</p>
      <h2 style={gothic}>Buzo y pantaloneta, listos para usar</h2>
      <div className="vja__grid">
        {CONJ.map(([n, a, b]) => (
          <article key={n}>
            <div className="vja__ph" style={ph(a, 360)}><em>BUZO</em></div>
            <i>+</i>
            <div className="vja__ph" style={ph(b, 360)}><em>PANTALONETA</em></div>
            <b style={gothic}>{n}</b>
            <button>Agregar +</button>
          </article>
        ))}
      </div>
    </section>
  )
}

// J-B: un conjunto destacado y los demás en lista
function JB() {
  return (
    <section className="vcat vjb">
      <p className="idx">(02) Conjuntos</p>
      <div className="vjb__wrap">
        <div className="vjb__main">
          <div className="vjb__img" style={ph('81% 57%', 330)} />
          <div className="vjb__img vjb__img--s" style={ph('100% 82%', 330)} />
          <div className="vjb__info">
            <small>BUZO + PANTALONETA</small>
            <b style={gothic}>Conjunto 01</b>
            <ul><li>Buzo <span>tallas S a XL</span></li><li>Pantaloneta <span>tallas S a XL</span></li></ul>
            <button>Agregar a la bolsa +</button>
          </div>
        </div>
        <ul className="vjb__list">
          {CONJ.map(([n, a], i) => (
            <li key={n} className={i === 0 ? 'on' : ''}><span style={ph(a, 420)} /><b style={gothic}>{n}</b><em>{String(i + 1).padStart(2, '0')}</em></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// J-C: conjuntos colgados de un riel, como en el local
function JC() {
  return (
    <section className="vcat vjc">
      <p className="idx">(02) Conjuntos</p>
      <h2 style={gothic}>Del riel a tu closet</h2>
      <div className="vjc__rail" />
      <div className="vjc__row">
        {CONJ.map(([n, a, b], i) => (
          <article key={n} style={{ '--r': `${[-2, 1.5, -1.5, 2][i]}deg` }}>
            <svg viewBox="0 0 60 36" width="62" aria-hidden="true"><path d="M30 0v8M30 8c-6 0-9 3-9 6M30 8c4 0 6-3 6-6M4 32 30 14l26 18z" fill="none" stroke="#c9a36a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div className="vjc__ph" style={ph(a, 360)} />
            <div className="vjc__ph vjc__ph--b" style={ph(b, 360)} />
            <b style={gothic}>{n}</b>
            <small>BUZO + PANTALONETA</small>
          </article>
        ))}
      </div>
    </section>
  )
}

// J-D: filas editoriales grandes
function JD() {
  return (
    <section className="vcat vjd">
      <p className="idx">(02) Conjuntos</p>
      {CONJ.slice(0, 2).map(([n, a, b], i) => (
        <article key={n} className={i % 2 ? 'rev' : ''}>
          <div className="vjd__pair"><span style={ph(a, 340)} /><span style={ph(b, 340)} /></div>
          <div className="vjd__txt">
            <small>0{i + 1} / 04</small>
            <b style={gothic}>{n}</b>
            <p>Buzo + pantaloneta. Tallas S a XL.</p>
            <button>Agregar +</button>
          </div>
        </article>
      ))}
    </section>
  )
}

// La marca
const FACTS = [
  ['Local', 'Tienda física para que pruebes y escojas con calma.'],
  ['Envíos', 'Enviamos a toda Colombia.'],
  ['Pedidos', 'Eliges tu prenda, nos escribes y listo.'],
]

// M-A: foto a sangre con el texto encima
function MA() {
  return (
    <section className="vm vma">
      <img src={local} alt="" />
      <div className="vma__shade" />
      <div className="vma__txt">
        <p className="idx">(03) La marca</p>
        <h2 style={gothic}>Ropa que no falla. Que no pasa de moda.</h2>
        <p>Pintas que funcionan hoy, mañana y siempre. En Callejón Store cada prenda es un acierto.</p>
      </div>
      <ul className="vma__facts">{FACTS.map(([t, d]) => <li key={t}><b style={gothic}>{t}</b><span>{d}</span></li>)}</ul>
    </section>
  )
}

// M-B: manifiesto gigante en negro con foto pequeña
function MB() {
  return (
    <section className="vm vmb">
      <p className="idx">(03) La marca</p>
      <h2 style={gothic}>Ropa que no falla.<br />Que no pasa de moda.</h2>
      <div className="vmb__row">
        <img src={local} alt="" />
        <p>Pintas que funcionan hoy, mañana y siempre. En Callejón Store cada prenda es un acierto.</p>
        <ul>{FACTS.map(([t, d], i) => <li key={t}><small>0{i + 1}</small><b style={gothic}>{t}</b><span>{d}</span></li>)}</ul>
      </div>
    </section>
  )
}

// M-C: collage con foto, cinta y etiquetas pegadas
function MC() {
  return (
    <section className="vm vmc">
      <div className="vmc__photo">
        <img src={local} alt="" />
        <i className="vmc__tape" />
        <span className="vmc__sticker" style={{ '--r': '-6deg', top: '10%', left: '-6%' }}>LOCAL</span>
        <span className="vmc__sticker" style={{ '--r': '5deg', top: '42%', right: '-8%' }}>ENVÍOS</span>
        <span className="vmc__sticker" style={{ '--r': '-3deg', bottom: '8%', left: '-4%' }}>PEDIDOS</span>
      </div>
      <div className="vmc__txt">
        <p className="idx">(03) La marca</p>
        <h2 style={gothic}>Ropa que no falla. Que no pasa de moda.</h2>
        <p>Pintas que funcionan hoy, mañana y siempre. En Callejón Store cada prenda es un acierto.</p>
        <ul>{FACTS.map(([t, d]) => <li key={t}><b>{t}</b> {d}</li>)}</ul>
      </div>
    </section>
  )
}

// M-D: foto alta pegada al borde y panel negro con números
function MD() {
  return (
    <section className="vm vmd">
      <img src={local} alt="" />
      <div className="vmd__panel">
        <p className="idx">(03) La marca</p>
        <h2 style={gothic}>Ropa que no falla. Que no pasa de moda.</h2>
        <p className="vmd__lead">Pintas que funcionan hoy, mañana y siempre. En Callejón Store cada prenda es un acierto.</p>
        <ul>{FACTS.map(([t, d], i) => <li key={t}><em style={gothic}>{i + 1}</em><div><b>{t}</b><span>{d}</span></div></li>)}</ul>
      </div>
    </section>
  )
}

// Cómo comprar
const STEPS3 = [
  ['01', 'Eliges tu prenda', 'Mira lo nuevo en nuestro Instagram o visítanos en el local.'],
  ['02', 'Nos escribes', 'Por WhatsApp te confirmamos tallas, colores y disponibilidad.'],
  ['03', 'Pagas y la recibes', 'Pagas por el método que prefieras y te la enviamos.'],
]

// H-A: etiquetas de ropa colgadas de un hilo
function HA() {
  return (
    <section className="vh vha">
      <p className="idx">(04) Cómo comprar</p>
      <h2 style={gothic}>Comprar es fácil</h2>
      <div className="vha__string" />
      <div className="vha__row">
        {STEPS3.map(([n, t, d], i) => (
          <article key={n} style={{ '--r': `${[-3, 2, -2][i]}deg` }}>
            <i className="vha__hole" />
            <em style={gothic}>{n}</em>
            <b>{t}</b>
            <p>{d}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

// H-B: el pedido como una conversación de WhatsApp
function HB() {
  return (
    <section className="vh vhb">
      <div>
        <p className="idx">(04) Cómo comprar</p>
        <h2 style={gothic}>Comprar es fácil</h2>
        <ol>{STEPS3.map(([n, t, d]) => <li key={n}><em style={gothic}>{n}</em><div><b>{t}</b><p>{d}</p></div></li>)}</ol>
      </div>
      <div className="vhb__chat">
        <div className="vhb__bar"><span className="logo-mark" style={mark} />Callejón Store<small>en línea</small></div>
        <p className="out">Hola, quiero el Conjunto 01</p>
        <p className="in">¡Hola! Claro. ¿Qué talla necesitás?</p>
        <p className="out">Talla M</p>
        <p className="in">Disponible. Te paso los datos de pago y lo enviamos a tu ciudad.</p>
        <p className="out">Listo, ya pagué</p>
      </div>
    </section>
  )
}

// H-C: guías de envío pegadas como etiquetas
function HC() {
  return (
    <section className="vh vhc">
      <p className="idx">(04) Cómo comprar</p>
      <h2 style={gothic}>Comprar es fácil</h2>
      <div className="vhc__row">
        {STEPS3.map(([n, t, d], i) => (
          <article key={n} style={{ '--r': `${[-2, 1.5, -1][i]}deg` }}>
            <header><span>PASO</span><em style={gothic}>{n}</em></header>
            <b>{t}</b>
            <p>{d}</p>
            <div className="vhc__bars" aria-hidden="true" />
            <small>CALLEJÓN STORE · COLOMBIA</small>
          </article>
        ))}
      </div>
    </section>
  )
}

// H-D: filas gigantes con el número en gótica
function HD() {
  return (
    <section className="vh vhd">
      <p className="idx">(04) Cómo comprar</p>
      <h2 style={gothic}>Comprar es fácil</h2>
      <ol>
        {STEPS3.map(([n, t, d], i) => (
          <li key={n} className={i === 1 ? 'on' : ''}>
            <em style={gothic}>{Number(n)}</em>
            <b style={gothic}>{t}</b>
            <p>{d}</p>
            <i>→</i>
          </li>
        ))}
      </ol>
    </section>
  )
}

// Envíos y pagos
const SHIP = [['Transportadora', 'a elección del cliente'], ['Tiempo de entrega', 'según la transportadora'], ['Costo del envío', 'según la ubicación']]
const PAY = ['Transferencia bancaria', 'Tarjetas crédito y débito', 'Pago contra entrega (por confirmar)']

// E-A: ruta del pedido y pagos en etiquetas
function EA() {
  return (
    <section className="ve vea">
      <p className="idx">(05) Envíos</p>
      <h2 style={gothic}>Llegamos a donde estés</h2>
      <div className="vea__route">
        <i className="vea__line" />
        {['Sale del local', 'Viaja contigo', 'Llega a tu casa'].map((t, i) => (
          <div key={t} className="vea__node">
            <span style={gothic}>{i + 1}</span>
            <b>{t}</b>
            <small>{SHIP[i][0]}: {SHIP[i][1]}</small>
          </div>
        ))}
      </div>
      <p className="idx" style={{ marginTop: 44 }}>(06) Pagos</p>
      <h2 style={{ ...gothic, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Paga como prefieras</h2>
      <div className="vea__chips">{PAY.map((p) => <span key={p}>{p}</span>)}</div>
    </section>
  )
}

// E-B: pantalla partida, negro y blanco
function EB() {
  return (
    <section className="ve veb">
      <div className="veb__l">
        <p className="idx">(05) Envíos</p>
        <h2 style={gothic}>Llegamos a donde estés</h2>
        <p className="lead">Enviamos a toda Colombia.</p>
        <ul>{SHIP.map(([a, b]) => <li key={a}><b>{a}</b><span>{b}</span></li>)}</ul>
      </div>
      <div className="veb__r">
        <p className="idx">(06) Pagos</p>
        <h2 style={gothic}>Paga como prefieras</h2>
        <p className="lead">Métodos de pago disponibles.</p>
        <ul>{PAY.map((p) => <li key={p}><b>{p}</b></li>)}</ul>
      </div>
    </section>
  )
}

// E-C: recibo de tienda
function EC() {
  return (
    <section className="ve vec">
      <div className="vec__paper">
        <header><b style={gothic}>Callejón Store</b><small>RECIBO · ENVÍOS Y PAGOS</small></header>
        <h3>ENVÍOS · A TODA COLOMBIA</h3>
        {SHIP.map(([a, b]) => <p key={a}><span>{a}</span><i /><span>{b}</span></p>)}
        <h3>PAGOS · COMO PREFIERAS</h3>
        {PAY.map((p) => <p key={p}><span>{p}</span><i /><span>OK</span></p>)}
        <footer><div className="vec__bars" /><small>GRACIAS POR TU COMPRA</small></footer>
      </div>
    </section>
  )
}

// E-D: cajas selladas con cinta
function ED() {
  return (
    <section className="ve ved">
      <article style={{ '--r': '-1.5deg' }}>
        <div className="ved__tape"><span>ENVÍOS ✕ ENVÍOS ✕ ENVÍOS ✕ ENVÍOS ✕ ENVÍOS ✕</span></div>
        <h2 style={gothic}>Llegamos a donde estés</h2>
        <p className="lead">Enviamos a toda Colombia.</p>
        <ul>{SHIP.map(([a, b]) => <li key={a}><b>{a}</b> {b}</li>)}</ul>
      </article>
      <article style={{ '--r': '1.2deg' }}>
        <div className="ved__tape"><span>PAGOS ✕ PAGOS ✕ PAGOS ✕ PAGOS ✕ PAGOS ✕ PAGOS ✕</span></div>
        <h2 style={gothic}>Paga como prefieras</h2>
        <p className="lead">Métodos de pago disponibles.</p>
        <ul>{PAY.map((p) => <li key={p}>{p}</li>)}</ul>
      </article>
    </section>
  )
}

// Visítanos (mapa de ejemplo dibujado; el real será el de Google Maps)
function MapMock({ dark = false }) {
  const bg = dark ? '#1b1b1d' : '#e9e9e6'
  const block = dark ? '#262628' : '#f6f6f3'
  const road = dark ? '#3a3a3d' : '#ffffff'
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" className="vv__map" role="img" aria-label="Mapa de ejemplo con la ubicación de la tienda">
      <rect width="600" height="400" fill={bg} />
      {[[20, 20], [170, 20], [330, 20], [20, 190], [170, 190], [420, 200], [20, 300], [250, 290], [400, 300]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={i % 2 ? 130 : 120} height={i % 3 ? 90 : 120} fill={block} />
      ))}
      <g stroke={road} strokeWidth="14" strokeLinecap="round" fill="none">
        <path d="M0 150H600M0 270H600M150 0V400M310 0V400M400 0 520 400" />
      </g>
      <g stroke={road} strokeWidth="6" fill="none"><path d="M0 60H600M0 350H600M470 0V400M60 0V400" /></g>
      <g transform="translate(310 270)">
        <ellipse cx="0" cy="26" rx="16" ry="5" fill="#000" opacity=".25" />
        <path d="M0 24C-22 -4 -22 -32 0 -32S22 -4 0 24z" fill="#0a0a0a" stroke="#fff" strokeWidth="3" />
        <circle cx="0" cy="-14" r="6" fill="#fff" />
      </g>
    </svg>
  )
}

// V-A: mapa a sangre con tarjeta encima
function VA() {
  return (
    <section className="vv vva">
      <MapMock />
      <div className="vva__card">
        <p className="idx">(07) Visítanos</p>
        <h2 style={gothic}>Pasa por la tienda</h2>
        <p className="lead">Dirección del local (por confirmar)</p>
        <p className="hours">Lunes a sábado: por confirmar<br />Domingos: por confirmar</p>
        <div><a className="vv__btn">Cómo llegar</a><a className="vv__btn vv__btn--o">Escríbenos</a></div>
      </div>
    </section>
  )
}

// V-B: pantalla partida, datos y mapa
function VB() {
  return (
    <section className="vv vvb">
      <div className="vvb__info">
        <p className="idx">(07) Visítanos</p>
        <h2 style={gothic}>Pasa por la tienda</h2>
        <dl>
          <div><dt>Dirección</dt><dd>Dirección del local (por confirmar)</dd></div>
          <div><dt>Lunes a sábado</dt><dd>por confirmar</dd></div>
          <div><dt>Domingos</dt><dd>por confirmar</dd></div>
        </dl>
        <div><a className="vv__btn">Escríbenos</a><a className="vv__btn vv__btn--o">Instagram</a></div>
      </div>
      <div className="vvb__map"><MapMock dark /><a className="vv__btn vvb__go">Cómo llegar ↗</a></div>
    </section>
  )
}

// V-C: letrero de puerta "ABIERTO" y mapa con marco y cinta
function VC() {
  return (
    <section className="vv vvc">
      <div className="vvc__sign">
        <i className="vvc__string" />
        <div className="vvc__plate">
          <small>CALLEJÓN STORE</small>
          <b style={gothic}>Abierto</b>
          <span>Lun a sáb · por confirmar</span>
          <span>Dom · por confirmar</span>
        </div>
      </div>
      <div className="vvc__txt">
        <p className="idx">(07) Visítanos</p>
        <h2 style={gothic}>Pasa por la tienda</h2>
        <p className="lead">Dirección del local (por confirmar)</p>
        <div><a className="vv__btn">Cómo llegar</a><a className="vv__btn vv__btn--o">Escríbenos</a></div>
      </div>
      <div className="vvc__frame"><i className="vvc__tape" /><MapMock /></div>
    </section>
  )
}

// V-D: título arriba, mapa en franja ancha y tres etiquetas de datos
function VD() {
  return (
    <section className="vv vvd">
      <p className="idx">(07) Visítanos</p>
      <h2 style={gothic}>Pasa por la tienda</h2>
      <div className="vvd__strip"><MapMock dark /></div>
      <div className="vvd__tags">
        {[['Dirección', 'Dirección del local (por confirmar)'], ['Horario', 'Lun a sáb y domingos: por confirmar'], ['Escríbenos', 'WhatsApp e Instagram']].map(([t, d], i) => (
          <article key={t} style={{ '--r': `${[-1.5, 1, -1][i]}deg` }}><i /><small>{t}</small><b>{d}</b></article>
        ))}
      </div>
    </section>
  )
}

export default function Lab({ v }) {
  return { a: <A />, b: <B />, c: <C />, d: <D />, ca: <CA />, cb: <CB />, cc: <CC />, cd: <CD />, ja: <JA />, jb: <JB />, jc: <JC />, jd: <JD />, ma: <MA />, mb: <MB />, mc: <MC />, md: <MD />, ha: <HA />, hb: <HB />, hc: <HC />, hd: <HD />, ea: <EA />, eb: <EB />, ec: <EC />, ed: <ED />, va: <VA />, vb: <VB />, vc: <VC />, vd: <VD /> }[v] || <A />
}
