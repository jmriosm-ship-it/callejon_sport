import { ADDRESS, HOURS, INSTAGRAM_URL, MAPS_QUERY, wa } from '../data/config'

const q = encodeURIComponent(MAPS_QUERY)

// Mapa de ejemplo mientras no haya dirección real en config.js
function PlaceholderMap() {
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa de ejemplo">
      <rect width="600" height="400" fill="#1b1b1d" />
      {[[20, 20], [170, 20], [330, 20], [20, 190], [170, 190], [420, 200], [20, 300], [250, 290], [400, 300]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={i % 2 ? 130 : 120} height={i % 3 ? 90 : 120} fill="#262628" />
      ))}
      <g stroke="#3a3a3d" strokeWidth="14" strokeLinecap="round" fill="none">
        <path d="M0 150H600M0 270H600M150 0V400M310 0V400M400 0 520 400" />
      </g>
      <g stroke="#3a3a3d" strokeWidth="6" fill="none"><path d="M0 60H600M0 350H600M470 0V400M60 0V400" /></g>
      <g transform="translate(310 270)">
        <path d="M0 24C-22 -4 -22 -32 0 -32S22 -4 0 24z" fill="#0a0a0a" stroke="#fff" strokeWidth="3" />
        <circle cx="0" cy="-14" r="6" fill="#fff" />
      </g>
    </svg>
  )
}

export default function Visit() {
  return (
    <section className="section section--dark visit" id="visitanos">
      <div className="visit__split">
        <div className="visit__info reveal">
          <p className="idx">(07) Visítanos</p>
          <h2>Pasa por la tienda</h2>
          <dl className="visit__list">
            <div><dt>Dirección</dt><dd>{ADDRESS}</dd></div>
            {HOURS.map((h) => {
              const i = h.indexOf(':')
              return <div key={h}><dt>{h.slice(0, i)}</dt><dd>{h.slice(i + 1).trim()}</dd></div>
            })}
          </dl>
          <div className="hero__cta" style={{ justifyContent: 'flex-start', marginTop: 0 }}>
            <a className="btn btn--light" href={wa('Hola, ¿dónde queda el local?')} target="_blank" rel="noreferrer">Escríbenos</a>
            <a className="btn btn--ghost" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>

        <div className="visit__map">
          {MAPS_QUERY ? (
            <>
              <iframe
                title="Mapa de Callejón Store"
                src={`https://www.google.com/maps?q=${q}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a className="btn btn--light visit__go" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noreferrer">
                Cómo llegar ↗
              </a>
            </>
          ) : (
            <>
              <PlaceholderMap />
              <span className="visit__map-note">Mapa de ejemplo</span>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
