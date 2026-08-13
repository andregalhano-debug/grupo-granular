import { Star } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { useT } from '../i18n/useT'

export function Testimonials() {
  const t = useT()
  const testimonials = t.testimonials.items

  return (
    <section id="depoimentos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            {t.testimonials.sectionTitle}
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            {t.testimonials.sectionSubtitle}
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <FadeIn key={item.name} delay={i * 120}>
              <div className="rounded-2xl border border-[#9C958A]/20 bg-[#F7F7F7] p-5 sm:p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="fill-[#f5a623] text-[#f5a623]" />
                  ))}
                </div>
                <p className="text-sm text-[#9C958A] leading-relaxed mb-6 flex-1">"{item.text}"</p>
                <div>
                  <p className="font-semibold text-sm text-[#0E0E0F]">{item.name}</p>
                  <p className="text-xs text-[#9C958A]">{item.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
