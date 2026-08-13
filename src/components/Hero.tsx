import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { GranuGrain } from './granu/GranuGrain'
import { useT } from '../i18n/useT'
import { CATEGORY_LINKS } from '../data/categories'
import type { Category } from './Modules'

interface Props {
  category?: Category
  setCategory?: (c: Category) => void
}

export const categoryAccent: Record<Category, { primary: string; light: string; border: string }> = {
  restaurantes: { primary: '#7c2d3e', light: '#7c2d3e/10', border: '#7c2d3e/20' },
  mercados:     { primary: '#0A4D68', light: '#0A4D68/10', border: '#0A4D68/20' },
  farmacias:    { primary: '#1B6B3A', light: '#1B6B3A/10', border: '#1B6B3A/20' },
  petshop:      { primary: '#8B4513', light: '#8B4513/10', border: '#8B4513/20' },
  shopping:     { primary: '#6B3F1F', light: '#6B3F1F/10', border: '#6B3F1F/20' },
}

const METRICS = [
  { v: '+80', l: 'IDs em produção', accent: true },
  { v: '14+', l: 'módulos integrados' },
  { v: '~140', l: 'ferramentas de IA' },
  { v: '24/7', l: 'monitores vigiando' },
]

export function Hero(_props: Props) {
  const t = useT()

  return (
    <section id="hero" className="px-[clamp(18px,4vw,44px)] pt-[clamp(48px,7vw,96px)] pb-[clamp(28px,4vw,52px)]">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-[clamp(24px,4vw,56px)] items-center">
        <FadeIn>
          <p
            className="text-[11.5px] tracking-[.24em] uppercase text-[#7c2d3e]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Granular · Digital as a Service
          </p>
          <h1 className="mt-[18px] text-[clamp(42px,6.6vw,86px)] leading-[.98] tracking-[-.035em] font-semibold text-[#2c241f] text-balance">
            {t.hero.headline}
            <br />
            {t.hero.headlineAccent}
          </h1>
          <p className="mt-[22px] text-[clamp(17px,1.6vw,21px)] leading-relaxed text-[#5f5248] max-w-[46ch] text-pretty">
            {t.hero.subtitle}{' '}
            <strong className="text-[#2c241f] font-semibold">{t.hero.granuName}</strong>
            {t.hero.subtitleAfter}
          </p>
          <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#8a7a6e] max-w-[46ch]">
            {t.hero.categoriesLead}{' '}
            {CATEGORY_LINKS.map((c, i) => {
              const label = t.hero.categories[c.id].label.toLowerCase()
              const last = i === CATEGORY_LINKS.length - 1
              const mid = i > 0 && !last
              return (
                <span key={c.id}>
                  {i === 0 ? '' : last ? ' e ' : mid ? ', ' : ''}
                  <Link
                    to={c.href}
                    className="text-[#2c241f] font-medium underline-offset-4 hover:text-[#7c2d3e] hover:underline"
                  >
                    {label}
                  </Link>
                </span>
              )
            })}
            {t.hero.categoriesEnd}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
            <Link
              to="/agendar-demo"
              className="inline-flex items-center justify-center w-full sm:w-auto min-h-[52px] px-[30px] rounded-full bg-[#7c2d3e] hover:bg-[#5f2130] text-[#f7f2ee] font-medium text-base transition-colors"
            >
              {t.hero.startNow}
            </Link>
            <a
              href="#precos"
              className="inline-flex items-center justify-center w-full sm:w-auto min-h-[52px] px-[30px] rounded-full border border-[#d5cbbd] hover:border-[#7c2d3e] text-[#2c241f] hover:text-[#7c2d3e] font-medium text-base transition-colors"
            >
              {t.hero.seePlans}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={80} className="relative min-h-[clamp(280px,40vw,520px)]">
          <GranuGrain className="absolute inset-0 w-full h-full" zoom={1.45} />
        </FadeIn>
      </div>

      <div className="max-w-[1240px] mx-auto mt-[clamp(28px,4vw,52px)] pt-[26px] border-t border-[#e4ddd2] grid grid-cols-2 sm:grid-cols-4 gap-5">
        {METRICS.map((m) => (
          <div
            key={m.l}
            className={`flex flex-col gap-1.5 pl-4 border-l-2 ${m.accent ? 'border-[#7c2d3e]' : 'border-[#e4ddd2]'}`}
          >
            <span
              className="text-[clamp(24px,2.6vw,32px)] leading-none text-[#2c241f] tabular-nums"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {m.v}
            </span>
            <span className="text-[13px] text-[#8a7a6e]">{m.l}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
