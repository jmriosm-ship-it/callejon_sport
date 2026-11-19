// Elige dónde viven los datos de la tienda:
// con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY (archivo .env) usa Supabase; si no, la demo en el navegador.
import { localBackend } from './localBackend'

const useSupabase = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

// El código de Supabase solo se descarga cuando se usa
const real = useSupabase ? import('./supabaseBackend').then((m) => m.supabaseBackend) : null

const call = (name) => async (...args) => (await real)[name](...args)

export const backend = useSupabase
  ? {
      kind: 'supabase',
      load: call('load'),
      saveProduct: call('saveProduct'),
      removeProduct: call('removeProduct'),
      saveCategory: call('saveCategory'),
      removeCategory: call('removeCategory'),
      saveSettings: call('saveSettings'),
      resetDemo: call('resetDemo'),
      uploadImage: call('uploadImage'),
      isAdmin: call('isAdmin'),
      login: call('login'),
      logout: call('logout'),
    }
  : localBackend
