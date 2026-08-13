import { Check, Handshake, CalendarDays, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { useT } from '../i18n/useT'

const CTA_HREF = '/agendar-demo?origem=especialista-sob-demanda'

export function EspecialistaSection() {
  const t = useT()
  const consultoriaSteps = t.pricingExtended.consultoriaSteps

  return (
    <section id="especialista" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#f0ede8]">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#7c2d3e] flex items-center justify-center">
                <Handshake size={22} className="text-[#F7F7F7]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#2c241f]">
                  {t.pricingExtended.consultoriaTitle}
                </h1>
                <p className="text-sm text-[#5f5248]">{t.pricingExtended.consultoriaSubtitle}</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={50}>
          <div className="mb-10 rounded-xl bg-[#2c241f]/[0.03] border border-[#e4ddd2] p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-[#2c241f] leading-relaxed">
              {t.pricingExtended.consultoriaInfo}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mb-10">
            <div className="hidden sm:block">
              <div className="relative flex items-stretch justify-between gap-4">
                <div className="absolute top-5 left-[calc(16.66%)] right-[calc(16.66%)] h-0.5 bg-[#7c2d3e]/20" />
                {consultoriaSteps.map((step) => (
                  <div key={step.months} className="flex-1 flex flex-col">
                    <div className="relative z-10 flex flex-col items-center mb-5">
                      <div className="w-10 h-10 rounded-full bg-[#7c2d3e] flex items-center justify-center shadow-md mb-3">
                        <Clock size={18} className="text-white" />
                      </div>
                      <span className="text-sm font-bold text-[#7c2d3e]">{step.months}</span>
                    </div>
                    <div className="flex-1 w-full rounded-2xl border bg-[#faf9f7] p-5 border-[#e4ddd2]">
                      <p className="text-xs font-semibold text-[#2c241f] mb-3 leading-snug">{step.label}</p>
                      <ul className="space-y-1.5">
                        {step.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-xs text-[#5f5248]">
                            <Check size={11} className="text-[#7c2d3e] flex-shrink-0 mt-0.5" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sm:hidden space-y-4">
              {consultoriaSteps.map((step, idx) => (
                <div key={step.months} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[#7c2d3e] flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-white" />
                    </div>
                    {idx < consultoriaSteps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-[#7c2d3e]/15 my-1" />
                    )}
                  </div>
                  <div className="flex-1 rounded-2xl border bg-[#faf9f7] p-4 mb-1 border-[#e4ddd2]">
                    <p className="text-sm font-bold text-[#7c2d3e] mb-1">{step.months}</p>
                    <p className="text-xs font-semibold text-[#2c241f] mb-2">{step.label}</p>
                    <ul className="space-y-1">
                      {step.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs text-[#5f5248]">
                          <Check size={11} className="text-[#7c2d3e] flex-shrink-0 mt-0.5" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="rounded-2xl border border-[#7c2d3e]/15 bg-[#faf9f7] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-[#2c241f] mb-1.5">{t.pricingExtended.pricingOnRequest}</p>
              <p className="text-sm text-[#5f5248] leading-relaxed mb-4">
                {t.pricingExtended.pricingOnRequestDesc}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.pricingExtended.consultoriaTags.map((f) => (
                  <span key={f} className="text-xs bg-[#f0ede8] text-[#2c241f] px-3 py-1 rounded-full border border-[#e4ddd2]">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to={CTA_HREF}
              className="inline-flex items-center gap-2 bg-[#7c2d3e] hover:bg-[#5f2130] text-[#f7f2ee] font-medium px-6 py-3 rounded-full text-sm transition-colors whitespace-nowrap flex-shrink-0"
            >
              <CalendarDays size={16} />
              {t.pricingExtended.scheduleDemo2}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
