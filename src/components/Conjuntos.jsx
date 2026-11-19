import { itemPhoto } from '../lib/photo'
import { money } from '../data/products'
import { finalPrice, hasDiscount, isSoldOut } from '../lib/pricing'
import { useBag } from '../hooks/useBag'
import { useStore } from '../store/useStore'

export default function Conjuntos() {
  const { add } = useBag()
  const { conjuntos } = useStore()
  const list = conjuntos.slice(0, 8)

  return (
    <section className="section section--dark conjuntos" id="conjuntos">
      <div className="wrap">
        <header className="section__head reveal">
          <div>
            <p className="idx">(02) Conjuntos</p>
            <h2 className="cats-title">Buzo y pantaloneta, listos para usar</h2>
          </div>
          <a className="btn btn--light" href="#/categoria/Conjuntos">Ver todos</a>
        </header>
        <div className="cj">
          {list.map((c, i) => {
            const sold = isSoldOut(c)
            const price = finalPrice(c)
            const href = `#/producto/${c.id}`
            return (
              <article
                key={c.id}
                className={`cj__card reveal ${sold ? 'is-sold' : ''}`}
                style={{ ...itemPhoto(c), '--d': `${i * 80}ms` }}
              >
                <a className="cj__link" href={href} aria-label={c.name} />
                <i className="cj__price">
                  {hasDiscount(c) && <s>{money(c.price)}</s>}
                  {money(price)}
                </i>
                {sold && <b className="cj__sold">Agotado</b>}
                {!sold && hasDiscount(c) && <b className="cj__off">-{c.discount}%</b>}
                <div>
                  <h3 className="cj__name">{c.name}</h3>
                  <p className="cj__incl">Buzo + pantaloneta</p>
                  {!sold && (c.sizes.length === 1 ? (
                    <button className="cj__add" onClick={() => add(c.name, price, c.sizes[0].stock)} aria-label={`Agregar ${c.name} a la bolsa`}>
                      Agregar +
                    </button>
                  ) : (
                    <a className="cj__add" href={href}>Elegir talla</a>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
