import { useState } from 'react'
import { useStore } from '../store/useStore'
import { backend } from '../store/backend'

const lines = (t) => t.split('\n').map((s) => s.trim()).filter(Boolean)

export default function SettingsTab({ say }) {
  const { settings, saveSettings, resetDemo } = useStore()
  const [f, setF] = useState({
    whatsapp: settings.whatsapp || '',
    instagram: settings.instagram || '',
    address: settings.address || '',
    maps: settings.maps || '',
    hours: (settings.hours || []).join('\n'),
    shipping: (settings.shipping || []).join('\n'),
    payments: (settings.payments || []).join('\n'),
  })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const whatsapp = f.whatsapp.replace(/\D/g, '')
    if (whatsapp.length < 10) return say('El WhatsApp debe llevar indicativo, por ejemplo 573001234567', true)
    try {
      await saveSettings({
        whatsapp,
        instagram: f.instagram.trim(),
        address: f.address.trim(),
        maps: f.maps.trim(),
        hours: lines(f.hours),
        shipping: lines(f.shipping),
        payments: lines(f.payments),
      })
      say('Datos de la tienda guardados')
    } catch (err) {
      say(err.message || 'No se pudo guardar', true)
    }
  }

  return (
    <form className="adm-form adm-form--page" onSubmit={submit}>
      <h3>Contacto</h3>
      <div className="adm-row">
        <label>WhatsApp (con indicativo, solo números)
          <input value={f.whatsapp} onChange={set('whatsapp')} inputMode="numeric" placeholder="573001234567" />
        </label>
        <label>Link de Instagram
          <input value={f.instagram} onChange={set('instagram')} placeholder="https://instagram.com/…" />
        </label>
      </div>

      <h3>Visítanos</h3>
      <label>Dirección del local
        <input value={f.address} onChange={set('address')} />
      </label>
      <label>Dirección para el mapa (tal como sale en Google Maps)
        <input value={f.maps} onChange={set('maps')} placeholder="Calle 10 #5-20, Ciudad, Colombia" />
      </label>
      <label>Horarios (uno por línea, formato “Días: horas”)
        <textarea rows="3" value={f.hours} onChange={set('hours')} />
      </label>

      <h3>Envíos y pagos</h3>
      <label>Envíos (uno por línea, “Título: detalle”)
        <textarea rows="4" value={f.shipping} onChange={set('shipping')} />
      </label>
      <label>Métodos de pago (uno por línea; para mostrar un dato escribe “Nequi: 300 123 4567”)
        <textarea rows="4" value={f.payments} onChange={set('payments')} />
      </label>

      <div className="adm-actions">
        <button type="submit" className="btn btn--light">Guardar cambios</button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={async () => {
            if (window.confirm(backend.kind === 'supabase' ? 'Esto carga las categorías base y reemplaza los datos de contacto de la tienda con los valores por defecto. ¿Seguro?' : 'Esto borra todo lo que cambiaste y vuelve a los datos de ejemplo. ¿Seguro?')) {
              await resetDemo()
              say('Datos de ejemplo restaurados')
            }
          }}
        >
          {backend.kind === 'supabase' ? 'Cargar categorías base' : 'Restaurar datos de ejemplo'}
        </button>
      </div>
    </form>
  )
}
