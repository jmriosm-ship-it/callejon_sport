// PRENDAS DE EJEMPLO. Reemplazar por las reales (nombre, precio, tallas y foto).
// Las fotos son recortes de la foto del local (`pos`) hasta que haya fotos de producto.
export const IS_SAMPLE = true

export const PRODUCT_CATEGORIES = [
  'Camisetas', 'Gorras', 'Jeans', 'Bermudas', 'Tenis', 'Sudaderas', 'Conjuntos', 'Accesorios', 'Deportivo',
]

const T = ['S', 'M', 'L', 'XL']
const JEAN = ['28', '30', '32', '34']

export const PRODUCTS = [
  { name: 'Camiseta oversize negra', category: 'Camisetas', price: 85000, sizes: ['M', 'L', 'XL'], pos: '81% 57%' },
  { name: 'Camiseta gráfica gris', category: 'Camisetas', price: 95000, sizes: T, pos: '70% 40%' },
  { name: 'Camiseta blanca básica', category: 'Camisetas', price: 75000, sizes: T, pos: '100% 82%' },
  { name: 'Camiseta negra Boss', category: 'Camisetas', price: 90000, sizes: ['M', 'L', 'XL'], pos: '60% 45%' },
  { name: 'Gorra negra', category: 'Gorras', price: 65000, sizes: ['Única'], pos: '3% 38%' },
  { name: 'Gorra blanca', category: 'Gorras', price: 65000, sizes: ['Única'], pos: '14% 36%' },
  { name: 'Jean recto negro', category: 'Jeans', price: 130000, sizes: JEAN, pos: '40% 88%' },
  { name: 'Jean azul claro', category: 'Jeans', price: 130000, sizes: JEAN, pos: '34% 82%' },
  { name: 'Bermuda jean', category: 'Bermudas', price: 95000, sizes: ['M', 'L', 'XL'], pos: '45% 80%' },
  { name: 'Bermuda cargo negra', category: 'Bermudas', price: 90000, sizes: ['M', 'L', 'XL'], pos: '52% 86%' },
  { name: 'Tenis blancos', category: 'Tenis', price: 220000, sizes: ['38', '39', '40', '41', '42', '43'], pos: '11% 91%' },
  { name: 'Buzo gris', category: 'Sudaderas', price: 120000, sizes: T, pos: '8% 70%' },
  { name: 'Buzo negro', category: 'Sudaderas', price: 120000, sizes: T, pos: '20% 66%' },
  { name: 'Conjunto negro (buzo + pantaloneta)', category: 'Conjuntos', price: 180000, sizes: T, pos: '81% 57%' },
  { name: 'Conjunto gris (buzo + pantaloneta)', category: 'Conjuntos', price: 180000, sizes: T, pos: '70% 40%' },
  { name: 'Correa negra', category: 'Accesorios', price: 45000, sizes: ['Única'], pos: '8% 28%' },
  { name: 'Pantaloneta deportiva', category: 'Deportivo', price: 70000, sizes: T, pos: '50% 70%' },
].map((p, i) => ({ ...p, id: `p${i + 1}` }))

export const byId = (id) => PRODUCTS.find((p) => p.id === id)
export const inCategory = (c) => (c === 'Todo' ? PRODUCTS : PRODUCTS.filter((p) => p.category === c))
export const money = (n) => `$ ${new Intl.NumberFormat('es-CO').format(n)}`
