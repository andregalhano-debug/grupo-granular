import { useEffect, useState, type ReactNode } from 'react'

type Bubble = {
  side: 'in' | 'out'
  t: string
  time?: string
  ticks?: boolean
  btns?: { primary: string; secondary: string }
  table?: { rows: { k: string; v: string; strong?: boolean }[]; footnote?: string }
}

const WA: Bubble[] = [
  { side: 'in', t: 'Bom dia. Ontem fechou em R$ 40,2 mil, 13% acima da semana passada. Só que a margem caiu 2,1 pontos.', time: '08:02' },
  { side: 'in', t: 'O cupom de 20% da Vista Burger é o que está tirando o lucro. Melhor desligar hoje.', time: '08:02' },
  { side: 'out', t: 'quanto esse cupom custou?', time: '08:04', ticks: true },
  { side: 'in', t: 'R$ 3,4 mil de desconto em 14 dias e só R$ 1,1 mil de venda nova. Não se paga. Desligo?', time: '08:04', btns: { primary: 'Desligar cupom', secondary: 'Manter' } },
  { side: 'out', t: 'desliga', time: '08:05', ticks: true },
  { side: 'in', t: 'Feito, nas 12 lojas. Amanhã te digo quanto a margem recuperou.', time: '08:05' },
]

const APP: Bubble[] = [
  { side: 'out', t: 'quanto sobrou de lucro na Savassi em julho?' },
  {
    side: 'in',
    t: 'Sobraram R$ 61,3 mil, 12% da receita.',
    table: {
      rows: [
        { k: 'Receita bruta', v: '512.400' },
        { k: 'Taxas e comissões', v: '−87.100' },
        { k: 'CMV', v: '−168.900' },
        { k: 'Lucro líquido', v: '61.300', strong: true },
      ],
      footnote: 'Lido do cubo da operação',
    },
  },
  { side: 'out', t: 'o que fez o CMV subir?' },
  { side: 'in', t: 'A proteína subiu 7% no mês e três itens tiveram quebra. Junto, isso custou 1,8 ponto de margem.', btns: { primary: 'Rever ficha técnica', secondary: 'Comparar lojas' } },
]

function PhoneShell({
  subtitle,
  channel,
  footer,
  children,
}: {
  subtitle: ReactNode
  channel: string
  footer: string
  children: ReactNode
}) {
  return (
    <div className="w-full max-w-[248px] sm:w-[248px] sm:max-w-none lg:w-[268px] h-[460px] sm:h-[500px] lg:h-[520px] flex flex-col rounded-[26px] bg-[#E4DDD2] p-[3px] shadow-[0_10px_28px_rgba(36,29,26,.12)]">
      <div className="flex-1 min-h-0 flex flex-col rounded-[23px] overflow-hidden bg-[#FAF9F7]">
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#F7F5F1] border-b border-[#E4DDD2] shrink-0">
          <span className="w-8 h-8 rounded-full bg-[#A31631] text-[#FAF7F0] text-[13px] font-semibold flex items-center justify-center shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>G</span>
          <span className="min-w-0 flex flex-col leading-tight">
            <span className="text-[13px] font-semibold text-[#241D1A]">Granu</span>
            {subtitle}
          </span>
          <span className="ml-auto text-[9px] tracking-[0.12em] uppercase text-[#A2968A]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{channel}</span>
        </div>
        <div className="flex-1 overflow-hidden bg-[#EFEAE2] px-2.5 py-2.5 flex flex-col gap-1.5">
          {children}
        </div>
        <div className="shrink-0 bg-[#F7F5F1] border-t border-[#E4DDD2] px-3 py-2.5">
          <div className="bg-white border border-[#E4DDD2] rounded-full px-3.5 py-2 text-[12px] text-[#B0A699]">{footer}</div>
        </div>
      </div>
    </div>
  )
}

function Thread({ items, step, variant }: { items: Bubble[]; step: number; variant: 'whatsapp' | 'sistema' }) {
  return (
    <>
      {items.map((m, i) => {
        const vis = i < step
        const isOut = m.side === 'out'
        const wa = variant === 'whatsapp'
        return (
          <div
            key={`${m.t}-${i}`}
            className={`${isOut ? 'self-end' : 'self-start'} ${isOut ? 'max-w-[82%]' : 'max-w-[92%]'} transition-all duration-500 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}
          >
            <div
              className={`text-[12.5px] leading-snug ${
                isOut
                  ? wa
                    ? 'bg-[#D9FDD3] text-[#243328] rounded-[14px_14px_4px_14px]'
                    : 'bg-[#A31631] text-[#FAF7F0] rounded-[14px_14px_4px_14px]'
                  : wa
                    ? 'bg-white text-[#31281F] rounded-[14px_14px_14px_4px] shadow-[0_1px_1px_rgba(36,29,26,.08)]'
                    : 'bg-white text-[#31281F] border border-[#E4DDD2] rounded-[14px_14px_14px_4px]'
              } px-2.5 py-2`}
            >
              {m.t}
              {m.table && (
                <div className="mt-2 mb-1 px-2.5 py-2 rounded-[10px] bg-[#F7F5F1] text-[11px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {m.table.rows.map((r) => (
                    <div key={r.k} className={`flex justify-between py-0.5 ${r.strong ? 'border-t border-[#E4DDD2] mt-1 pt-1.5 text-[#A31631] font-semibold' : 'text-[#4A413B]'}`}>
                      <span>{r.k}</span><span>{r.v}</span>
                    </div>
                  ))}
                </div>
              )}
              {m.table?.footnote && (
                <p className="mt-1.5 text-[9px] tracking-[0.1em] uppercase text-[#A89F94]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.table.footnote}</p>
              )}
              {m.btns && (
                <div className="flex gap-1.5 mt-2">
                  <span className="flex-1 text-center bg-[#A31631] text-[#FAF7F0] rounded-lg py-1.5 text-[11px] font-semibold">{m.btns.primary}</span>
                  <span className="shrink-0 text-center border border-[#DDD4C8] text-[#6E6259] rounded-lg px-2 py-1.5 text-[11px]">{m.btns.secondary}</span>
                </div>
              )}
              {m.time && (
                <div className={`mt-1 text-[9px] text-right ${isOut ? 'text-[#79A189]' : 'text-[#A89F94]'}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {m.time}{m.ticks ? ' ✓✓' : ''}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}

export function GranuDualPhones() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => (s >= Math.max(WA.length, APP.length) + 2 ? 1 : s + 1))
    }, 1400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 sm:gap-5 lg:gap-6">
      <PhoneShell
        subtitle={<span className="flex items-center gap-1 text-[11px] text-[#25A35A]"><span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />online</span>}
        channel="WhatsApp"
        footer="Mensagem"
      >
        <p className="text-center text-[10px] text-[#8A7A6E] mb-0.5">hoje · 08:02</p>
        <Thread items={WA} step={step} variant="whatsapp" />
      </PhoneShell>

      <PhoneShell
        subtitle={<span className="text-[11px] text-[#8D8177]">IA do sistema</span>}
        channel="Plataforma"
        footer="Pergunte à Granu"
      >
        <Thread items={APP} step={Math.max(1, step - 1)} variant="sistema" />
      </PhoneShell>
    </div>
  )
}

/** @deprecated use GranuDualPhones */
export function GranuWhatsApp() {
  return <GranuDualPhones />
}
