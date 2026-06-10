import { useState } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { SocialProof } from '../components/SocialProof'
import { CategorySelector } from '../components/CategorySelector'
import { Modules } from '../components/Modules'
import type { Category } from '../components/Modules'
import { Integrations } from '../components/Integrations'
import { Differentials } from '../components/Differentials'
import { Pricing } from '../components/Pricing'
import { Testimonials } from '../components/Testimonials'
import { Faq } from '../components/Faq'
import { CtaSection } from '../components/CtaSection'
import { Footer } from '../components/Footer'

type MercadoSub = 'atacarejo' | 'supermercado' | 'atacado'

export function LandingPage() {
  const [category, setCategory] = useState<Category>('restaurantes')
  const [mercadoSub, setMercadoSub] = useState<MercadoSub>('supermercado')

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <SocialProof />
      <CategorySelector
        category={category}
        setCategory={setCategory}
        mercadoSub={mercadoSub}
        setMercadoSub={setMercadoSub}
      />
      <Modules category={category} />
      <Integrations />
      <Differentials />
      <Pricing />
      <Testimonials />
      <Faq />
      <CtaSection />
      <Footer />
    </div>
  )
}
