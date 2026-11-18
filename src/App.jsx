import useReveal from './hooks/useReveal'
import { BagProvider } from './hooks/BagProvider'
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

import Lab from './lab/Lab'

export default function App() {
  useReveal()

  const lab = new URLSearchParams(window.location.search).get('lab')
  if (lab) return <Lab v={lab} />

  return (
    <BagProvider>
      <a className="skip" href="#coleccion">Saltar al contenido</a>
      <Navbar />
      <main>
        <Hero />
        <Tapes />
        <Categories />
        <Conjuntos />
        <Brand />
        <HowToBuy />
        <ShippingPayments />
        <Visit />
      </main>
      <Footer />
      <WhatsAppButton />
      <BagDrawer />
    </BagProvider>
  )
}
