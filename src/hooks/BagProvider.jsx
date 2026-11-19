import { useEffect, useMemo, useState } from 'react'
import { BagContext } from './bagContext'

const KEY = 'callejon-bag'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function BagProvider({ children }) {
  const [items, setItems] = useState(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* sin almacenamiento: la bolsa funciona igual en memoria */
    }
  }, [items])

  const value = useMemo(
    () => ({
      items,
      open,
      count: items.reduce((n, i) => n + i.qty, 0),
      openBag: () => setOpen(true),
      closeBag: () => setOpen(false),
      // max = unidades disponibles de esa talla (sin tope si no se indica)
      add: (name, price, max = Infinity) => {
        setItems((prev) =>
          prev.some((i) => i.name === name)
            ? prev.map((i) => (i.name === name ? { ...i, max, qty: Math.min(i.qty + 1, max) } : i))
            : [...prev, { name, qty: 1, price, max }],
        )
        setOpen(true)
      },
      setQty: (name, qty) =>
        setItems((prev) =>
          qty < 1
            ? prev.filter((i) => i.name !== name)
            : prev.map((i) => (i.name === name ? { ...i, qty: Math.min(qty, i.max ?? Infinity) } : i)),
        ),
      clear: () => setItems([]),
    }),
    [items, open],
  )

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}

