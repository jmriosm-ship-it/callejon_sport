// Precios, descuentos y existencias (una sola fuente de verdad para tienda y admin)

export const finalPrice = (p) => {
  const d = Math.min(95, Math.max(0, Number(p.discount) || 0))
  return d ? Math.round((p.price * (1 - d / 100)) / 100) * 100 : p.price
}

export const hasDiscount = (p) => (Number(p.discount) || 0) > 0 && p.price > 0

export const totalStock = (p) => p.sizes.reduce((n, s) => n + Math.max(0, Number(s.stock) || 0), 0)

// Agotada: marcada a mano, o tiene tallas y todas están en 0
export const isSoldOut = (p) => !!p.soldOut || (p.sizes.length > 0 && totalStock(p) === 0)

export const sizeStock = (p, size) => Math.max(0, Number(p.sizes.find((s) => s.size === size)?.stock) || 0)
