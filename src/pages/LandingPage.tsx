import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { SocialProof } from '../components/SocialProof'
import { Modules } from '../components/Modules'
import { Integrations } from '../components/Integrations'
import { Pricing } from '../components/Pricing'
import { Testimonials } from '../components/Testimonials'
import { Faq } from '../components/Faq'
import { CtaSection } from '../components/CtaSection'
import { Footer } from '../components/Footer'
import { MondaySection } from '../components/home/MondaySection'
import { HomeGranuSection } from '../components/home/HomeGranuSection'
import { GanhosSection } from '../components/home/GanhosSection'
import { PessoasSection } from '../components/home/PessoasSection'
import { ContactSection } from '../components/home/ContactSection'
import { SecuritySection } from '../components/home/SecuritySection'
import { CategoryContext } from '../stores/CategoryContext'
import { categoryAccent, withAlpha } from '../data/categoryColors'
import { SEGMENTO_TO_PATH } from '../data/categories'

export function LandingPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { primary: accent, dark: accentDark } = categoryAccent.restaurantes

  useEffect(() => {
    const s = (params.get('segmento') || '').toLowerCase()
    if (s && SEGMENTO_TO_PATH[s]) {
      navigate(SEGMENTO_TO_PATH[s], { replace: true })
    }
  }, [params, navigate])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', accent)
    root.style.setProperty('--accent-dark', accentDark)
    root.style.setProperty('--accent-05', withAlpha(accent, 5))
    root.style.setProperty('--accent-08', withAlpha(accent, 8))
    root.style.setProperty('--accent-10', withAlpha(accent, 10))
    root.style.setProperty('--accent-15', withAlpha(accent, 15))
    root.style.setProperty('--accent-20', withAlpha(accent, 20))
    root.style.setProperty('--accent-30', withAlpha(accent, 30))
    root.style.setProperty('--accent-40', withAlpha(accent, 40))
  }, [accent, accentDark])

  return (
    <CategoryContext.Provider value={{ accent, accentDark }}>
      <div className="min-h-screen bg-[#f0ede8] text-[#2c241f]">
        <Header category="restaurantes" />
        <Hero />
        <MondaySection />
        <HomeGranuSection />
        <GanhosSection />
        <PessoasSection />
        <Modules category="restaurantes" />
        <Integrations />
        <Pricing category="restaurantes" />
        <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)] pb-4">
          <SecuritySection />
        </div>
        <SocialProof category="restaurantes" />
        <Testimonials />
        <Faq category="restaurantes" />
        <CtaSection category="restaurantes" />
        <ContactSection />
        <Footer />
      </div>
    </CategoryContext.Provider>
  )
}
