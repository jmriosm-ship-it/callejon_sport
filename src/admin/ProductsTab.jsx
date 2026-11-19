import { useState } from 'react'
import ProductForm from './ProductForm'
import { useStore } from '../store/useStore'
import { money } from '../data/products'
import { itemPhoto } from '../lib/photo'
import { finalPrice, hasDiscount, isSoldOut, totalStock } from '../lib/pricing'

const emptyProduct = (categoryId = '') => ({
  id: '',
  name: '',
  desc: '',
  categoryId,
  price: '',
  discount: 0,
  tag: '',
  photos: [],
  pos: '50% 50%',
  sizes: [],
  soldOut: false,
  active: true,
})

// Lista de prendas. `onlyCat` deja solo una categoría (pestaña Conjuntos)
export default function ProductsTab({ onlyCat, say }) {
  const { raw, saveProduct, removeProduct } = useStore()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('')
  const [editing, setEditing] = useState(null)
  const [bulk, setBulk] = useState({ cat: '', pct: 10 })

  const cats = [...raw.categories].sort((a, b) => a.sort - b.sort)
  const catName = Object.fromEntries(cats.map((c) => [c.id, c.name]))
  const forced = onlyCat ? cats.find((c) => c.name === onlyCat) : null
  const catFilter = forced ? forced.id : filter

  const list = raw.products.filter((p) =>
    (!catFilter || p.categoryId === catFilter) && (!q || p.name.toLowerCase().includes(q.toLowerCase())))

  const run = async (fn, ok) => {
    try { await fn(); say(ok) } catch (e) { say(e.message || 'No se pudo', true) }
  }

  const applyBulk = () => {
    const target = forced ? forced.id : bulk.cat
    const pct = Math.min(95, Math.max(0, parseInt(bulk.pct, 10) || 0))
    const items = raw.products.filter((p) => !target || p.categoryId === target)
    if (!items.length) return say('No hay prendas para aplicar el descuento', true)
    const where = target ? `en ${catName[target]}` : 'en toda la tienda'
    if (!window.confirm(pct ? `¿Poner ${pct}% de descuento a ${items.length} prendas ${where}?` : `¿Quitar el descuento a ${items.length} prendas ${where}?`)) return
    run(async () => { for (const p of items) await saveProduct({ ...p, discount: pct }) }, pct ? `Descuento del ${pct}% aplicado` : 'Descuentos quitados')
  }

  return (
    <>
      <div className="adm-bar">
        <input className="adm-search" type="search" placeholder="Buscar prenda…" value={q} onChange={(e) => setQ(e.target.value)} />
        {!forced && (
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filtrar por categoría">
            <option value="">Todas las categorías</option>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        )}
        <button className="btn btn--light" onClick={() => setEditing(emptyProduct(forced?.id || filter))}>
          + {onlyCat ? 'Nuevo conjunto' : 'Nueva prenda'}
        </button>
      </div>

      <div className="adm-bulk">
        <b>Descuento rápido</b>
        {!forced && (
          <select value={bulk.cat} onChange={(e) => setBulk({ ...bulk, cat: e.target.value })} aria-label="Categoría del descuento">
            <option value="">Toda la tienda</option>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        )}
        <input type="number" min="0" max="95" value={bulk.pct} onChange={(e) => setBulk({ ...bulk, pct: e.target.value })} aria-label="Porcentaje" />
        <span>%</span>
        <button className="btn btn--ghost" onClick={applyBulk}>Aplicar</button>
        <small>(0 = quitar descuentos)</small>
      </div>

      {list.length === 0 && <p className="adm-empty">No hay prendas con ese filtro.</p>}
      <ul className="adm-list">
        {list.map((p) => {
          const sold = isSoldOut(p)
          return (
            <li key={p.id} className={`adm-item ${!p.active ? 'is-off' : ''}`}>
              <div className="adm-thumb" style={itemPhoto(p, 360)} />
              <div className="adm-item__main">
                <b>{p.name}</b>
                <small>{catName[p.categoryId] || 'Sin categoría'} · {totalStock(p)} en existencias</small>
                <span className="adm-item__price">
                  {hasDiscount(p) && <s>{money(p.price)}</s>} {money(finalPrice(p))}
                </span>
                <span className="adm-badges">
                  {sold && <em className="b-red">Agotado</em>}
                  {hasDiscount(p) && <em>-{p.discount}%</em>}
                  {!p.active && <em className="b-grey">Oculta</em>}
                </span>
              </div>
              <div className="adm-item__btns">
                <button onClick={() => setEditing(p)}>Editar</button>
                <button onClick={() => run(() => saveProduct({ ...p, soldOut: !p.soldOut }), p.soldOut ? 'Ya no está marcada agotada' : 'Marcada como agotada')}>
                  {p.soldOut ? 'Quitar agotado' : 'Agotado'}
                </button>
                <button onClick={() => run(() => saveProduct({ ...p, active: !p.active }), p.active ? 'Prenda oculta' : 'Prenda visible')}>
                  {p.active ? 'Ocultar' : 'Mostrar'}
                </button>
                <button className="is-danger" onClick={() => window.confirm(`¿Eliminar "${p.name}"? No se puede deshacer.`) && run(() => removeProduct(p.id), 'Prenda eliminada')}>Eliminar</button>
              </div>
            </li>
          )
        })}
      </ul>

      {editing && (
        <ProductForm
          key={editing.id || 'new'}
          initial={{ ...editing, price: editing.price || '', sizes: editing.sizes.map((s) => ({ ...s })) }}
          categories={cats}
          onCancel={() => setEditing(null)}
          onSave={async (p) => {
            await saveProduct(p)
            setEditing(null)
            say('Prenda guardada')
          }}
        />
      )}
    </>
  )
}
