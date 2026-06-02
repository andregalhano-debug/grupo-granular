import { ArrowRight, Zap } from 'lucide-react'
import { FadeIn } from './FadeIn'

export function Hero() {
  return (
    <section id="hero" className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeIn className="text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#4D1520]/5 text-[#4D1520] px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Zap size={16} />
          Plataforma #1 para Dark Kitchens
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[#212121] max-w-4xl mx-auto mb-6">
          Gestão inteligente para quem{' '}
          <span className="text-[#4D1520]">leva restaurante a sério</span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-[#666] max-w-2xl mx-auto mb-10 leading-relaxed">
          Estoque, produção, financeiro, iFood e 15 agentes de IA em uma única plataforma.
          Tudo o que você precisa para escalar sua operação.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <a
            href="#precos"
            className="inline-flex items-center gap-2 bg-[#4D1520] hover:bg-[#6b2230] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            Começar Free Trial de 14 dias
            <ArrowRight size={18} />
          </a>
          <a
            href="#modulos"
            className="inline-flex items-center gap-2 border border-[#e5e5e3] hover:border-[#4D1520]/30 text-[#212121] font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            Ver Módulos
          </a>
        </div>
        <p className="text-xs text-[#999] mb-16">
          Sem cartão de crédito. Cancele quando quiser.
        </p>
      </FadeIn>

      {/* Dashboard Mockup */}
      <FadeIn delay={200}>
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#e5e5e3] overflow-hidden shadow-2xl shadow-black/5">
          {/* Browser Chrome */}
          <div className="bg-[#faf9f7] border-b border-[#e5e5e3] px-4 py-3 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-white rounded-lg border border-[#e5e5e3] px-4 py-1.5 text-xs text-[#999] font-mono">
              app.maestrofood.com.br/dashboard
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white p-6 sm:p-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <KpiCard label="Faturamento" value="R$ 284.500" change="+12.3%" positive />
              <KpiCard label="CMV" value="31.2%" change="-2.1%" positive />
              <KpiCard label="Pedidos" value="3.847" change="+8.7%" positive />
              <KpiCard label="Ticket Médio" value="R$ 73,90" change="+3.4%" positive />
            </div>

            {/* Chart */}
            <div className="flex items-end gap-2 sm:gap-3 h-32 sm:h-40">
              {[65, 45, 78, 55, 88, 42, 72, 60, 85, 50, 92, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-[#4D1520] to-[#7c2d3e]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function KpiCard({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="bg-[#faf9f7] rounded-xl p-4 border border-[#e5e5e3]">
      <p className="text-xs text-[#666] mb-1">{label}</p>
      <p className="text-xl sm:text-2xl font-bold text-[#212121] font-['IBM_Plex_Mono']">{value}</p>
      <p className={`text-xs font-medium mt-1 ${positive ? 'text-[#22895e]' : 'text-[#c82c1e]'}`}>
        {change}
      </p>
    </div>
  )
}
