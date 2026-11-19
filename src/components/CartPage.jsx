import { useState } from 'react'
import { money } from '../data/products'
import { useBag } from '../hooks/useBag'
import { useStore } from '../store/useStore'

const EMPTY = {
  name: '', phone: '', country: 'Colombia', state: '', city: '',
  address: '', reference: '', payment: '', notes: '', accept: false,
}

const validate = (f) => {
  const e = {}
  if (f.name.trim().length < 3) e.name = 'Escribe tu nombre y apellido.'
  const digits = f.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) e.phone = 'Escribe un celular válido.'
  if (!f.country.trim()) e.country = 'Escribe tu país.'
  if (!f.state.trim()) e.state = 'Escribe tu departamento.'
  if (!f.city.trim()) e.city = 'Escribe tu ciudad o municipio.'
  if (f.address.trim().length < 5) e.address = 'Escribe tu dirección completa.'
  if (!f.payment) e.payment = 'Elige un método de pago.'
  if (!f.accept) e.accept = 'Debes aceptar para continuar.'
  return e
}

const buildMessage = (items, f, total) =>
  [
    '*Nuevo pedido - Callejón Store* 🛍️',
    '',
    '*Prendas*',
    items.map((i, n) => `${n + 1}. ${i.name} | Cant. ${i.qty}${i.price ? ` - ${money(i.price * i.qty)}` : ''}`).join('\n'),
    '',
    `*Total:* ${total ? money(total) : 'por confirmar'}`,
    '',
    '*Datos de entrega*',
    `Nombre: ${f.name.trim()}`,
    `Celular: ${f.phone.trim()}`,
    `País: ${f.country.trim()}`,
    `Departamento: ${f.state.trim()}`,
    `Ciudad: ${f.city.trim()}`,
    `Dirección: ${f.address.trim()}`,
    f.reference.trim() ? `Barrio / referencia: ${f.reference.trim()}` : null,
    `Método de pago: ${f.payment}`,
    f.notes.trim() ? `Notas: ${f.notes.trim()}` : null,
  ]
    .filter((l) => l !== null)
    .join('\n')

function Field({ id, label, error, optional, children }) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>{label}{optional && <span className="field__opt"> (opcional)</span>}</label>
      {children}
      {error && <p className="field__error" role="alert">{error}</p>}
    </div>
  )
}

