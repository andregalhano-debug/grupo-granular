import { DemoBookingForm } from './DemoBookingForm'

const STEPS = [
  {
    n: '01',
    t: 'Você traz uma loja ou a rede inteira.',
    d: 'A conversa acontece sobre a sua realidade, não sobre um caso genérico.',
  },
  {
    n: '02',
    t: 'A Granu responde na hora.',
    d: 'Repasse, ruptura, cardápio — você pergunta e vê o sistema trabalhar ao vivo.',
  },
  {
    n: '03',
    t: 'Você sai com a conta.',
    d: 'Quanto o Granular se paga na sua operação — e em quanto tempo.',
  },
]

export function ContactSection() {
  return (
    <section id="contato" className="bg-[#7c2d3e] text-[#f7f2ee] px-[clamp(18px,4vw,44px)] py-[clamp(64px,7vw,112px)]">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-[clamp(28px,4vw,64px)] items-stretch">
        <div className="flex flex-col">
          <p
            className="text-[11.5px] tracking-[.24em] uppercase text-[#ecd9cd]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Granular · Digital as a Service
          </p>
          <h2 className="mt-4 text-[clamp(32px,4.4vw,60px)] leading-none tracking-[-.032em] font-semibold text-[#f7f2ee] text-balance">
            Veja rodando
            <br />
            com os seus números.
          </h2>
          <p className="mt-5 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#ecd9cd] max-w-[46ch] text-pretty">
            A demonstração acontece no sistema real, em produção — não em slide.
          </p>

          <div className="mt-[clamp(28px,3vw,40px)]">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`flex gap-4 py-[18px] border-t border-[rgba(236,217,205,.28)] ${
                  i === STEPS.length - 1 ? 'border-b' : ''
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
