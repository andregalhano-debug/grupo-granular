import { TrendingUp, Clock, Users, CalendarCheck } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { useT } from '../i18n/useT'

const itemIcons = [TrendingUp, Clock, Users, CalendarCheck]

export function Differentials() {
  const t = useT()

  return (
    <section id="diferenciais" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F0] mb-4">
            {t.differentials.sectionTitle}
          </h2>
          <p className="text-[#FAF7F0]/50 text-base sm:text-lg max-w-2xl mx-auto">
            {t.differentials.sectionSubtitle} <span className="text-[#FAF7F0] font-semibold">{t.differentials.sectionAccent}</span>
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-4">
          {t.differentials.items.map((item, i) => {
            const Icon = itemIcons[i]
            return (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-[#FAF7F0]/[0.08] bg-[#FAF7F0]/[0.03] p-5 sm:p-8 hover:bg-[#FAF7F0]/[0.06] transition-colors h-full">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-40)] flex items-center justify-center mb-5">
                    <Icon size={22} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#FAF7F0] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#FAF7F0]/40 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
