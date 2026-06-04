import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { SocialProof } from '../components/SocialProof'
import { Modules } from '../components/Modules'
import { Integrations } from '../components/Integrations'
import { Differentials } from '../components/Differentials'
import { Pricing } from '../components/Pricing'
import { Testimonials } from '../components/Testimonials'
import { CtaSection } from '../components/CtaSection'
import { Footer } from '../components/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <SocialProof />
      <Modules />
      <Integrations />
      <Differentials />
      <Pricing />
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  )
}
