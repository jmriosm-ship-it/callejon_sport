import { useCallback, useEffect, useMemo, useState } from 'react'
import { StoreContext } from './storeContext'
import { backend } from './backend'
import { CONJUNTOS_CAT } from './seed'

export function StoreProvider({ children }) {
  const [state, setState] = useState(null)

  useEffect(() => {
    let alive = true
    backend.load().then((s) => alive && setState(s))
    return () => { alive = false }
  }, [])

  // Cada acción guarda y refresca; si falla, el error le llega al panel
  const act = useCallback(async (fn) => setState(await fn()), [])

  const value = useMemo(() => {
    const s = state || { settings: {}, categories: [], products: [] }
    const catName = Object.fromEntries(s.categories.map((c) => [c.id, c.name]))
    const categories = [...s.categories].filter((c) => c.active).sort((a, b) => a.sort - b.sort)
    const products = s.products
      .filter((p) => p.active && catName[p.categoryId])
      .map((p) => ({ ...p, category: catName[p.categoryId] }))
    const { whatsapp = '', instagram = '' } = s.settings

    return {
      ready: !!state,
      raw: s,
      settings: s.settings,
      categories,
      products,
      conjuntos: products.filter((p) => p.category === CONJUNTOS_CAT),
      byId: (id) => products.find((p) => p.id === id),
      inCategory: (c) => (c === 'Todo' ? products : products.filter((p) => p.category === c)),
      wa: (text) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`,
      instagram,
      saveProduct: (p) => act(() => backend.saveProduct(p)),
      removeProduct: (id) => act(() => backend.removeProduct(id)),
      saveCategory: (c) => act(() => backend.saveCategory(c)),
      removeCategory: (id) => act(() => backend.removeCategory(id)),
      saveSettings: (x) => act(() => backend.saveSettings(x)),
      resetDemo: () => act(() => backend.resetDemo()),
    }
  }, [state, act])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
