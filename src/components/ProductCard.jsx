import { money } from '../data/products'
import { itemPhoto } from '../lib/photo'
import { finalPrice, hasDiscount, isSoldOut } from '../lib/pricing'
import { useBag } from '../hooks/useBag'

export default function ProductCard({ p, i = 0 }) {
  const { add } = useBag()
  const href = `#/producto/${p.id}`
  const sold = isSoldOut(p)
  const single = p.sizes.length === 1
  const price = finalPrice(p)
  const left = p.sizes.filter((s) => s.stock > 0).map((s) => s.size)

  return (
    <li className="reveal" style={{ '--d': `${(i % 4) * 60}ms` }}>
      <div className={`pcard ${sold ? 'is-sold' : ''}`}>
        <div className="pcard__media">
          <a className="pcard__imglink" href={href} style={itemPhoto(p)} aria-label={p.name} />
          {sold && <b className="pcard__sold">Agotado</b>}
          {!sold && hasDiscount(p) && <b className="pcard__off">-{p.discount}%</b>}
          {!sold && !hasDiscount(p) && p.tag && <b className="pcard__off pcard__off--tag">{p.tag}</b>}
          <i className="pcard__tag">
            {hasDiscount(p) && <s>{money(p.price)}</s>}
            {money(price)}
          </i>
          {!sold && (single ? (
            <button className="pcard__add" onClick={() => add(p.name, price, p.sizes[0].stock)}>Agregar +</button>
          ) : (
            <a className="pcard__add" href={href}>Elegir talla</a>
          ))}
        </div>
        <a className="pcard__txt" href={href}>
          <small>{p.category}</small>
          <b>{p.name}</b>
          <em>{sold ? 'Sin existencias por ahora' : left.join(' · ')}</em>
        </a>
      </div>
    </li>
  )
}
