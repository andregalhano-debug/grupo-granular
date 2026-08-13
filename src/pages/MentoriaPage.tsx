import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { MentoriaSection } from '../components/MentoriaSection'

export function MentoriaPage() {
  return (
    <div className="min-h-screen bg-[#f0ede8] text-[#2c241f]">
      <title>Comunidade Mentores | Grupo Granular</title>
      <Header />
      <MentoriaSection />
      <Footer />
    </div>
  )
}
