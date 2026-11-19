import { useState } from 'react'
import PhotoPicker from './PhotoPicker'
import { money } from '../data/products'
import { finalPrice, hasDiscount } from '../lib/pricing'

const PRESETS = {
  Ropa: ['S', 'M', 'L', 'XL'],
  Jeans: ['28', '30', '32', '34', '36'],
  Calzado: ['38', '39', '40', '41', '42', '43'],
  'Talla única': ['Única'],
}

export default function ProductForm({ initial, categories, onSave, onCancel }) {
  const [f, setF] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const set = (patch) => setF((p) => ({ ...p, ...patch }))

  const price = Number(f.price) || 0
  const preview = { price, discount: Number(f.discount) || 0 }

  const addPreset = (list) => {
    const have = new Set(f.sizes.map((s) => s.size))
    set({ sizes: [...f.sizes, ...list.filter((s) => !have.has(s)).map((size) => ({ size, stock: 0 }))] })
  }
  const setSize = (i, patch) => set({ sizes: f.sizes.map((s, j) => (j === i ? { ...s, ...patch } : s)) })

  const submit = async (e) => {
    e.preventDefault()
    if (!f.name.trim()) return setError('Escribe el nombre de la prenda')
    if (!f.categoryId) return setError('Elige una categoría')
    if (!(price > 0)) return setError('Escribe el precio')
    const sizes = f.sizes
      .filter((s) => s.size.trim())
      .map((s) => ({ size: s.size.trim(), stock: Math.max(0, parseInt(s.stock, 10) || 0) }))
    setSaving(true)
    setError('')
    try {
      await onSave({
        ...f,
        id: f.id || `p${Date.now().toString(36)}`,
        name: f.name.trim(),
        desc: f.desc.trim(),
        price,
        discount: Math.min(95, Math.max(0, parseInt(f.discount, 10) || 0)),
        tag: f.tag.trim(),
        sizes,
      })
    } catch (err) {
      setError(err.message || 'No se pudo guardar')
      setSaving(false)
    }
  }

  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-label={f.id ? 'Editar prenda' : 'Nueva prenda'}>
      <form className="adm-form" onSubmit={submit}>
        <header className="adm-form__head">
          <h2>{f.id ? 'Editar prenda' : 'Nueva prenda'}</h2>
          <button type="button" className="adm-x" onClick={onCancel} aria-label="Cerrar">✕</button>
        </header>

        <label>Nombre
          <input value={f.name} onChange={(e) => set({ name: e.target.value })} required />
        </label>
        <label>Descripción (opcional)
          <textarea rows="3" value={f.desc} onChange={(e) => set({ desc: e.target.value })} />
        </label>

        <div className="adm-row">
          <label>Categoría
            <select value={f.categoryId} onChange={(e) => set({ categoryId: e.target.value })}>
              <option value="">Elige…</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label>Etiqueta (Nuevo, Top…)
            <input value={f.tag} onChange={(e) => set({ tag: e.target.value })} maxLength={14} />
          </label>
        </div>

        <h3>Precio y descuento</h3>
        <div className="adm-row">
          <label>Precio (pesos)
            <input type="number" min="0" step="1000" value={f.price} onChange={(e) => set({ price: e.target.value })} />
          </label>
          <label>Descuento (%)
            <input type="number" min="0" max="95" value={f.discount} onChange={(e) => set({ discount: e.target.value })} />
          </label>
        </div>
        {price > 0 && (
          <p className="adm-help">
            Así lo verá el cliente:{' '}
            {hasDiscount(preview) && <s>{money(price)}</s>} <b>{money(finalPrice(preview))}</b>
            {hasDiscount(preview) && <> · ahorra {money(price - finalPrice(preview))}</>}
          </p>
        )}

        <h3>Fotos</h3>
        <p className="adm-help">La primera es la principal (sale en las tarjetas y en grande en la prenda). Mejor verticales.</p>
        <PhotoPicker photos={f.photos} onChange={(photos) => set({ photos })} />

        <h3>Tallas y cantidades</h3>
        <p className="adm-help">Cuando una talla llega a 0 se muestra tachada. Si todas llegan a 0, la prenda sale como “Agotado”.</p>
        <div className="adm-presets">
          {Object.entries(PRESETS).map(([name, list]) => (
            <button key={name} type="button" onClick={() => addPreset(list)}>+ {name}</button>
          ))}
        </div>
        {f.sizes.map((s, i) => (
          <div key={i} className="adm-size">
            <input value={s.size} onChange={(e) => setSize(i, { size: e.target.value })} placeholder="Talla" aria-label="Talla" />
            <input type="number" min="0" value={s.stock} onChange={(e) => setSize(i, { stock: e.target.value })} placeholder="Cantidad" aria-label="Cantidad" />
            <button type="button" onClick={() => set({ sizes: f.sizes.filter((_, j) => j !== i) })}>Quitar</button>
          </div>
        ))}
        <button type="button" className="adm-small" onClick={() => set({ sizes: [...f.sizes, { size: '', stock: 0 }] })}>+ Otra talla</button>

        <h3>Estado</h3>
        <label className="adm-check"><input type="checkbox" checked={f.soldOut} onChange={(e) => set({ soldOut: e.target.checked })} /> Marcar como agotado (aunque queden tallas)</label>
        <label className="adm-check"><input type="checkbox" checked={f.active} onChange={(e) => set({ active: e.target.checked })} /> Visible en la tienda</label>

        {error && <p className="adm-error" role="alert">{error}</p>}
        <div className="adm-actions">
          <button type="submit" className="btn btn--light" disabled={saving}>{saving ? 'Guardando…' : 'Guardar'}</button>
          <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
