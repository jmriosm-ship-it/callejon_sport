import { useEffect } from 'react'
import { useBag } from '../hooks/useBag'
import { wa } from '../data/config'

export default function BagDrawer() {
  const { items, open, closeBag, setQty, clear, count } = useBag()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && closeBag()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeBag])

  const message =
    'Hola Callejón Store, quiero pedir:\n' +
    items.map((i) => `- ${i.qty} x ${i.name}`).join('\n') +
    '\n¿Me confirman tallas, colores y disponibilidad?'

  return (
    <div className={`bag ${open ? 'is-open' : ''}`} onClick={closeBag} aria-hidden={!open}>
      <aside className="bag__panel" role="dialog" aria-modal="true" aria-label="Tu bolsa" onClick={(e) => e.stopPropagation()}>
        <header className="bag__head">
          <h2>Tu bolsa {count > 0 && <small>({count})</small>}</h2>
          <button onClick={closeBag} aria-label="Cerrar bolsa">✕</button>
        </header>

        {items.length === 0 ? (
          <p className="bag__empty">Aún no agregaste nada. Elegí tus conjuntos y los ves acá.</p>
        ) : (
          <ul className="bag__list">
            {items.map((i) => (
              <li key={i.name}>
                <span>{i.name}</span>
                <div className="bag__qty">
                  <button onClick={() => setQty(i.name, i.qty - 1)} aria-label={`Quitar una ${i.name}`}>−</button>
                  <b>{i.qty}</b>
                  <button onClick={() => setQty(i.name, i.qty + 1)} aria-label={`Agregar una ${i.name}`}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className="bag__foot">
          <a
            className={`btn btn--light ${items.length === 0 ? 'is-off' : ''}`}
            href={items.length ? wa(message) : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={items.length === 0}
          >
            Pedir por WhatsApp
          </a>
          {items.length > 0 && <button className="bag__clear" onClick={clear}>Vaciar bolsa</button>}
          <p>Te confirmamos tallas, colores y disponibilidad por WhatsApp.</p>
        </footer>
      </aside>
    </div>
  )
}
