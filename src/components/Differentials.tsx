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
    title: 'Checklists que Substituem o Konklui',
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
    <section id="diferenciais" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0f0709]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Por que escolher o Maestro?
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Diferenciais que fazem sua operação decolar.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 100}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-colors h-full">
                <div className="w-11 h-11 rounded-xl bg-[#4D1520]/30 flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-[#e8a0b0]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
