import { Star } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { useT } from '../i18n/useT'

export function Testimonials() {
  const t = useT()
  const testimonials = t.testimonials.items

  return (
    <section id="depoimentos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="section-head mb-12 sm:mb-16">
          <p
            className="text-[11.5px] tracking-[.24em] uppercase text-[#7c2d3e]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {t.testimonials.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(24px,2.8vw,34px)] leading-[1.08] tracking-[-.03em] font-semibold text-[#2c241f] text-balance">
            {t.testimonials.sectionTitle}
          </h2>
          <p className="mt-3 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#5f5248] max-w-[46ch] text-pretty">
            {t.testimonials.sectionSubtitle}
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <FadeIn key={item.name} delay={i * 120}>
              <div className="rounded-2xl border border-[#e4ddd2] bg-[#faf9f7] p-5 sm:p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="fill-[#f5a623] text-[#f5a623]" />
                  ))}
                </div>
                <p className="text-sm text-[#5f5248] leading-relaxed mb-6 flex-1">"{item.text}"</p>
                <div>
                  <p className="font-semibold text-sm text-[#2c241f]">{item.name}</p>
                  <p className="text-xs text-[#8a7a6e]">{item.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
