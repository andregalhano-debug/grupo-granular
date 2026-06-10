import { useState } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { SocialProof } from '../components/SocialProof'
import { Modules } from '../components/Modules'
import type { Category } from '../components/Modules'
import { Integrations } from '../components/Integrations'
import { Differentials } from '../components/Differentials'
import { Pricing } from '../components/Pricing'
import { Testimonials } from '../components/Testimonials'
import { Faq } from '../components/Faq'
import { CtaSection } from '../components/CtaSection'
import { Footer } from '../components/Footer'

export function LandingPage() {
  const [category, setCategory] = useState<Category>('restaurantes')

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero category={category} setCategory={setCategory} />
      <SocialProof />
      <Modules category={category} />
      <Integrations />
      <Differentials />
      <Pricing category={category} />
      <Testimonials />
      <Faq />
      <CtaSection />
      <Footer />
    </div>
  )
}
