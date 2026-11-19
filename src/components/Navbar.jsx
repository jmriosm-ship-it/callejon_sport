import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import Icon from './Icon'
import { NAV_LINKS } from '../data/config'
import { useStore } from '../store/useStore'
import { useBag } from '../hooks/useBag'

const DRAWER_LINKS = [
  ...NAV_LINKS.slice(0, 4),
  ['envios', 'Envíos y pagos'],
  NAV_LINKS[4],
]

const catLink = (c) => `#/categoria/${encodeURIComponent(c)}`

export default function Navbar({ solid = false }) {
  const { count, openBag } = useBag()
  const { categories } = useStore()
  const [open, setOpen] = useState(false)
  const [coll, setColl] = useState(false)
  const [drawerColl, setDrawerColl] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setColl(false)
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)
  const cats = (onClick) =>
    categories.map((c) => (
      <li key={c.id}>
        <a href={catLink(c.name)} onClick={onClick}>{c.name}</a>
      </li>
    ))

  return (
    <>
      <header
        className={`nav ${scrolled || solid ? 'is-scrolled' : ''} ${coll ? 'has-coll' : ''}`}
        onMouseLeave={() => setColl(false)}
      >
        <button className="nav__burger" onClick={() => setOpen(true)} aria-label="Abrir menú">
          <Icon name="menu" />
        </button>
        <a className="nav__brand" href="#inicio" aria-label="Callejón Store, inicio">
          <span className="logo-mark" style={{ backgroundImage: `url(${logo})` }} aria-hidden="true" />
          <span>CALLEJÓN STORE</span>
        </a>
        <nav className="nav__links" aria-label="Principal">
          <button
            className="nav__coll"
            aria-expanded={coll}
            onMouseEnter={() => setColl(true)}
            onClick={() => setColl((v) => !v)}
          >
            Colección <span aria-hidden="true">▾</span>
          </button>
          {NAV_LINKS.slice(1).map(([id, label]) => (
            <a key={id} href={`#${id}`} onMouseEnter={() => setColl(false)}>{label}</a>
          ))}
        </nav>
        <button className="nav__bag" onClick={openBag} aria-label={`Abrir bolsa, ${count} prendas`}>
          <Icon name="bag" />
          {count > 0 && <b>{count}</b>}
        </button>

        <div className="mega" aria-hidden={!coll}>
          <ul>{cats(() => setColl(false))}</ul>
          <a className="mega__all" href="#/categoria/Todo" onClick={() => setColl(false)} tabIndex={coll ? 0 : -1}>
            Ver toda la colección →
          </a>
        </div>
      </header>

      <div className={`drawer ${open ? 'is-open' : ''}`} onClick={close}>
        <nav onClick={(e) => e.stopPropagation()} aria-label="Menú móvil">
          <button className="drawer__close" onClick={close} aria-label="Cerrar menú">✕</button>
          {DRAWER_LINKS.map(([id, label]) =>
            id === 'coleccion' ? (
              <div key={id}>
                <button className="drawer__coll" aria-expanded={drawerColl} onClick={() => setDrawerColl((v) => !v)}>
                  {label} {drawerColl ? '▴' : '▾'}
                </button>
                {drawerColl && (
                  <ul className="drawer__cats">
                    <li><a href="#/categoria/Todo" onClick={close}>Todo</a></li>
                    {cats(close)}
                  </ul>
                )}
              </div>
            ) : (
              <a key={id} href={`#${id}`} onClick={close}>{label}</a>
            ),
          )}
        </nav>
      </div>
    </>
  )
}
