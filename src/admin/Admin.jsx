import { useEffect, useState } from 'react'
import './admin.css'
import logo from '../assets/logo.png'
import { backend } from '../store/backend'
import { DEMO_PASSWORD } from '../store/localBackend'
import ProductsTab from './ProductsTab'
import CategoriesTab from './CategoriesTab'
import SettingsTab from './SettingsTab'
import { CONJUNTOS_CAT } from '../store/seed'

const TABS = [
  ['prendas', 'Prendas'],
  ['conjuntos', 'Conjuntos'],
  ['categorias', 'Categorías'],
  ['tienda', 'Tienda'],
]

function Login({ onIn }) {
  const [pw, setPw] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try {
      await backend.login(pw, email)
      onIn()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="adm adm--login">
      <form className="adm-login" onSubmit={submit}>
        <span className="logo-mark" style={{ backgroundImage: `url(${logo})` }} aria-hidden="true" />
        <h1>Panel de Callejón Store</h1>
        {backend.kind === 'supabase' && (
          <label>Correo
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus autoComplete="username" />
          </label>
        )}
        <label>{backend.kind === 'supabase' ? 'Contraseña' : 'Clave'}
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus={backend.kind !== 'supabase'} autoComplete="current-password" />
        </label>
        {error && <p className="adm-error" role="alert">{error}</p>}
        <button className="btn btn--light" type="submit">Entrar</button>
        {backend.kind === 'local' && <p className="adm-help">Modo demo: la clave es <b>{DEMO_PASSWORD}</b>. Con Supabase se entra con correo y contraseña.</p>}
        <a className="adm-back" href="#inicio">← Volver a la tienda</a>
      </form>
    </div>
  )
}

export default function Admin() {
  const [auth, setAuth] = useState(null) // null = comprobando
  const [tab, setTab] = useState('prendas')
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    backend.isAdmin().then(setAuth)
  }, [])

  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(null), 3200)
    return () => clearTimeout(t)
  }, [msg])

  useEffect(() => {
    const prev = document.title
    document.title = 'Panel · Callejón Store'
    return () => { document.title = prev }
  }, [])

  if (auth === null) return null
  if (!auth) return <Login onIn={() => setAuth(true)} />

  const say = (text, bad = false) => setMsg({ text, bad })

  return (
    <div className="adm">
      <header className="adm-top">
        <a className="adm-brand" href="#inicio">
          <span className="logo-mark" style={{ backgroundImage: `url(${logo})` }} aria-hidden="true" />
          <span>Panel</span>
        </a>
        <nav className="adm-tabs" aria-label="Secciones del panel">
          {TABS.map(([id, label]) => (
            <button key={id} className={tab === id ? 'is-on' : ''} onClick={() => setTab(id)}>{label}</button>
          ))}
        </nav>
        <div className="adm-top__r">
          <a href="#inicio" target="_blank" rel="noreferrer">Ver tienda ↗</a>
          <button onClick={async () => { await backend.logout(); setAuth(false) }}>Salir</button>
        </div>
      </header>

      <main className="adm-main">
        {backend.kind === 'local' && (
          <p className="adm-demo">Modo demo: lo que cambies se guarda solo en este navegador. Al conectar Supabase se verá en todos los dispositivos.</p>
        )}
        {tab === 'prendas' && <ProductsTab say={say} />}
        {tab === 'conjuntos' && <ProductsTab onlyCat={CONJUNTOS_CAT} say={say} />}
        {tab === 'categorias' && <CategoriesTab say={say} />}
        {tab === 'tienda' && <SettingsTab say={say} />}
      </main>

      {msg && <div className={`adm-toast ${msg.bad ? 'is-bad' : ''}`} role="status">{msg.text}</div>}
    </div>
  )
}
