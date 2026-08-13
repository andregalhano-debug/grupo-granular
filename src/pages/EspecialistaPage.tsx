import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { EspecialistaSection } from '../components/EspecialistaSection'

export function EspecialistaPage() {
  return (
    <div className="min-h-screen bg-[#f0ede8] text-[#2c241f]">
      <title>Especialista sob demanda | Grupo Granular</title>
      <Header />
      <EspecialistaSection />
      <Footer />
    </div>
  )
}
