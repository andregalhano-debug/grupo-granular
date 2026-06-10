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
import { CategoryContext } from '../stores/CategoryContext'
import { categoryAccent, withAlpha } from '../data/categoryColors'

export function LandingPage() {
  const [category, setCategory] = useState<Category>('restaurantes')
  const { primary: accent, dark: accentDark } = categoryAccent[category]

  return (
    <CategoryContext.Provider value={{ accent, accentDark }}>
      <div
        className="min-h-screen bg-white"
        style={{
          '--accent': accent,
          '--accent-dark': accentDark,
          '--accent-05': withAlpha(accent, 5),
          '--accent-08': withAlpha(accent, 8),
          '--accent-10': withAlpha(accent, 10),
          '--accent-15': withAlpha(accent, 15),
          '--accent-20': withAlpha(accent, 20),
          '--accent-30': withAlpha(accent, 30),
          '--accent-40': withAlpha(accent, 40),
        } as React.CSSProperties}
      >
        <Header category={category} />
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
    </CategoryContext.Provider>
  )
}
