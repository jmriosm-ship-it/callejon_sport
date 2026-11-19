import { money } from '../data/products'
import { photo } from '../lib/photo'
import { useBag } from '../hooks/useBag'

export default function ProductCard({ p, i = 0 }) {
  const { add } = useBag()
  const href = `#/producto/${p.id}`
  const single = p.sizes.length === 1

  return (
    <li className="reveal" style={{ '--d': `${(i % 4) * 60}ms` }}>
      <div className="pcard">
        <div className="pcard__media">
          <a className="pcard__imglink" href={href} style={photo(p.pos)} aria-label={p.name} />
          <i className="pcard__tag">{money(p.price)}</i>
          {single ? (
            <button className="pcard__add" onClick={() => add(p.name, p.price)}>Agregar +</button>
          ) : (
            <a className="pcard__add" href={href}>Elegir talla</a>
          )}
        </div>
        <a className="pcard__txt" href={href}>
          <small>{p.category}</small>
          <b>{p.name}</b>
          <em>{p.sizes.join(' · ')}</em>
        </a>
      </div>
    </li>
  )
}
