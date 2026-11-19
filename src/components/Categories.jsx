import { useState } from 'react'
import local from '../assets/local.webp'
import { CATEGORIES, CATEGORY_PHOTOS } from '../data/config'

const isMobile = () => window.matchMedia('(max-width: 900px)').matches
// El mouse solo abre paneles en la vista de computador (en la vertical se abre con un toque,
// si no, al hacer scroll el puntero los abriría y cerraría solos y la página saltaría)
const canHover = () => window.matchMedia('(hover: hover) and (min-width: 901px)').matches

export default function Categories() {
  const [active, setActive] = useState(0)

  return (
    <section className="section section--dark" id="coleccion">
      <div className="wrap">
        <header className="section__head reveal">
          <div>
            <p className="idx">(01) Colección</p>
            <h2 className="cats-title">Compra por categoría</h2>
          </div>
          <a className="btn btn--light" href="#/categoria/Todo">Ver todo</a>
        </header>

        <div className="acc reveal">
          {CATEGORIES.map((c, i) => (
            <a
              key={c}
              className={`acc__item ${i === active ? 'is-on' : ''}`}
              href={`#/categoria/${encodeURIComponent(c)}`}
              style={{ backgroundImage: `url(${local})`, backgroundPosition: CATEGORY_PHOTOS[c] }}
              onMouseEnter={() => canHover() && setActive(i)}
              onFocus={() => canHover() && setActive(i)}
              onClick={(e) => {
                // en celular el primer toque abre el panel y el segundo entra a la categoría
                if (isMobile() && i !== active) {
                  e.preventDefault()
                  setActive(i)
                }
              }}
              aria-label={`${c}, ver prendas`}
            >
              <span className="acc__n">{String(i + 1).padStart(2, '0')}</span>
              <b className="acc__name">{c}</b>
              <span className="acc__go">Comprar →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
