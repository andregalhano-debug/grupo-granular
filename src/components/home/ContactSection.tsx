import { Link } from 'react-router-dom'

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

          <div className="mt-auto pt-7">
            <p
              className="text-[11px] tracking-[.16em] uppercase text-[#ecd9cd]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Escritórios em São Paulo e Belo Horizonte
            </p>
          </div>
        </div>

        <div className="bg-[#faf9f7] rounded-[18px] p-[clamp(22px,2.6vw,34px)] flex flex-col justify-center text-[#2c241f]">
          <p
            className="text-[11px] tracking-[.2em] uppercase text-[#7c2d3e]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Agendar demonstração
          </p>
          <h3 className="mt-3 text-[28px] leading-tight font-semibold tracking-[-.03em]">
            Preencha seus dados e escolha o melhor dia e horário.
          </h3>
          <p className="mt-3 text-[15.5px] leading-relaxed text-[#5f5248]">
            Empresa, segmento, nome, WhatsApp, e-mail e, se quiser, o calendário. Você recebe a confirmação; a equipe é avisada no mesmo fluxo de sempre.
          </p>
          <Link
            to="/agendar-demo"
            className="mt-7 inline-flex items-center justify-center min-h-[52px] rounded-full bg-[#7c2d3e] hover:bg-[#5f2130] text-[#f7f2ee] text-base font-medium transition-colors"
          >
            Ir para o formulário
          </Link>
        </div>
      </div>
    </section>
  )
}
