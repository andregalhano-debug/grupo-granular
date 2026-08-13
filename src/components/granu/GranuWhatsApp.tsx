import { useEffect, useState } from 'react'

const WA = [
  { meta: true, t: 'hoje · 08:02' },
  { side: 'in', t: 'Bom dia. Ontem: R$ 40,2 mil, +13,2% sobre a semana anterior. Pico às 20h.' },
  { side: 'in', t: 'Atenção: peito de frango rompe em 6 dias. Quer a lista de compras?' },
  { side: 'out', t: 'faz a lista' },
  { side: 'in', t: 'Lista pronta — 3 itens críticos, já com fornecedor e alçada.', btns: true },
  { side: 'out', t: 'aprovar ✓' },
  { side: 'in', t: 'Feito. Enviei ao fornecedor e te aviso quando a nota entrar.' },
] as const

export function GranuWhatsApp() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => (s >= WA.length + 2 ? 1 : s + 1))
    }, 1400)
    return () => window.clearInterval(id)
  }, [])

  const next = WA[Math.min(step, WA.length - 1)]
  const typing = step < WA.length && 'side' in next && next.side === 'in'

  return (
    <div className="bg-[#FAF9F7] rounded-[22px] overflow-hidden text-[#2c241f] shadow-[0_18px_50px_rgba(36,29,26,.28)]">
      <div className="flex items-center gap-3 px-4 py-3.5 bg-[#F0EDE8] border-b border-[#E4DDD2]">
        <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden>
          <circle cx="18" cy="18" r="13" fill="#A31631" />
          <circle cx="27" cy="9" r="4" fill="#6B3F1F" />
        </svg>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Granu</p>
          <p className="text-[11px] text-[#6B3F1F]">online</p>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 p-4 min-h-[330px]">
        {WA.map((m, i) => {
          const vis = i < step
          const isOut = 'side' in m && m.side === 'out'
          const isMeta = 'meta' in m && m.meta
          return (
            <div
              key={m.t}
              className={`${isMeta ? 'self-center' : isOut ? 'self-end' : 'self-start'} ${isMeta ? 'w-full' : 'max-w-[84%]'} transition-all duration-500 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              {isMeta ? (
                <p className="text-center text-[11.5px] text-[#8A7A6E]">{m.t}</p>
              ) : (
                <div
                  className={`text-sm leading-relaxed ${
                    isOut
                      ? 'bg-[#A31631] text-[#FAF7F0] rounded-[14px_14px_4px_14px] px-3.5 py-2.5'
                      : 'bg-[#F0EDE8] text-[#2c241f] rounded-[14px_14px_14px_4px] px-3.5 py-2.5'
                  }`}
                >
                  {m.t}
                  {'btns' in m && m.btns && (
                    <div className="flex gap-2 mt-2.5">
                      <span className="flex-1 text-center bg-[#A31631] text-[#FAF7F0] rounded-lg py-2 text-[13px] font-medium">Aprovar</span>
                      <span className="flex-1 text-center border border-[#D8D0C4] text-[#5D5148] rounded-lg py-2 text-[13px]">Rejeitar</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
        <div className={`self-start transition-opacity duration-400 ${typing ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-[#F0EDE8] rounded-[14px_14px_14px_4px] px-4 py-3 flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A7A6E] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A7A6E] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A7A6E] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
