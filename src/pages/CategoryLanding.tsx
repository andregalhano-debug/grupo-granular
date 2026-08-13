import { useEffect, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Testimonials } from '../components/Testimonials'
import { Faq } from '../components/Faq'
import { Modules } from '../components/Modules'
import { Pricing } from '../components/Pricing'
import { ContactSection } from '../components/home/ContactSection'
import { CategoryContext } from '../stores/CategoryContext'
import { categoryAccent, withAlpha } from '../data/categoryColors'
import type { Category } from '../components/Modules'

export type CategoryHighlight = {
  icon: ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  title: string
  desc: string
}

export type CategoryPageConfig = {
  category: Category
  title: string
  kicker: string
  headline: string
  headlineAccent: string
  subtitle: string
  modulesTitle: string
  modulesSubtitle: string
  highlights: CategoryHighlight[]
  benefitsTitle: string
  benefitsLead: string
  benefits: string[]
  ctaTitle: string
  ctaSubtitle: string
}

export function CategoryLanding({ config }: { config: CategoryPageConfig }) {
  const { primary: accent, dark: accentDark } = categoryAccent[config.category]

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
        <title>{config.title}</title>
        <Header category={config.category} />

        <section className="pt-16 sm:pt-24 pb-16 px-[clamp(18px,4vw,44px)] bg-[#241d1a]">
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="text-[11.5px] tracking-[.24em] uppercase text-[#c9a27a] mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {config.kicker}
            </p>
            <h1 className="text-[clamp(36px,5.4vw,68px)] font-semibold tracking-[-.035em] leading-[1.02] text-[#f0ede8] mb-6 text-balance">
              {config.headline}{' '}
              <span className="text-[#ecd9cd]">{config.headlineAccent}</span>
            </h1>
            <p className="text-[clamp(16px,1.6vw,20px)] text-[#bdb0a4] max-w-2xl mx-auto leading-relaxed mb-10">
              {config.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                to="/agendar-demo"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-[#f0ede8] hover:bg-white text-[#241d1a] font-medium px-8 min-h-[52px] rounded-full text-base transition-colors"
              >
                Falar com a gente
              </Link>
              <a
                href="#modulos"
                className="inline-flex items-center justify-center w-full sm:w-auto border border-white/20 hover:border-white/40 text-[#f0ede8] font-medium px-8 min-h-[52px] rounded-full text-base transition-colors"
              >
                Ver funcionalidades
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 px-[clamp(18px,4vw,44px)] bg-[#f0ede8]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-.03em] text-[#2c241f] mb-4">
                {config.modulesTitle}
              </h2>
              <p className="text-[#5f5248] text-base max-w-2xl mx-auto">{config.modulesSubtitle}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="bg-[#faf9f7] rounded-2xl p-6 border border-[#e4ddd2]"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${accent}18` }}
                    >
                      <Icon size={24} style={{ color: accent }} />
                    </div>
                    <h3 className="text-base font-semibold text-[#2c241f] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#5f5248] leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-[clamp(18px,4vw,44px)] bg-[#e9e4da]">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[clamp(28px,3.6vw,40px)] font-semibold tracking-[-.03em] text-[#2c241f] mb-4">
                  {config.benefitsTitle}
                </h2>
                <p className="text-[#5f5248] text-base mb-6 leading-relaxed">{config.benefitsLead}</p>
                <Link
                  to="/agendar-demo"
                  className="inline-flex items-center justify-center w-full sm:w-auto text-[#f7f2ee] font-medium px-6 min-h-12 rounded-full text-sm transition-colors"
                  style={{ backgroundColor: accent }}
                >
                  Falar com a gente
                </Link>
              </div>
              <ul className="space-y-3">
                {config.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" style={{ color: accent }} />
                    <span className="text-sm text-[#2c241f]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Modules category={config.category} />
        <Pricing category={config.category} />
        <Testimonials />
        <Faq category={config.category} />
        <ContactSection />
        <Footer />
      </div>
    </CategoryContext.Provider>
  )
}
