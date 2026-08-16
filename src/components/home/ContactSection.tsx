import { DemoBookingForm } from './DemoBookingForm'
import { useT } from '../../i18n/useT'

export function ContactSection() {
  const t = useT()
  return (
    <section id="contato" className="bg-[#7c2d3e] text-[#f7f2ee] px-[clamp(18px,4vw,44px)] py-[clamp(64px,7vw,112px)]">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-[clamp(28px,4vw,64px)] items-stretch">
        <div className="flex flex-col">
          <p
            className="text-[11.5px] tracking-[.24em] uppercase text-[#ecd9cd]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {t.home.contactEyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(32px,4.4vw,60px)] leading-none tracking-[-.032em] font-semibold text-[#f7f2ee] text-balance">
            {t.home.contactTitle1}
            <br />
            {t.home.contactTitle2}
          </h2>
          <p className="mt-5 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#ecd9cd] max-w-[46ch] text-pretty">
            {t.home.contactLead}
          </p>

          <div className="mt-[clamp(28px,3vw,40px)]">
            {t.home.contactSteps.map((s, i) => (
              <div
                key={s.n}
                className={`flex gap-4 py-[18px] border-t border-[rgba(236,217,205,.28)] ${
                  i === t.home.contactSteps.length - 1 ? 'border-b' : ''
                }`}
              >
                <span
                  className="text-xs tracking-[.08em] text-[#ecd9cd] mt-0.5"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {s.n}
                </span>
                <span className="text-base leading-relaxed">
                  <strong className="font-semibold">{s.t}</strong>{' '}
                  <span className="text-[#ecd9cd]">{s.d}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#faf9f7] rounded-[18px] p-[clamp(22px,2.6vw,34px)]">
          <DemoBookingForm source="home-contato" />
        </div>
      </div>
    </section>
  )
}
