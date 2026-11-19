// Datos editables de la tienda. Cambiá todo desde acá.

// TODO: reemplazar con los datos reales
export const WHATSAPP_NUMBER = '573000000000'
export const INSTAGRAM_URL = 'https://instagram.com/callej0n_store'
export const ADDRESS = 'Dirección del local (por confirmar)'
export const HOURS = ['Lunes a sábado: por confirmar', 'Domingos: por confirmar']

export const wa = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

export const NAV_LINKS = [
  ['coleccion', 'Colección'],
  ['conjuntos', 'Conjuntos'],
  ['marca', 'La marca'],
  ['comprar', 'Cómo comprar'],
  ['visitanos', 'Visítanos'],
]

export const MARQUEE = [
  'Ropa con estilo',
  'Envíos a toda Colombia',
  'Pedidos por WhatsApp',
  'Nueva colección',
]

export const CATEGORIES = [
  'Camisetas',
  'Gorras',
  'Jeans',
  'Bermudas',
  'Tenis',
  'Sudaderas',
  'Accesorios',
  'Deportivo',
]

// TODO: reemplazar por los conjuntos reales (nombre, precio y una foto del conjunto completo).
// Por ahora la foto es un recorte de la foto del local (pos = posición del recorte).
export const CONJUNTOS = [
  { title: 'Conjunto 01', price: 180000, pos: '81% 57%' },
  { title: 'Conjunto 02', price: 180000, pos: '70% 40%' },
  { title: 'Conjunto 03', price: 180000, pos: '3% 38%' },
  { title: 'Conjunto 04', price: 180000, pos: '50% 55%' },
]

export const STEPS = [
  ['01', 'Eliges tu prenda', 'Mira lo nuevo en nuestro Instagram o visítanos en el local.'],
  ['02', 'Nos escribes', 'Por WhatsApp te confirmamos tallas, colores y disponibilidad.'],
  ['03', 'Pagas y la recibes', 'Pagas por el método que prefieras y te la enviamos.'],
]

export const SHIPPING = [
  'Transportadora: a elección del cliente',
  'Tiempo de entrega: según la transportadora',
  'Costo del envío: según la ubicación',
]

// TODO: confirmar métodos de pago reales
export const PAYMENTS = [
  'Nequi: por confirmar',
  'Daviplata: por confirmar',
  'Transferencia bancaria: por confirmar',
  'Pago contra entrega (por confirmar)',
]

// Recorte de la foto del local que representa cada categoría (placeholder hasta tener fotos por categoría)
export const CATEGORY_PHOTOS = {
  Camisetas: '81% 57%',
  Gorras: '3% 38%',
  Jeans: '40% 88%',
  Bermudas: '100% 82%',
  Tenis: '11% 91%',
  Sudaderas: '70% 40%',
  Accesorios: '8% 28%',
  Deportivo: '50% 70%',
}

// Conversación de ejemplo para la sección "Cómo comprar" (de: 'cliente' o 'tienda')
export const CHAT = [
  { de: 'cliente', texto: 'Hola, quiero el Conjunto 01' },
  { de: 'tienda', texto: '¡Hola! Claro. ¿Qué talla necesitás?' },
  { de: 'cliente', texto: 'Talla M' },
  { de: 'tienda', texto: 'Disponible. Te paso los datos de pago y lo enviamos a tu ciudad.' },
  { de: 'cliente', texto: 'Listo, ya pagué' },
]

// TODO: poné acá la dirección tal como aparece en Google Maps (ej: "Calle 10 #5-20, Ciudad, Colombia").
// Mientras esté vacío, la sección Visítanos muestra un mapa de ejemplo.
export const MAPS_QUERY = ''
