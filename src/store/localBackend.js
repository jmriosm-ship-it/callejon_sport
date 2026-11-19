// Backend de demostración: guarda todo en el navegador (localStorage).
// Más adelante se reemplaza por Supabase con la misma interfaz (ver backend.js).
import { seed } from './seed'

const KEY = 'callejon-store-v1'
const AUTH = 'callejon-admin'
// Clave de la demo. En Supabase el ingreso se hace con correo y contraseña reales.
export const DEMO_PASSWORD = 'callejon'

const read = () => {
  try {
    const s = JSON.parse(localStorage.getItem(KEY))
    if (s?.products && s?.categories && s?.settings) return s
  } catch { /* sin datos guardados */ }
  return seed()
}

const write = (state) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    throw new Error('No hay espacio en el navegador para tantas fotos. Quita algunas o usa fotos más pequeñas.')
  }
}

const upsert = (list, item) => (list.some((x) => x.id === item.id) ? list.map((x) => (x.id === item.id ? item : x)) : [...list, item])

export const localBackend = {
  kind: 'local',
  async load() {
    return read()
  },
  async saveProduct(p) {
    const s = read()
    s.products = upsert(s.products, p)
    write(s)
    return s
  },
  async removeProduct(id) {
    const s = read()
    s.products = s.products.filter((p) => p.id !== id)
    write(s)
    return s
  },
  async saveCategory(c) {
    const s = read()
    s.categories = upsert(s.categories, c)
    write(s)
    return s
  },
  async removeCategory(id) {
    const s = read()
    if (s.products.some((p) => p.categoryId === id)) throw new Error('Esa categoría tiene prendas. Muévelas o elimínalas primero.')
    s.categories = s.categories.filter((c) => c.id !== id)
    write(s)
    return s
  },
  async saveSettings(settings) {
    const s = read()
    s.settings = settings
    write(s)
    return s
  },
  async resetDemo() {
    localStorage.removeItem(KEY)
    return read()
  },
  async uploadImage(dataUrl) {
    return dataUrl // en la demo la foto queda guardada dentro del dato; en Supabase se sube al storage
  },
  async isAdmin() {
    try { return sessionStorage.getItem(AUTH) === '1' } catch { return false }
  },
  async login(password) {
    if (password !== DEMO_PASSWORD) throw new Error('Clave incorrecta')
    try { sessionStorage.setItem(AUTH, '1') } catch { /* sin sessionStorage */ }
  },
  async logout() {
    try { sessionStorage.removeItem(AUTH) } catch { /* sin sessionStorage */ }
  },
}