export default function CartPage() {
  const { items, setQty, clear } = useBag()
  const { wa, settings } = useStore()
  const [form, setForm] = useState(EMPTY)
  const [tried, setTried] = useState(false)
  const [sentUrl, setSentUrl] = useState('')

  const total = items.reduce((n, i) => n + (i.price || 0) * i.qty, 0)
  const units = items.reduce((n, i) => n + i.qty, 0)
  const errors = validate(form)
  const shown = (k) => (tried ? errors[k] : undefined)
  const bind = (k) => ({
    id: `f-${k}`,
    value: form[k],
    onChange: (e) => setForm({ ...form, [k]: e.target.value }),
    'aria-invalid': shown(k) ? 'true' : undefined,
  })

  const submit = (e) => {
    e.preventDefault()
    setTried(true)
    const first = Object.keys(errors)[0]
    if (first) return document.getElementById(`f-${first}`)?.focus()
    const url = wa(buildMessage(items, form, total))
    setSentUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (items.length === 0) {
    return (
      <section className="page cart">
        <div className="wrap cart-empty">
          <h1 className="catalog__title">Tu bolsa está vacía</h1>
          <p>Mira la colección y elige las prendas que más te gusten.</p>
          <a className="btn btn--light" href="#coleccion">Ver colección</a>
        </div>
      </section>
    )
  }

  return (
    <section className="page cart">
      <div className="wrap">
        <a className="page__back" href="#coleccion">← Seguir comprando</a>
        <h1 className="catalog__title">Tu bolsa</h1>
        <p className="catalog__count">{units} {units === 1 ? 'prenda' : 'prendas'}</p>

        <div className="cart__layout">
          <div className="cart__main">
            <ul className="cart__items">
              {items.map((i) => (
                <li key={i.name} className="cart-item">
                  <div>
                    <b>{i.name}</b>
                    <small>{i.price ? money(i.price) : 'Precio por confirmar'}</small>
                  </div>
                  <div className="bag__qty">
                    <button onClick={() => setQty(i.name, i.qty - 1)} aria-label={`Quitar una ${i.name}`}>−</button>
                    <b>{i.qty}</b>
                    <button onClick={() => setQty(i.name, i.qty + 1)} disabled={i.qty >= (i.max ?? Infinity)} aria-label={`Agregar una ${i.name}`}>+</button>
                  </div>
                  <p className="cart-item__total">{i.price ? money(i.price * i.qty) : ''}</p>
                  <button className="cart-item__remove" onClick={() => setQty(i.name, 0)}>Quitar</button>
                </li>
              ))}
            </ul>

            <form id="checkout-form" className="checkout" onSubmit={submit} noValidate>
              <h2>Datos de entrega</h2>
              <p className="checkout__lead">Con esto armamos tu pedido y te lo enviamos por WhatsApp.</p>
              <div className="checkout__grid">
                <Field id="f-name" label="Nombre y apellido" error={shown('name')}>
                  <input type="text" autoComplete="name" {...bind('name')} />
                </Field>
                <Field id="f-phone" label="Celular" error={shown('phone')}>
                  <input type="tel" inputMode="tel" autoComplete="tel" placeholder="300 123 4567" {...bind('phone')} />
                </Field>
                <Field id="f-country" label="País" error={shown('country')}>
                  <input type="text" autoComplete="country-name" {...bind('country')} />
                </Field>
                <Field id="f-state" label="Departamento" error={shown('state')}>
                  <input type="text" autoComplete="address-level1" {...bind('state')} />
                </Field>
                <Field id="f-city" label="Ciudad / municipio" error={shown('city')}>
                  <input type="text" autoComplete="address-level2" {...bind('city')} />
                </Field>
                <div className="checkout__full">
                  <fieldset className={`pay ${shown('payment') ? 'field--error' : ''}`}>
                    <legend>Método de pago</legend>
                    {(settings.payments || []).map((m, n) => {
                      const i = m.indexOf(':')
                      const name = i === -1 ? m : m.slice(0, i).trim()
                      const detail = i === -1 ? '' : m.slice(i + 1).trim()
                      return (
                        <label key={m} className={`pay__opt ${form.payment === name ? 'is-on' : ''}`}>
                          <input type="radio" name="payment" id={n === 0 ? 'f-payment' : undefined} checked={form.payment === name} onChange={() => setForm({ ...form, payment: name })} />
                          <span><b>{name}</b>{detail && <small>{detail}</small>}</span>
                        </label>
                      )
                    })}
                    {shown('payment') && <p className="field__error" role="alert">{shown('payment')}</p>}
                  </fieldset>
                </div>
                <div className="checkout__full">
                  <Field id="f-address" label="Dirección" error={shown('address')}>
                    <input type="text" autoComplete="street-address" placeholder="Calle, número, apto…" {...bind('address')} />
                  </Field>
                </div>
                <div className="checkout__full">
                  <Field id="f-reference" label="Barrio / punto de referencia" optional>
                    <input type="text" {...bind('reference')} />
                  </Field>
                </div>
                <div className="checkout__full">
                  <Field id="f-notes" label="Notas del pedido" optional>
                    <textarea rows="3" maxLength={300} {...bind('notes')} />
                  </Field>
                </div>
                <div className="checkout__full">
                  <div className={`field field--check ${shown('accept') ? 'field--error' : ''}`}>
                    <label>
                      <input
                        type="checkbox"
                        id="f-accept"
                        checked={form.accept}
                        onChange={(e) => setForm({ ...form, accept: e.target.checked })}
                        aria-invalid={shown('accept') ? 'true' : undefined}
                      />
                      <span>Autorizo el uso de mis datos para gestionar este pedido y acepto los términos y la política de privacidad.</span>
                    </label>
                    {shown('accept') && <p className="field__error" role="alert">{shown('accept')}</p>}
                  </div>
                </div>
              </div>
            </form>
          </div>

          <aside className="summary">
            <h2>Resumen</h2>
            <dl>
              <div><dt>Prendas</dt><dd>{units}</dd></div>
              <div><dt>Subtotal</dt><dd>{total ? money(total) : 'Por confirmar'}</dd></div>
              <div><dt>Envío</dt><dd>A convenir</dd></div>
            </dl>
            <p className="summary__total"><span>Total</span><strong>{total ? money(total) : 'Por confirmar'}</strong></p>
            <button type="submit" form="checkout-form" className="btn btn--light">Pedir por WhatsApp</button>
            <p className="summary__note">Se abrirá WhatsApp con tu pedido listo. No pagas nada en esta página: confirmamos disponibilidad, envío y pago por mensaje.</p>
            {sentUrl && (
              <p className="summary__sent" role="status">
                ✓ Pedido preparado. Si WhatsApp no se abrió, <a href={sentUrl} target="_blank" rel="noreferrer">toca aquí</a>.
              </p>
            )}
            <button type="button" className="summary__clear" onClick={clear}>Vaciar bolsa</button>
          </aside>
        </div>
      </div>
    </section>
  )
}
