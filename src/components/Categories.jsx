import local from '../assets/local.webp'
import { CATEGORIES, CATEGORY_PHOTOS } from '../data/config'

export default function Categories() {
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
        <ul className="cats">
          {CATEGORIES.map((c, i) => (
            <li key={c} className="reveal" style={{ '--d': `${(i % 4) * 70}ms` }}>
              <a href={`#/categoria/${encodeURIComponent(c)}`}>
                <span
                  className="cats__img"
                  style={{ backgroundImage: `url(${local})`, backgroundSize: '300% auto', backgroundPosition: CATEGORY_PHOTOS[c] }}
                />
                <span className="cats__n">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="cats__name">{c}</span>
                  <span className="cats__go" style={{ display: 'inline-block' }}>Comprar →</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
