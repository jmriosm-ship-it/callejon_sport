import { useState } from 'react'
import PhotoPicker from './PhotoPicker'
import { useStore } from '../store/useStore'
import { CONJUNTOS_CAT, slug } from '../store/seed'
import { catPhoto } from '../lib/photo'

function CategoryForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(initial)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const locked = f.name === CONJUNTOS_CAT && !!initial.id // Conjuntos tiene su propia sección

  const submit = async (e) => {
    e.preventDefault()
    if (!f.name.trim()) return setError('Escribe el nombre')
    setSaving(true)
    try {
      await onSave({ ...f, name: f.name.trim(), sort: parseInt(f.sort, 10) || 0 })
    } catch (err) {
      setError(err.message || 'No se pudo guardar')
      setSaving(false)
    }
  }

  return (
    <div className="adm-modal" role="dialog" aria-modal="true">
      <form className="adm-form" onSubmit={submit}>
        <header className="adm-form__head">
          <h2>{initial.id ? 'Editar categoría' : 'Nueva categoría'}</h2>
          <button type="button" className="adm-x" onClick={onCancel} aria-label="Cerrar">✕</button>
        </header>
        <label>Nombre
          <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} disabled={locked} required />
        </label>
        <label>Orden (el menor sale primero)
          <input type="number" value={f.sort} onChange={(e) => setF({ ...f, sort: e.target.value })} />
        </label>
        <h3>Foto de la categoría</h3>
        <p className="adm-help">Sale en el inicio, en “Compra por categoría”. Si no subes una, se usa una foto de ejemplo.</p>
        <PhotoPicker photos={f.photo ? [f.photo] : []} onChange={(p) => setF({ ...f, photo: p[0] || '' })} multiple={false} label="+ Foto" />
        <label className="adm-check"><input type="checkbox" checked={f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} /> Visible en la tienda</label>
        {error && <p className="adm-error" role="alert">{error}</p>}
        <div className="adm-actions">
          <button type="submit" className="btn btn--light" disabled={saving}>{saving ? 'Guardando…' : 'Guardar'}</button>
          <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default function CategoriesTab({ say }) {
  const { raw, saveCategory, removeCategory } = useStore()
  const [editing, setEditing] = useState(null)
  const cats = [...raw.categories].sort((a, b) => a.sort - b.sort)
  const count = (id) => raw.products.filter((p) => p.categoryId === id).length

  const run = async (fn, ok) => {
    try { await fn(); say(ok) } catch (e) { say(e.message || 'No se pudo', true) }
  }

  return (
    <>
      <div className="adm-bar">
        <p className="adm-help" style={{ margin: 0 }}>Las categorías salen en el menú y en el inicio de la tienda.</p>
        <button className="btn btn--light" onClick={() => setEditing({ id: '', name: '', photo: '', pos: '50% 50%', sort: cats.length, active: true })}>+ Nueva categoría</button>
      </div>
      <ul className="adm-list">
        {cats.map((c) => (
          <li key={c.id} className={`adm-item ${!c.active ? 'is-off' : ''}`}>
            <div className="adm-thumb" style={catPhoto(c)} />
            <div className="adm-item__main">
              <b>{c.name}</b>
              <small>{count(c.id)} prendas · orden {c.sort}</small>
              <span className="adm-badges">{!c.active && <em className="b-grey">Oculta</em>}</span>
            </div>
            <div className="adm-item__btns">
              <button onClick={() => setEditing(c)}>Editar</button>
              <button onClick={() => run(() => saveCategory({ ...c, active: !c.active }), c.active ? 'Categoría oculta' : 'Categoría visible')}>{c.active ? 'Ocultar' : 'Mostrar'}</button>
              {c.name !== CONJUNTOS_CAT && (
                <button className="is-danger" onClick={() => window.confirm(`¿Eliminar la categoría "${c.name}"?`) && run(() => removeCategory(c.id), 'Categoría eliminada')}>Eliminar</button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {editing && (
        <CategoryForm
          key={editing.id || 'new'}
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={async (c) => {
            await saveCategory({ ...c, id: c.id || `c-${slug(c.name)}-${Date.now().toString(36).slice(-3)}` })
            setEditing(null)
            say('Categoría guardada')
          }}
        />
      )}
    </>
  )
}
