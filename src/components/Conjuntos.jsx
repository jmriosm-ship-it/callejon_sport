import local from '../assets/local.webp'
import { CONJUNTOS } from '../data/config'
import { useBag } from '../hooks/useBag'

const photo = (pos) => ({ backgroundImage: `url(${local})`, backgroundSize: '360% auto', backgroundPosition: pos })

export default function Conjuntos() {
  const { add } = useBag()

  return (
    <section className="section section--light" id="conjuntos">
      <div className="wrap">
        <header className="section__head reveal">
          <div>
            <p className="idx">(02) Conjuntos</p>
            <h2 className="cats-title">Buzo y pantaloneta, listos para usar</h2>
          </div>
          <a className="btn btn--dark" href="#/categoria/Conjuntos">Ver todos</a>
        </header>
        <div className="conj">
          {CONJUNTOS.map((c, i) => (
            <article key={c.title} className="conj__card reveal" style={{ '--d': `${i * 80}ms` }}>
              <div className="conj__ph" style={photo(c.buzo)}><em>BUZO</em></div>
              <span className="conj__plus" aria-hidden="true">+</span>
              <div className="conj__ph" style={photo(c.pantaloneta)}><em>PANTALONETA</em></div>
              <h3 className="conj__name">{c.title}</h3>
              <button className="conj__add" onClick={() => add(`${c.title} (buzo + pantaloneta)`)} aria-label={`Agregar ${c.title} a la bolsa`}>
                Agregar +
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
