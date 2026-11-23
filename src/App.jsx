import { lazy, Suspense, useEffect } from 'react'
import useReveal from './hooks/useReveal'
import useRoute from './hooks/useRoute'
import { BagProvider } from './hooks/BagProvider'
import { StoreProvider } from './store/StoreProvider'
import { useStore } from './store/useStore'
import BagDrawer from './components/BagDrawer'
import Tapes from './components/Tapes'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Conjuntos from './components/Conjuntos'
import Brand from './components/Brand'
import HowToBuy from './components/HowToBuy'
import ShippingPayments from './components/ShippingPayments'
import Visit from './components/Visit'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Catalog from './components/Catalog'
import ProductPage from './components/ProductPage'
import CartPage from './components/CartPage'
import Legal from './components/Legal'

// Pruebas de diseño (solo con ?lab=...), cargadas aparte para no pesar en la página
const Lab = lazy(() => import('./lab/Lab'))
// Panel de administración (solo se descarga al entrar a #/admin)
const Admin = lazy(() => import('./admin/Admin'))

function Home() {
  return (
    <>
      <Hero />
      <Tapes />
      <Categories />
      <Conjuntos />
      <Brand />
      <HowToBuy />
      <ShippingPayments />
      <Visit />
    </>
  )
}

function Shell() {
  const route = useRoute()
  const { ready } = useStore()
  useReveal(`${route.name}:${route.param}:${ready}`)

  useEffect(() => {
    const h = window.location.hash
    if (route.name === 'home' && h.length > 1) {
      requestAnimationFrame(() => document.getElementById(h.slice(1))?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [route])

  if (route.name === 'admin') return <Suspense fallback={null}><Admin /></Suspense>

  return (
    <BagProvider>
      <a className="skip" href="#coleccion">Saltar al contenido</a>
      <Navbar solid={route.name !== 'home'} />
      <main>
        {route.name === 'categoria' && <Catalog category={route.param} />}
        {route.name === 'producto' && <ProductPage key={route.param} id={route.param} />}
        {route.name === 'carrito' && <CartPage />}
        {route.name === 'politicas' && <Legal slug={route.param} />}
        {route.name === 'home' && <Home />}
      </main>
      <Footer />
      <WhatsAppButton />
      <BagDrawer />
    </BagProvider>
  )
}

export default function App() {
  const lab = new URLSearchParams(window.location.search).get('lab')
  if (lab) return <Suspense fallback={null}><Lab v={lab} /></Suspense>

  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
