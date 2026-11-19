import local from '../assets/local.webp'
import { CONJUNTOS } from '../data/config'
import { money } from '../data/products'
import { useBag } from '../hooks/useBag'

export default function Conjuntos() {
  const { add } = useBag()

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
          {CONJUNTOS.map((c, i) => (
            <article
              key={c.title}
              className="cj__card reveal"
              style={{ backgroundImage: `url(${local})`, backgroundPosition: c.pos, '--d': `${i * 80}ms` }}
            >
              <i className="cj__price">{money(c.price)}</i>
              <div>
                <h3 className="cj__name">{c.title}</h3>
                <p className="cj__incl">Buzo + pantaloneta</p>
                <button
                  className="cj__add"
                  onClick={() => add(`${c.title} (buzo + pantaloneta)`, c.price)}
                  aria-label={`Agregar ${c.title} a la bolsa`}
                >
                  Agregar +
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
