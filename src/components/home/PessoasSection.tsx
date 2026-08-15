const CARDS = [
  {
    k: 'Recrutamento',
    t: 'O agente contrata com você',
    items: [
      'Vaga pública com QR — o candidato entra direto no funil',
      'Triagem guiada por agente no WhatsApp, pipeline em etapas',
      'Entrevista agendada sozinha — 3 horários oferecidos, você só comparece',
      'A decisão é sempre sua: o agente conversa, o sistema organiza',
    ],
    chips: ['vaga com QR', 'triagem no WhatsApp', 'entrevista agendada'],
  },
  {
    k: 'Ponto & folha',
    t: 'O mês fecha sem caçar batida',
    items: [
      'Batida com reconhecimento facial no tablet da loja — sem crachá, sem senha',
      'Apuração automática: hora extra, faltas e banco de horas',
      'Espelho individual com inconsistências apontadas, pronto para assinar',
      'Escala, férias, holerites e eSocial na mesma base',
    ],
    chips: ['batida facial', 'apuração', 'espelho assinado'],
  },
]

const METRICS = [
  { v: '11', l: 'etapas no funil de vaga', accent: true },
  { v: '0–100', l: 'score por pessoa' },
  { v: 'facial', l: 'ponto sem crachá' },
  { v: 'eSocial', l: 'na mesma base' },
]

export function PessoasSection() {
  return (
    <section id="pessoas" className="px-[clamp(18px,4vw,44px)] py-[clamp(64px,7vw,112px)]">
      <div className="max-w-[1240px] mx-auto">
        <p
          className="text-[11.5px] tracking-[.24em] uppercase text-[#7c2d3e]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Pessoas
        </p>
        <h2 className="mt-4 text-[clamp(32px,4.4vw,60px)] leading-none tracking-[-.032em] font-semibold text-[#2c241f] text-balance">
          Do recrutamento ao cartão ponto.
        </h2>
        <p className="mt-5 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#5f5248] max-w-[56ch] text-pretty">
          RH inteiro dentro do sistema — sem planilha no meio. A vaga nasce com QR, o agente entrevista no WhatsApp, o ponto fecha sozinho no fim do mês.
        </p>

        <div className="grid md:grid-cols-2 gap-[clamp(16px,2vw,24px)] mt-[clamp(28px,3.5vw,44px)]">
          {CARDS.map((c) => (
            <div
              key={c.k}
              className="bg-[#faf9f7] border border-[#e4ddd2] rounded-2xl p-[clamp(22px,2.4vw,32px)] flex flex-col gap-3.5"
            >
              <span
                className="text-[11px] tracking-[.2em] uppercase text-[#7c2d3e]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {c.k}
              </span>
              <span className="text-[21px] leading-snug tracking-[-.02em] font-semibold text-[#2c241f]">{c.t}</span>
              <div className="flex flex-col gap-2 text-[15.5px] leading-snug text-[#5f5248]">
                {c.items.map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-auto pt-3">
                {c.chips.map((chip, i) => (
                  <span key={chip} className="inline-flex items-center gap-2">
                    <span
                      className={`text-[11.5px] px-3 py-1.5 rounded-full ${
                        i === c.chips.length - 1
                          ? 'bg-[#7c2d3e] text-[#f6ece6]'
                          : 'border border-[#e4ddd2] text-[#6b5d52]'
                      }`}
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {chip}
                    </span>
                    {i < c.chips.length - 1 && <span className="text-[#b7a894]">→</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(26px,3vw,40px)] pt-6 border-t border-[#e4ddd2] grid grid-cols-2 sm:grid-cols-4 gap-4">
          {METRICS.map((m) => (
            <div
              key={m.l}
              className={`flex flex-col gap-1.5 pl-3.5 border-l-2 ${m.accent ? 'border-[#7c2d3e]' : 'border-[#e4ddd2]'}`}
            >
              <span
                className="text-[26px] leading-none text-[#2c241f] tabular-nums"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {m.v}
              </span>
              <span className="text-[13px] text-[#8a7a6e]">{m.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
