import { useState } from 'react'
import ProductCard from './ProductCard'
import { itemPhoto } from '../lib/photo'
import { IS_SAMPLE, money } from '../data/products'
import { useBag } from '../hooks/useBag'
import { useStore } from '../store/useStore'
import { finalPrice, hasDiscount, isSoldOut, sizeStock } from '../lib/pricing'

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

export default function ProductPage({ id }) {
  const { byId, products, wa, ready } = useStore()
  const p = byId(id)
  const { add } = useBag()
  const [size, setSize] = useState('')
  const [photoIx, setPhotoIx] = useState(0)
  const [error, setError] = useState(false)

  if (!p) {
    return (
      <section className="page">
        <div className="wrap">
          <a className="page__back" href="#/categoria/Todo">← Todas las prendas</a>
          <h1 className="catalog__title">{ready ? 'No encontramos esa prenda' : ''}</h1>
        </div>
      </section>
    )
  }

  const sold = isSoldOut(p)
  const price = finalPrice(p)
  // si la prenda tiene una sola talla disponible, ya queda elegida
  const available = p.sizes.filter((s) => s.stock > 0)
  const chosen = size || (available.length === 1 && p.sizes.length === 1 ? available[0].size : '')
  const label = `${p.name}${p.sizes.length > 1 && chosen ? ` · talla ${chosen}` : ''}`
  const left = chosen ? sizeStock(p, chosen) : 0

  const onAdd = () => {
    if (!chosen) return setError(true)
    add(label, price, left)
  }

  const look = (PAIRS[p.category] || ['Camisetas', 'Gorras', 'Tenis', 'Jeans'])
    .map((c) => products.find((x) => x.category === c && x.id !== p.id))
    .filter(Boolean)
    .slice(0, 3)

  const photos = p.photos || []

  return (
    <section className="page product">
      <div className="wrap">
        <a className="page__back" href={`#/categoria/${encodeURIComponent(p.category)}`}>← {p.category}</a>
        <div className="product__grid">
          <div className="product__gallery">
            <div className="product__img" style={itemPhoto(p, 300, photoIx)} role="img" aria-label={p.name}>
              {sold && <b className="product__sold">Agotado</b>}
              {!sold && hasDiscount(p) && <b className="product__off">-{p.discount}%</b>}
            </div>
            {photos.length > 1 && (
              <div className="product__thumbs">
                {photos.map((u, i) => (
                  <button key={u.slice(-24) + i} className={i === photoIx ? 'is-on' : ''} style={{ backgroundImage: `url("${u}")` }} onClick={() => setPhotoIx(i)} aria-label={`Ver foto ${i + 1}`} />
                ))}
              </div>
            )}
          </div>
          <div className="product__info">
            <small>{p.category}</small>
            <h1 className="product__name">{p.name}</h1>
            <p className="product__price">
              {hasDiscount(p) && <s>{money(p.price)}</s>}
              {money(price)}
            </p>
            {p.desc && <p className="product__desc">{p.desc}</p>}

            {p.sizes.length > 0 && (
              <fieldset className="sizes">
                <legend>Talla</legend>
                {p.sizes.map((s) => {
                  const out = s.stock <= 0
                  return (
                    <button
                      key={s.size}
                      type="button"
                      disabled={out || sold}
                      className={`${s.size === chosen ? 'is-on' : ''} ${out ? 'is-out' : ''}`}
                      aria-pressed={s.size === chosen}
                      onClick={() => { setSize(s.size); setError(false) }}
                    >
                      {s.size}
                    </button>
                  )
                })}
              </fieldset>
            )}
            {error && <p className="product__error" role="alert">Elige una talla primero.</p>}
            {!sold && chosen && left <= 3 && <p className="product__left">¡Quedan solo {left}!</p>}

            <div className="product__cta">
              {sold ? (
                <button className="btn btn--light" disabled>Agotado</button>
              ) : (
                <button className="btn btn--light" onClick={onAdd}>Agregar a la bolsa</button>
              )}
              <a
                className="btn btn--ghost"
                href={wa(sold
                  ? `Hola Callejón Store, ¿cuándo llega de nuevo: ${p.name}?`
                  : `Hola Callejón Store, me interesa: ${label} (${money(price)}). ¿Hay disponible?`)}
                target="_blank"
                rel="noreferrer"
              >
                {sold ? 'Avísame cuando llegue' : 'Preguntar por WhatsApp'}
              </a>
            </div>
            <p className="product__note">Te confirmamos tallas, colores y disponibilidad por WhatsApp.</p>
            {IS_SAMPLE && !p.photos?.length && <p className="sample">Prenda de ejemplo: la foto y el precio son provisionales.</p>}
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
