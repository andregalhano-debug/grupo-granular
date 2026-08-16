import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'
import { GranuGrain } from '../components/granu/GranuGrain'
import { GranuDualPhones } from '../components/granu/GranuWhatsApp'
import { useT } from '../i18n/useT'

export function GranuPage() {
  const t = useT()
  const g = t.granuPage
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#f0ede8]">
      <Header />

      <section className="pt-10 sm:pt-14 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="lg:hidden">
            <FadeIn>
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[#7c2d3e] mb-2"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {g.eyebrow}
                  </p>
                  <h1 className="text-[clamp(32px,8vw,44px)] font-semibold tracking-[-.035em] text-[#2c241f] leading-[1.02]">
                    {g.title1}<br />{g.title2}
                  </h1>
                </div>
                <div className="granu-well relative w-[128px] h-[128px] shrink-0">
                  <GranuGrain className="absolute inset-0 w-full h-full" zoom={2.05} fast />
                </div>
              </div>
              <p className="mt-8 text-base text-[#5D5148] leading-relaxed max-w-[44ch] mb-4">
                {g.lead}
              </p>
              <p className="text-[#6B3F1F] italic text-lg leading-snug max-w-[42ch]">
                {g.quote}
              </p>
            </FadeIn>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
            <FadeIn>
              <p
                className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[#7c2d3e] mb-3"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {g.eyebrow}
              </p>
              <h1 className="text-5xl lg:text-6xl font-semibold tracking-[-.035em] text-[#2c241f] leading-[1.02] mb-5">
                {g.title1}<br />{g.title2}
              </h1>
              <p className="text-lg text-[#5D5148] leading-relaxed max-w-[44ch] mb-4">
                {g.lead}
              </p>
              <p className="text-[#6B3F1F] italic text-xl leading-snug max-w-[42ch]">
                {g.quote}
              </p>
            </FadeIn>
            <FadeIn className="granu-well relative h-[490px]">
              <GranuGrain className="absolute inset-0 w-full h-full" zoom={1.92} />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E4DDD2]">
        <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 items-center">
          <FadeIn className="justify-self-center lg:justify-self-start">
            <GranuDualPhones />
          </FadeIn>
          <FadeIn delay={80} className="max-w-md lg:pt-2">
            <p
              className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[#7c2d3e] mb-3"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {g.pocketEyebrow}
            </p>
            <h2
              className="text-3xl sm:text-[2.15rem] font-semibold tracking-[-.03em] text-[#2c241f] leading-[1.08] mb-4"
            >
              {g.pocketTitle}
            </h2>
            <p className="text-[#5D5148] text-[15px] leading-relaxed mb-3">
              {g.pocketLead}
            </p>
            <p className="text-[#6B3F1F] italic text-[16px] leading-snug mb-8">
              {g.pocketQuote}
            </p>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A2968A] mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {g.doesEyebrow}
            </p>
            <div className="divide-y divide-[#DDD4C8]">
              {g.does.map((item) => (
                <div key={item.n} className="grid grid-cols-[28px_1fr] gap-3 py-3">
                  <span className="text-[12px] text-[#A2968A] pt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.n}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-[#241D1A] tracking-tight">{item.t}</p>
                    <p className="text-sm text-[#5F544C] mt-0.5 leading-snug">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

          <FadeIn>
            <div className="mt-[clamp(28px,4vw,52px)] pt-[26px] border-t border-[#e4ddd2] grid grid-cols-2 sm:grid-cols-4 gap-5">
              {g.metrics.map((m, i) => (
                <div
                  key={m.l}
                  className={`flex flex-col gap-1.5 pl-4 border-l-2 ${i === 0 ? 'border-[#7c2d3e]' : 'border-[#e4ddd2]'}`}
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
          </FadeIn>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 sm:pb-24">
        <FadeIn>
          <div className="max-w-6xl mx-auto text-center rounded-[22px] bg-[#241d1a] px-6 py-12 sm:px-12 sm:py-16">
            <p
              className="text-[11.5px] tracking-[.24em] uppercase text-[#c9a27a] mb-3"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {g.nextStep}
            </p>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-.03em] text-[#f0ede8] mb-3">
              {g.ctaTitle}
            </h2>
            <p className="text-[15px] text-[#bdb0a4] mb-8 max-w-md mx-auto leading-relaxed">
              {g.ctaLead}
            </p>
            <Link
              to="/agendar-demo"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-[#f0ede8] hover:bg-white text-[#241d1a] font-medium px-8 min-h-[52px] rounded-full text-[15px] transition-colors"
            >
              {t.hero.startNow}
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  )
}
