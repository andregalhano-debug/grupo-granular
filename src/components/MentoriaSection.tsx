import { Star, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { useT } from '../i18n/useT'

const PONTOS = [
  {
    t: 'Sessões pontuais',
    d: 'Operação, financeiro, estoque, pessoas e vendas, sem vínculo de prazo, com foco em uma decisão estratégica.',
  },
  {
    t: 'Quem já resolveu o mesmo problema',
    d: 'Mentores com experiência real em restaurantes, mercados, farmácias, pet shops e shopping. Você escolhe a especialidade.',
  },
  {
    t: 'Rede em crescimento',
    d: 'Quem opera pede sessão. Quem já operou entra como mentor — disponibilidade e valor por hora definidos por você.',
  },
]

export function MentoriaSection() {
  const t = useT()
  const sampleMentors = t.pricingExtended.sampleMentors

  return (
    <section id="mentores" className="py-20 sm:py-28 px-[clamp(18px,4vw,44px)] bg-[#f0ede8]">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p
            className="text-[11.5px] tracking-[.24em] uppercase text-[#7c2d3e] mb-3"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Comunidade Mentores
          </p>
          <h1 className="text-[clamp(32px,4.4vw,60px)] leading-none tracking-[-.032em] font-semibold text-[#2c241f] text-balance">
            {t.pricingExtended.mentoriaTitle}
          </h1>
          <p className="mt-5 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#5f5248] max-w-[56ch]">
            {t.pricingExtended.whatAreMentorsDesc}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
            <Link
              to="/seja-mentor"
              className="inline-flex items-center justify-center w-full sm:w-auto min-h-[52px] px-8 rounded-full bg-[#7c2d3e] hover:bg-[#5f2130] text-[#f7f2ee] font-medium text-base transition-colors"
            >
              {t.pricingExtended.beMentorCta}
              <ChevronRight size={18} className="ml-1" />
            </Link>
            <span className="text-sm text-[#8a7a6e]">{t.pricingExtended.joinNetwork}</span>
          </div>
        </FadeIn>

        <FadeIn delay={60}>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {PONTOS.map((p) => (
              <div key={p.t} className="rounded-2xl border border-[#e4ddd2] bg-[#faf9f7] p-5">
                <p className="text-base font-semibold text-[#2c241f] mb-2">{p.t}</p>
                <p className="text-sm text-[#5f5248] leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={90}>
          <div className="mt-12 mb-6 flex items-center gap-3">
            <p
              className="text-[11px] tracking-[.2em] uppercase text-[#7c2d3e] whitespace-nowrap"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {t.pricingExtended.exampleMentors}
            </p>
            <div className="flex-1 h-px bg-[#e4ddd2]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleMentors.map((mentor) => (
              <div
                key={mentor.name}
                className="rounded-2xl border border-[#e4ddd2] bg-[#faf9f7] p-5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#7c2d3e]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#7c2d3e]">{mentor.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#2c241f] truncate">{mentor.name}</p>
                    <p className="text-xs text-[#8a7a6e] truncate">{mentor.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-[#2c241f]">{mentor.rating}</span>
                  <span className="text-xs text-[#8a7a6e]">({mentor.reviews} {t.pricingExtended.reviews})</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mentor.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-[#f0ede8] text-[#5f5248] px-2.5 py-1 rounded-full border border-[#e4ddd2]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#e4ddd2]">
                  <div>
                    <span className="text-lg font-semibold text-[#2c241f]">R$ {mentor.rate}</span>
                    <span className="text-xs text-[#8a7a6e]">{t.pricingExtended.perHour}</span>
                  </div>
                  <span className="text-xs text-[#8a7a6e]">{mentor.years} {t.pricingExtended.yearsExp}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-14 rounded-[22px] bg-[#7c2d3e] text-[#f7f2ee] p-8 sm:p-12 text-center">
            <p
              className="text-[11.5px] tracking-[.24em] uppercase text-[#ecd9cd]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {t.pricingExtended.youAreMentor}
            </p>
            <h2 className="mt-3 text-[clamp(28px,3.8vw,44px)] leading-[1.05] tracking-[-.03em] font-semibold text-balance">
              {t.pricingExtended.beMentorTitle}
            </h2>
            <p className="mt-4 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#ecd9cd] max-w-[48ch] mx-auto">
              {t.pricingExtended.beMentorDesc}
            </p>
            <Link
              to="/seja-mentor"
              className="mt-8 inline-flex items-center justify-center w-full sm:w-auto min-h-[56px] px-10 rounded-full bg-[#f0ede8] hover:bg-white text-[#7c2d3e] font-semibold text-base transition-colors"
            >
              {t.pricingExtended.beMentorCta}
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
