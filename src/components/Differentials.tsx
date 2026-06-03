import { Brain, ClipboardList, PieChart, Plug } from 'lucide-react'
import { FadeIn } from './FadeIn'

const items = [
  {
    icon: Brain,
    title: 'IA Integrada — Único no Mercado',
    desc: '15 agentes de IA que automatizam compras, precificação, previsão de demanda e mais. Tecnologia exclusiva que nenhum concorrente oferece.',
  },
  {
    icon: ClipboardList,
    title: 'Checklists Operacionais',
    desc: 'Rotinas operacionais digitalizadas com fotos, evidências e assinatura. Economize com ferramentas separadas.',
  },
  {
    icon: PieChart,
    title: 'CMV Automático em Tempo Real',
    desc: 'Acompanhe seu custo de mercadoria vendida atualizado a cada venda, sem planilhas ou cálculos manuais.',
  },
  {
    icon: Plug,
    title: 'Integração Nativa Omie + iFood',
    desc: 'Conecte seu ERP e marketplace favoritos sem intermediários. Dados sincronizados automaticamente.',
  },
]

export function Differentials() {
  return (
    <section id="diferenciais" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F0] mb-4">
            Por que escolher a Granular?
          </h2>
          <p className="text-[#FAF7F0]/50 text-base sm:text-lg max-w-2xl mx-auto">
            Diferenciais que fazem sua operação decolar.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 100}>
              <div className="rounded-2xl border border-[#FAF7F0]/[0.08] bg-[#FAF7F0]/[0.03] p-8 hover:bg-[#FAF7F0]/[0.06] transition-colors h-full">
                <div className="w-11 h-11 rounded-xl bg-[#A31631]/40 flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-[#C4223D]" />
                </div>
                <h3 className="text-lg font-semibold text-[#FAF7F0] mb-3">{item.title}</h3>
                <p className="text-sm text-[#FAF7F0]/40 leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
