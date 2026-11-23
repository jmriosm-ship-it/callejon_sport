// Datos base de la tienda: categorías y ajustes iniciales (sin prendas; esas se crean en el panel).
import { CATEGORY_PHOTOS, CONJUNTOS, HOURS, INSTAGRAM_URL, MAPS_QUERY, PAYMENTS, SHIPPING, WHATSAPP_NUMBER, ADDRESS, TIKTOK_URL, FACEBOOK_URL, EMAIL, LEGAL_NAME, LEGAL_ID } from '../data/config'

export const CONJUNTOS_CAT = 'Conjuntos'

export const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const ORDER = ['Camisetas', 'Gorras', 'Jeans', 'Bermudas', 'Tenis', 'Sudaderas', 'Accesorios', 'Deportivo', CONJUNTOS_CAT]

export function seed() {
  const categories = ORDER.map((name, i) => ({
    id: `c-${slug(name)}`,
    name,
    photo: '',
    pos: CATEGORY_PHOTOS[name] || CONJUNTOS[0].pos,
    sort: i,
    active: true,
  }))

  return {
    settings: {
      whatsapp: WHATSAPP_NUMBER,
      instagram: INSTAGRAM_URL,
      tiktok: TIKTOK_URL,
      facebook: FACEBOOK_URL,
      email: EMAIL,
      legalname: LEGAL_NAME,
      legalid: LEGAL_ID,
      address: ADDRESS,
      hours: HOURS,
      maps: MAPS_QUERY,
      shipping: SHIPPING,
      payments: PAYMENTS,
    },
    categories,
    products: [],
  }
}
