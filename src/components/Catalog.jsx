import ProductCard from './ProductCard'
import { IS_SAMPLE } from '../data/products'
import { useStore } from '../store/useStore'

export default function Catalog({ category }) {
  const { categories, inCategory, wa, products } = useStore()
  const list = inCategory(category)
  const chips = ['Todo', ...categories.map((c) => c.name)]
  const sample = IS_SAMPLE && products.some((p) => !p.photos?.length)

  return (
    <section className="page catalog">
      <b
        className="catalog__ghost"
        aria-hidden="true"
        style={{ fontSize: `${Math.min(40, 100 / (category.length * 0.55))}vw` }}
      >
        {category}
      </b>
      <div className="wrap">
        <a className="page__back" href="#coleccion">← Colección</a>
        <h1 className="catalog__title">{category}</h1>
        <p className="catalog__count">{list.length} {list.length === 1 ? 'prenda' : 'prendas'}</p>
        {sample && <p className="sample">Prendas de ejemplo: las fotos y los precios son provisionales.</p>}

        <nav className="chips" aria-label="Categorías">
          {chips.map((c) => (
            <a key={c} href={`#/categoria/${encodeURIComponent(c)}`} className={c === category ? 'is-on' : ''} aria-current={c === category ? 'page' : undefined}>{c}</a>
          ))}
        </nav>

        {list.length === 0 ? (
          <p className="catalog__empty">
            Pronto habrá prendas en esta categoría. Mientras tanto,{' '}
            <a href={wa(`Hola, quiero ver ${category.toLowerCase()}`)} target="_blank" rel="noreferrer">escríbenos por WhatsApp</a>.
          </p>
        ) : (
          <ul className="pgrid">
            {list.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
          </ul>
        )}
      </div>
    </section>
  )
}
