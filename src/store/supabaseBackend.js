// Backend real: Supabase (base de datos + fotos + ingreso de administradores)
import { createClient } from '@supabase/supabase-js'
import { seed } from './seed'

const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
const BUCKET = 'productos'

const fail = (error, fallback) => {
  if (error) throw new Error(error.message || fallback)
}

const toProduct = (r) => ({
  id: r.id,
  name: r.name,
  desc: r.descr,
  categoryId: r.category_id,
  price: r.price,
  discount: r.discount,
  tag: r.tag,
  photos: r.photos || [],
  pos: '50% 50%',
  sizes: [...(r.product_sizes || [])].sort((a, b) => a.sort - b.sort).map((s) => ({ size: s.size, stock: s.stock })),
  soldOut: r.sold_out,
  active: r.active,
})

const fromProduct = (p) => ({
  id: p.id,
  name: p.name,
  descr: p.desc || '',
  category_id: p.categoryId || null,
  price: p.price,
  discount: p.discount || 0,
  tag: p.tag || '',
  photos: p.photos || [],
  sold_out: !!p.soldOut,
  active: p.active !== false,
})

async function load() {
  const [s, c, p] = await Promise.all([
    client.from('settings').select('*').eq('id', 1).maybeSingle(),
    client.from('categories').select('*').order('sort'),
    client.from('products').select('*, product_sizes(*)').order('created_at', { ascending: false }),
  ])
  fail(s.error); fail(c.error); fail(p.error)
  const settings = { ...s.data }
  delete settings.id
  return { settings, categories: c.data, products: p.data.map(toProduct) }
}

async function writeProduct(p) {
  const { error } = await client.from('products').upsert(fromProduct(p))
  fail(error, 'No se pudo guardar la prenda')
  const del = await client.from('product_sizes').delete().eq('product_id', p.id)
  fail(del.error)
  if (p.sizes.length) {
    const ins = await client.from('product_sizes').insert(p.sizes.map((s, i) => ({ product_id: p.id, size: s.size, stock: s.stock, sort: i })))
    fail(ins.error, 'No se pudieron guardar las tallas')
  }
}

export const supabaseBackend = {
  kind: 'supabase',
  load,
  async saveProduct(p) {
    await writeProduct(p)
    return load()
  },
  async removeProduct(id) {
    fail((await client.from('products').delete().eq('id', id)).error)
    return load()
  },
  async saveCategory(c) {
    fail((await client.from('categories').upsert({ id: c.id, name: c.name, photo: c.photo || '', pos: c.pos || '50% 50%', sort: c.sort || 0, active: c.active !== false })).error)
    return load()
  },
  async removeCategory(id) {
    const { error } = await client.from('categories').delete().eq('id', id)
    if (error) throw new Error('Esa categoría tiene prendas. Muévelas o elimínalas primero.')
    return load()
  },
  async saveSettings(s) {
    fail((await client.from('settings').update(s).eq('id', 1)).error)
    return load()
  },
  // Carga los datos de ejemplo en la base (no borra lo que ya hay)
  async resetDemo() {
    const d = seed()
    fail((await client.from('settings').update(d.settings).eq('id', 1)).error)
    fail((await client.from('categories').upsert(d.categories.map(({ id, name, photo, pos, sort, active }) => ({ id, name, photo, pos, sort, active })))).error)
    for (const p of d.products) await writeProduct(p)
    return load()
  },
  async uploadImage(dataUrl) {
    const blob = await (await fetch(dataUrl)).blob()
    const path = `${crypto.randomUUID()}.jpg`
    const { error } = await client.storage.from(BUCKET).upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' })
    fail(error, 'No se pudo subir la foto')
    return client.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
  },
  async isAdmin() {
    const { data } = await client.auth.getSession()
    const email = data.session?.user?.email
    if (!email) return false
    const { data: row } = await client.from('admins').select('email').eq('email', email).maybeSingle()
    return !!row
  },
  async login(password, email) {
    const { error } = await client.auth.signInWithPassword({ email: (email || '').trim(), password })
    if (error) throw new Error('Correo o contraseña incorrectos')
    if (!(await this.isAdmin())) {
      await client.auth.signOut()
      throw new Error('Ese usuario no tiene permiso de administrador')
    }
  },
  async logout() {
    await client.auth.signOut()
  },
}
