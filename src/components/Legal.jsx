import { LEGAL_SLUGS, UPDATED, legal } from '../data/legal'
import { useStore } from '../store/useStore'

export default function Legal({ slug }) {
  const { settings } = useStore()
  const sections = legal(slug, settings)

  return (
    <section className="page legal">
      <div className="wrap">
        <a className="page__back" href="#inicio">← Inicio</a>
        <h1 className="catalog__title legal__title">{LEGAL_SLUGS[slug]}</h1>
        <p className="catalog__count">Actualizado el {UPDATED}</p>
        <nav className="chips" aria-label="Políticas">
          {Object.entries(LEGAL_SLUGS).map(([k, label]) => (
            <a key={k} href={`#/politicas/${k}`} className={k === slug ? 'is-on' : ''} aria-current={k === slug ? 'page' : undefined}>{label.split(',')[0]}</a>
          ))}
        </nav>
        <div className="legal__body">
          {sections?.map(([h, paras], i) => (
            <section key={h}>
              <h2>{i + 1}. {h}</h2>
              {paras.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
