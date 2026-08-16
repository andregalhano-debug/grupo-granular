import { Link } from 'react-router-dom'
import { FadeIn } from '../FadeIn'
import { GranuDualPhones } from '../granu/GranuWhatsApp'
import { GranuGrain } from '../granu/GranuGrain'
import { useT } from '../../i18n/useT'

export function HomeGranuSection() {
  const t = useT()
  return (
    <section id="granu" className="px-[clamp(18px,4vw,44px)] py-[clamp(64px,7vw,112px)] bg-[#f0ede8]">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr_auto] gap-x-[clamp(28px,4vw,64px)] gap-y-0 items-center">
        <FadeIn className="order-1 lg:col-start-2 lg:row-start-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="granu-well lg:hidden relative w-[128px] h-[128px] shrink-0">
              <GranuGrain className="absolute inset-0 w-full h-full" zoom={2.05} fast />
            </div>
            <div className="min-w-0">
              <p
                className="text-[11.5px] tracking-[.24em] uppercase text-[#7c2d3e]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {t.home.granuEyebrow}
              </p>
              <h2 className="mt-2 sm:mt-4 text-[clamp(32px,8vw,76px)] leading-[.98] tracking-[-.035em] font-semibold text-[#2c241f]">
                {t.home.granuTitle}
              </h2>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={80} className="order-2 lg:col-start-2 lg:row-start-2 max-w-xl mt-8 lg:mt-5">
          <p className="text-[clamp(17px,1.6vw,21px)] leading-relaxed text-[#5f5248] max-w-[52ch] text-pretty">
            {t.home.granuLead}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5f5248] max-w-[52ch]">
            {t.home.granuLead2}
          </p>
          <div className="flex flex-col gap-3 mt-8 text-[15.5px] leading-relaxed text-[#5f5248]">
            {t.home.granuBullets.map((b) => (
              <div key={b.t} className="flex gap-2.5">
                <span className="flex-none w-1.5 h-1.5 rounded-full bg-[#7c2d3e] mt-2.5" />
                <span>
                  <strong className="text-[#2c241f] font-semibold">{b.t}</strong>
                  {b.d}
                </span>
              </div>
            ))}
          </div>
          <a
            href="#granu-conversa"
            className="lg:hidden inline-flex mt-7 text-[13px] tracking-[.04em] text-[#8a7a6e] hover:text-[#7c2d3e] transition-colors"
          >
            {t.home.granuSeeChat}
          </a>
          <div className="hidden lg:flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 mt-8">
            <Link
              to="/agendar-demo"
              className="inline-flex items-center justify-center w-full sm:w-auto min-h-[52px] px-[30px] rounded-full bg-[#7c2d3e] hover:bg-[#5f2130] text-[#f7f2ee] font-medium text-base transition-colors"
            >
              {t.home.granuCta}
            </Link>
            <Link to="/granu" className="inline-flex items-center justify-center min-h-11 text-sm font-medium text-[#7c2d3e] hover:text-[#5f2130]">
              {t.home.granuMore}
            </Link>
          </div>
        </FadeIn>

        <FadeIn className="order-3 lg:col-start-1 lg:row-start-1 lg:row-span-3 justify-self-center lg:justify-self-start mt-10 lg:mt-0">
          <div id="granu-conversa" className="scroll-mt-24">
            <GranuDualPhones />
          </div>
        </FadeIn>

        <FadeIn delay={40} className="order-4 lg:hidden mt-10 text-center">
          <Link
            to="/agendar-demo"
            className="inline-flex items-center justify-center w-full min-h-[56px] px-8 rounded-full bg-[#7c2d3e] hover:bg-[#5f2130] text-[#f7f2ee] font-semibold text-[16.5px] shadow-[0_10px_24px_-12px_rgba(124,45,62,.7)] transition-colors"
          >
            {t.home.granuCta}
          </Link>
          <Link
            to="/granu"
            className="mt-3 inline-flex items-center justify-center min-h-10 text-[13.5px] font-medium text-[#7c2d3e] hover:text-[#5f2130]"
          >
            {t.home.granuMore}
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
