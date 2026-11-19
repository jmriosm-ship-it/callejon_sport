import { useState } from 'react'
import ProductCard from './ProductCard'
import { photo } from '../lib/photo'
import { IS_SAMPLE, PRODUCTS, byId, money } from '../data/products'
import { useBag } from '../hooks/useBag'
import { wa } from '../data/config'

// Qué categorías combinan con cada prenda para "Completa tu pinta"
const PAIRS = {
  Camisetas: ['Jeans', 'Gorras', 'Tenis', 'Bermudas'],
  Jeans: ['Camisetas', 'Gorras', 'Tenis', 'Sudaderas'],
  Bermudas: ['Camisetas', 'Gorras', 'Tenis', 'Accesorios'],
  Gorras: ['Camisetas', 'Jeans', 'Tenis', 'Bermudas'],
  Tenis: ['Camisetas', 'Jeans', 'Gorras', 'Bermudas'],
  Sudaderas: ['Jeans', 'Gorras', 'Tenis', 'Accesorios'],
  Conjuntos: ['Gorras', 'Tenis', 'Accesorios', 'Camisetas'],
}

const completeLook = (p) =>
  (PAIRS[p.category] || ['Camisetas', 'Gorras', 'Tenis', 'Jeans'])
    .map((c) => PRODUCTS.find((x) => x.category === c && x.id !== p.id))
    .filter(Boolean)
    .slice(0, 3)

export default function ProductPage({ id }) {
  const p = byId(id)
  const { add } = useBag()
  const [size, setSize] = useState(p && p.sizes.length === 1 ? p.sizes[0] : '')
  const [error, setError] = useState(false)

  if (!p) {
    return (
      <section className="page">
        <div className="wrap">
          <a className="page__back" href="#/categoria/Todo">← Todas las prendas</a>
          <h1 className="catalog__title">No encontramos esa prenda</h1>
        </div>
      </section>
    )
  }

  const label = `${p.name}${p.sizes.length > 1 ? ` · talla ${size}` : ''}`
  const onAdd = () => {
    if (!size) return setError(true)
    add(label, p.price)
  }
  const look = completeLook(p)

  return (
    <section className="page product">
      <div className="wrap">
        <a className="page__back" href={`#/categoria/${encodeURIComponent(p.category)}`}>← {p.category}</a>
        <div className="product__grid">
          <div className="product__img" style={photo(p.pos, 300)} role="img" aria-label={p.name} />
          <div className="product__info">
            <small>{p.category}</small>
            <h1 className="product__name">{p.name}</h1>
            <p className="product__price">{money(p.price)}</p>

            <fieldset className="sizes">
              <legend>Talla</legend>
              {p.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={s === size ? 'is-on' : ''}
                  aria-pressed={s === size}
                  onClick={() => { setSize(s); setError(false) }}
                >
                  {s}
                </button>
              ))}
            </fieldset>
            {error && <p className="product__error" role="alert">Elegí una talla primero.</p>}

            <div className="product__cta">
              <button className="btn btn--light" onClick={onAdd}>Agregar a la bolsa</button>
              <a
                className="btn btn--ghost"
                href={wa(`Hola Callejón Store, me interesa: ${label} (${money(p.price)}). ¿Hay disponible?`)}
                target="_blank"
                rel="noreferrer"
              >
                Preguntar por WhatsApp
              </a>
            </div>
            <p className="product__note">Te confirmamos tallas, colores y disponibilidad por WhatsApp.</p>
            {IS_SAMPLE && <p className="sample">Prenda de ejemplo: la foto y el precio son provisionales.</p>}
          </div>
        </div>

        {look.length > 0 && (
          <div className="look">
            <p className="look__title">Completa tu pinta</p>
            <ul className="pgrid">
              {look.map((x, i) => <ProductCard key={x.id} p={x} i={i} />)}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
