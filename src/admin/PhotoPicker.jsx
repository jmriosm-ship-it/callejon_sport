import { useState } from 'react'
import { shrinkImage } from '../lib/image'
import { backend } from '../store/backend'

// Sube fotos: la primera es la principal. `multiple={false}` deja una sola (portada de categoría)
export default function PhotoPicker({ photos, onChange, multiple = true, label = '+ Foto' }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const pick = async (e) => {
    const files = [...e.target.files]
    e.target.value = ''
    if (!files.length) return
    setBusy(true)
    setError('')
    try {
      const urls = []
      for (const f of multiple ? files : files.slice(0, 1)) urls.push(await backend.uploadImage(await shrinkImage(f)))
      onChange(multiple ? [...photos, ...urls] : urls)
    } catch (err) {
      setError(err.message || 'No se pudo subir la foto')
    }
    setBusy(false)
  }

  return (
    <div className="adm-photos">
      {photos.map((u, i) => (
        <div key={u.slice(-30) + i} className="adm-photo">
          <img src={u} alt="" />
          {multiple && i === 0 && <span className="adm-photo__main">Principal</span>}
          <div className="adm-photo__bar">
            {multiple && i > 0 && (
              <button type="button" onClick={() => onChange([u, ...photos.filter((_, j) => j !== i)])}>Principal</button>
            )}
            <button type="button" onClick={() => onChange(photos.filter((_, j) => j !== i))}>Quitar</button>
          </div>
        </div>
      ))}
      {(multiple || photos.length === 0) && (
        <label className="adm-photo adm-photo--add">
          <input type="file" accept="image/*" multiple={multiple} onChange={pick} disabled={busy} hidden />
          {busy ? 'Subiendo…' : label}
        </label>
      )}
      {error && <p className="adm-error">{error}</p>}
    </div>
  )
}
